import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { getProductById } from "../API";
import "./cart-style.css";
import ProductDescription from '../../../components/shopping-view/ProductDescription';
import { removeFromCartAPI, getCartByEmail } from "../API";
import useUserDetails from "../../useUserDetails"; 
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate=useNavigate();

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const { userData, isUserDataReady } = useUserDetails();
=======
import "./cart-style.css";
import { getCartByEmail, getProductByIdForCart, removeFromCartAPI } from "../API";
import useUserDetails from "../../useUserDetails";
import { useNavigate } from "react-router-dom";
import { ShoppingCart as CartIcon } from 'lucide-react';

function ShoppingCart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { userData, isUserDataReady } = useUserDetails();

    const handleCardClick = (product) => {
        navigate(`/shopping/listing/${product.No}`, { state: { product, from: "cart" } });
    };

    const handleRemoveFromCart = async (productId) => {
        if (!userData?.Email) return;
        try {
            await removeFromCartAPI(userData.Email, productId);
            setCartProducts(prevCart => prevCart.filter(productArray => productArray[0]?.No !== productId));
        } catch (error) {
            console.error("Failed to remove product from cart:", error);
        }
    };

    const calculateTotal = () => {
        return cartProducts.reduce((total, productArray) => {
            return total + (productArray[0]?.SalePrice || 0);
        }, 0);
    };
>>>>>>> b397825 (Commit)

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (isUserDataReady && userData?.Email) {
                try {
<<<<<<< HEAD
                    const user = await getCartByEmail(userData.Email);
                    const productIds = user?.Cart || [];
                    const products = await Promise.all(
                        productIds.map(async (productId) => {
                            return await getProductById(productId);
=======
                    setLoading(true);
                    const user = await getCartByEmail(userData.Email);
                    const productIds = Array.isArray(user?.Cart) ? user.Cart : [];
                    const products = await Promise.all(
                        productIds.map(async (productId) => {
                            return await getProductByIdForCart(productId);
>>>>>>> b397825 (Commit)
                        })
                    );
                    setCartProducts(products);
                } catch (error) {
                    console.error("Failed to fetch cart products:", error);
<<<<<<< HEAD
                }
            }
        }
        fetchCartProducts();
    }, [isUserDataReady, userData?.Email]);

    const removeFromCart = async (productId) => {
        try {
            const response = await removeFromCartAPI(userData.Email, productId);
            if (response.error) {
                console.error("Failed to remove product:", response.error);
                return;
            }
            if (response.updatedCart) {
                const products = await Promise.all(
                    response.updatedCart.map((productId) => getProductById(productId))
                );
                setCartProducts(products);
            } else {
                console.error("Failed to fetch updated cart details.");
            }
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    return (
        <div className="shopping-cart-page">
            <div className="shopping-cart mx-auto">
                <h1>Shopping Cart</h1>
                {cartProducts.length > 0 ? (
                    <div className="cart-items">
                        {cartProducts.map((productArray, index) => (
                            <div className="cart-item" key={index} onClick={() => handleCardClick(productArray[0])}>
                                <img
                                    src={productArray[0]?.Image || "/placeholder.jpg"}
                                    alt={productArray[0]?.Title || "Product"}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{productArray[0]?.Title}</h3>
                                    <p className="cart-item-price">Price: ₹{productArray[0]?.SalePrice}</p>
                                    <p className="cart-item-category">
                                        {productArray[0]?.Category || "No category available."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                {cartProducts.length > 0 && (
                    <button className="proceed-to-buy-btn" onClick={() => navigate('/shopping/checkout')}>
                        Proceed to Buy
                    </button>
                )}
                {showModal && selectedProduct && (
                    <ProductDescription
                        product={selectedProduct}
                        closeModal={closeModal}
                        removeFromCart={removeFromCart}
                    />
=======
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCartProducts();
    }, [isUserDataReady, userData?.Email]);

    if (loading) {
        return (
            <div className="shopping-cart-page d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="shopping-cart-page d-flex align-items-center">
            <div className="container">
                <div className="cart-header text-center d-flex flex-row align-items-center justify-content-between">
                    <h1 className="display-5 d-flex align-items-center">
                        <CartIcon className="me-3" size={32} />
                        Shopping Cart
                    </h1>
                    <span className="badge rounded-pill fs-5" style={{backgroundColor : "#00ff95"}}>
                        {cartProducts.length} items
                    </span>
                </div>

                {cartProducts.length > 0 ? (
                    <div className="d-flex flex-column align-items-center">
                        <div className="cart-items w-100 d-flex flex-column align-items-center">
                            {cartProducts.map((productArray, index) => (
                                <div
                                    className="cart-item w-75"
                                    key={index}
                                    onClick={() => handleCardClick(productArray[0])}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={productArray[0]?.Image || "/placeholder.jpg"}
                                                alt={productArray[0]?.Title || "Product"}
                                                className="cart-item-image"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="cart-item-details">
                                                <h3 className="cart-item-title">{productArray[0]?.Title}</h3>
                                                <p className="cart-item-price">₹{(productArray[0]?.SalePrice || 0).toLocaleString()}</p>
                                                <p className="cart-item-category">
                                                    {productArray[0]?.Category || "No category available"}
                                                </p>
                                                <button className="btn btn-outline-danger btn-sm mt-2" 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        if (productArray[0]?.No) handleRemoveFromCart(productArray[0]?.No); 
                                                    }}>
                                                    Remove from Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary-container w-75 mt-4">
                            <div className="cart-summary p-3">
                                {/* <h3>Order Summary</h3>
                                <div className="summary-item">
                                    <span>Subtotal</span>
                                    <span>₹{calculateTotal().toLocaleString()}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="summary-item">
                                    <span>Tax</span>
                                    <span>₹{(calculateTotal() * 0.18).toLocaleString()}</span>
                                </div>
                                <div className="summary-item summary-total">
                                    <span>Total</span>
                                    <span>₹{(calculateTotal() * 1.18).toLocaleString()}</span>
                                </div> */}
                                <button
                                    className="proceed-to-buy-btn w-100 mt-3"
                                    onClick={() => navigate('/shopping/checkout')}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart text-center">
                        <CartIcon size={64} className="mb-4 text-muted" />
                        <p>Your cart is empty</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/shopping')}
                        >
                            Continue Shopping
                        </button>
                    </div>
>>>>>>> b397825 (Commit)
                )}
            </div>
        </div>
    );
}

<<<<<<< HEAD
export default ShoppingCart;
=======
export default ShoppingCart;
>>>>>>> b397825 (Commit)
