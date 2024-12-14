import React, { useEffect, useState } from "react";
import useUserDetails from "../../useUserDetails";
import { getCartByEmail, getProductById, removeFromCartAPI, emptyCart, addToOrder } from "../API";
import './checkout-style.css';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ShoppingCheckout() {
    const { userData, isUserDataReady } = useUserDetails();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const shipping = 30;

    const navigate=useNavigate();

    useEffect(() => {
        if (isUserDataReady && userData?.Email) {
            const fetchCartProducts = async () => {
                try {
                    const user = await getCartByEmail(userData.Email);
                    const productIds = user?.Cart || [];
                    const products = await Promise.all(
                        productIds.map(async (id) => {
                            const product = await getProductById(id);
                            return product;
                        })
                    );
                    setCart(products);
                } catch (error) {
                    console.error("Failed to fetch cart products:", error);
                }
            };
            fetchCartProducts();
        }
    }, [isUserDataReady, userData?.Email]);

    useEffect(() => {
        const totalAmount = cart.reduce((total, group) => {
            return total + group.reduce((groupTotal, product) => {
                return groupTotal + (product.SalePrice * (product.Quantity || 1));
            }, 0);
        }, 0);
        setTotal(totalAmount);
    }, [cart]);

    const handleRemoveItem = async (groupIndex, productId) => {
        try {
            const response = await removeFromCartAPI(userData.Email, productId);
            if (response.success) {
                const user = await getCartByEmail(userData.Email);
                const productIds = user?.Cart || [];
                const products = await Promise.all(
                    productIds.map(async (id) => {
                        const product = await getProductById(id);
                        return product;
                    })
                );
                setCart(products);
            } else {
                console.error("Failed to remove item from the cart:", response.message);
                alert("Failed to remove the item. Please try again.");
            }
        } catch (error) {
            console.error("Error removing item from the cart:", error);
            alert("Something went wrong. Please try again later.");
        }
    };

    const handlePlaceOrder = async () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            Swal.fire({
                title: 'Error',
                text: 'Please select a payment method.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return;
        }

        const paymentMethod = selectedPayment.id;

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to place the order!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Place it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            const orderItems = cart.flat().map(product => product.No);
            try {
                const response = await addToOrder({
                    email: userData.Email,
                    items: orderItems,
                    paymentMethod,
                    totalAmount: total + shipping,
                });

                if (response.success) {
                    setCart([]);
                    setTotal(0);

                    Swal.fire({
                        title: 'Order Placed!',
                        text: 'Your order has been successfully placed.',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });

                    await emptyCart(userData.Email);
                    navigate('/shopping/cart');
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message || 'Failed to place the order. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Okay',
                    });
                }
            } catch (error) {
                console.error('Error placing order:', error.message);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        });
    };


    return (
        <div className="checkout-container" style={{ padding: "30px", backgroundColor: "#fceae8" }}>
            <div className="text-center mb-4 h1" style={{ color: "#150647" }}>Checkout</div>

            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title mb-4 mt-1">Review Your Items</h3>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover checkout-table">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "100px" }}>Image</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th style={{ width: "120px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((group, groupIndex) =>
                                    group.map((product, productIndex) => (
                                        <tr key={`${groupIndex}-${productIndex}`} style={{ cursor: "pointer" }}>
                                            <td>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <img
                                                        src={product.Image || "default-image-path.jpg"}
                                                        alt={product.Title || "Product Image"}
                                                        style={{
                                                            width: "60px",
                                                            height: "60px",
                                                            objectFit: "cover",
                                                            borderRadius: "5px"
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>{product.Title}</td>
                                            <td>{product.Category}</td>
                                            <td>{product.Quantity || 1}</td>
                                            <td>₹{product.SalePrice}</td>
                                            <td>₹{(product.SalePrice * (product.Quantity || 1)).toFixed(2)}</td>
                                            <td>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemoveItem(groupIndex, product.No)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4 mt-1">Order Summary</h3>
                            <div>
                                <p><strong>Items Total:</strong> ₹{total}</p>
                                <p><strong>Shipping:</strong> ₹{shipping}</p>
                                <p><strong>Total:</strong> ₹{(total + shipping)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4 mt-1">Payment Options</h3>
                            <div>
                                <p>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        id="DebitCard" 
                                        className="me-2"
                                        style={{cursor: "pointer"}}
                                    /> 
                                    <label 
                                        htmlFor="DebitCard" 
                                        style={{cursor: "pointer"}}
                                    >
                                        Debit Card
                                    </label>
                                </p>
                                <p>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        id="UPI" 
                                        className="me-2"
                                        style={{cursor: "pointer"}} 
                                    />  
                                    <label 
                                        htmlFor="UPI" 
                                        style={{cursor: "pointer"}}
                                    >
                                        UPI
                                    </label>
                                </p>
                                <p>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        id="COD" 
                                        className="me-2"
                                        style={{cursor: "pointer"}} 
                                    /> 
                                    <label 
                                        htmlFor="COD" 
                                        style={{cursor: "pointer"}}
                                    >
                                        Cash on Delivery
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#150647", padding: "10px 20px" }}
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>
            </div>
        </div>

    );
}

export default ShoppingCheckout;