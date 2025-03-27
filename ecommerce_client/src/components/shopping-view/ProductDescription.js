import React, { useEffect, useState } from "react";
import './style.css';
import useUserDetails from "../../pages/useUserDetails";
import {
    getCartByEmail,
    addToCartAPI,
    removeFromCartAPI,
    getProductStock,
    addReviewAPI,
    getReviewsAPI
} from "../../pages/shopping-view/API";
import Swal from "sweetalert2";

function ProductDescription({ product, closeModal, updateCart }) {
    const { userData, isUserDataReady } = useUserDetails();
    const [cart, setCart] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);

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

    useEffect(() => {
        const fetchReviews = async () => {
            if (product?.No) {
                try {
                    const fetchedReviews = await getReviewsAPI(product.No);
                    setReviews(fetchedReviews);
                } catch (error) {
                    console.error("Failed to fetch reviews:", error);
                }
            }
        };

        fetchReviews();
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

    const handleReviewSubmit = async () => {
        if (!review.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Review can't be empty!",
            });
            return;
        }

        try {
            await addReviewAPI(product.No, userData.Username, review);
            setReviews([...reviews, { username: userData.Username, review }]);
            setReview("");
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "We value your feedback. Thanks for the review!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Failed to submit review:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to save review! Please try again later!",
            });
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
                    <div className="modal-body d-flex flex-column flex-sm-row">
                        {/* Image Section */}
                        <div className="w-100 d-flex justify-content-center align-items-center mb-3 mb-sm-0">
                            <img
                                src={product.Image}
                                alt={product.Title}
                                className="img-fluid"
                                style={{ maxHeight: "300px", objectFit: "contain" }}
                            />
                        </div>
                        {/* Details Section */}
                        <div className="w-100 w-sm-50 ps-3">
                            <div className="h3 pb-3">{product.Title}</div>
                            <p style={{ fontSize: "17px" }}>
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

                            {/* Review Section */}
                            <div className="mt-4">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Write your review here..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary mt-2"
                                    onClick={handleReviewSubmit}
                                >
                                    Submit Review
                                </button>
                            </div>

                            <div className="mt-4">
                                <h5>Reviews:</h5>
                                {reviews.length > 0 ? (
                                    reviews.map((r, index) => (
                                        <div key={index} className="review-item">
                                            <strong className="review-username">{r.username}</strong>
                                            <p className="review-text">{r.review}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet. Be the first to review!</p>
                                )}
                            </div>

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