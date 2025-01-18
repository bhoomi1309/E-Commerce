import React, { useEffect, useState } from "react";
import './style.css';
import useUserDetails from "../../pages/useUserDetails";
import { getCartByEmail, addToCartAPI, removeFromCartAPI, getProductStock } from "../../pages/shopping-view/API";  // Assuming getProductStock is the function to fetch stock

function ProductDescription({ product, closeModal, updateCart }) {
    const { userData, isUserDataReady } = useUserDetails();
    const [cart, setCart] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(false);  // State for out-of-stock status

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (isUserDataReady && userData?.Email) {
                try {
                    const user = await getCartByEmail(userData.Email);
                    const productIds = user?.Cart || [];
                    setCart(productIds);
                } catch (error) {
                    console.error("Failed to fetch cart products:", error);
                }
            }
        };
        fetchCartProducts();
    }, [isUserDataReady, userData?.Email]);

    useEffect(() => {
        if (cart && product?.No) {
            setIsInCart(cart.includes(product.No));
        }
    }, [cart, product]);

    useEffect(() => {
        const fetchStockStatus = async () => {
            if (product?.No) {
                try {
                    const stock = await getProductStock(product.No);
                    setIsOutOfStock(stock <= 0);
                } catch (error) {
                    console.error("Failed to fetch product stock:", error);
                }
            }
        };

        fetchStockStatus();
    }, [product?.No]);

    const handleAddOrRemove = async () => {
        if (isOutOfStock) {
            console.log("Product is out of stock");
            return;
        }

        try {
            if (isInCart) {
                await removeFromCartAPI(userData.Email, product.No);
                const updatedCart = cart.filter((id) => id !== product.No);
                setCart(updatedCart);
                if (updateCart) {
                    updateCart(updatedCart);
                }
            } else {
                await addToCartAPI(userData.Email, product.No);
                const updatedCart = [...cart, product.No];
                setCart(updatedCart);
                if (updateCart) {
                    updateCart(updatedCart);
                }
            }
            setIsInCart(!isInCart);
            closeModal();
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    return (
        <div
            className="modal modal-backdrop-custom show p-5"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="productModalLabel"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-3">
                    <div className="modal-body d-flex">
                        <div className="w-50 pe-3">
                            <img
                                src={product.Image}
                                alt={product.Title}
                                className="img-fluid"
                                style={{ height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div className="w-50 ps-3">
                            <div className="h3 pb-3">{product.Title}</div>
                            <p style={{fontSize: "17px"}}>
                                    {product.Details}
                            </p>
                            <p className="text-secondary">
                                Category:
                                <span className="text-black fw-bold ms-2" style={{ fontSize: "18px" }}>
                                    {product.Category}
                                </span>
                            </p>
                            <p className="text-secondary">
                                Brand:
                                <span className="text-black fw-bold ms-2" style={{ fontSize: "18px" }}>
                                    {product.Brand}
                                </span>
                            </p>
                            <p className="text-secondary">
                                Price:
                                <span className="text-black fw-bold ms-2" style={{ fontSize: "18px" }}>
                                    ₹{product.SalePrice}
                                </span>
                            </p>
                            <div className="modal-footer mt-5">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${isInCart ? "btn-danger" : isOutOfStock ? "btn-secondary" : "btn-primary"}`}
                                    onClick={handleAddOrRemove}
                                    disabled={isOutOfStock}
                                >
                                    {isOutOfStock ? "Out of Stock" : isInCart ? "Remove from Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDescription;