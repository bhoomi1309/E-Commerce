import React, { useState, useEffect } from "react";
import useUserDetails from "../../useUserDetails";
import { getOrdersByEmail, fetchProducts } from "../API";
import './account-style.css';
import OrderDescription from "../../../components/admin-view/OrderDescription";

function ShoppingAccount() {
    const { userData, isUserDataReady } = useUserDetails();
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const isAdmin = false;

    useEffect(() => {
        fetchProducts().then((res) => {
<<<<<<< HEAD
            setOrderItems(res);
=======
            setOrderItems(res.reverse());
>>>>>>> b397825 (Commit)
        });
    }, []);

    const handleOrderClick = (order) => {
        const enrichedItems = order.Items.map((item) => {
            const productDetails = orderItems.find(
                (product) => product.No === item.No
            );
<<<<<<< HEAD
            return {
                ...item,
                productDetails,
            };
        });
    
=======

            if (productDetails) {
                return {
                    ...item,
                    productDetails,
                };
            } else {
                return item;
            }
        });

>>>>>>> b397825 (Commit)
        setSelectedOrder({ ...order, enrichedItems });
    };

    useEffect(() => {
        if (isUserDataReady && userData?.Email) {
            getOrdersByEmail(userData.Email)
                .then((data) => {
                    setOrders(data.reverse());
                    setIsLoadingOrders(false);
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                    setIsLoadingOrders(false);
                });
        }
    }, [isUserDataReady, userData?.Email]);

    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const closePopup = () => {
        setSelectedOrder(null);
    };

    return (
<<<<<<< HEAD
        <div
            className="shopping-account-container"
            style={{
                minHeight: "91.3vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f4f4",
                padding: "20px",
            }}
        >
            {isUserDataReady ? (
                <div
                    className="shopping-account-card"
                    style={{
                        backgroundColor: "#fff",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        maxWidth: "600px",
                        width: "100%",
                    }}
                >
                    <h1
                        style={{
                            color: "#150647",
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            marginBottom: "20px",
                        }}
                    >
                        Welcome, {userData.Username}!
                    </h1>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            color: "#555",
                            marginBottom: "30px",
                            lineHeight: "1.5",
                        }}
                    >
                        Here's your account information:
                    </p>
                    <ul
                        style={{
                            listStyleType: "none",
                            padding: 0,
                            textAlign: "left",
                            fontSize: "1rem",
                            color: "#333",
                        }}
                    >
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Email:</strong> {userData.Email}
                        </li>
                        <li style={{ marginBottom: "10px" }}>
=======
        <div className="shopping-account-container">
            {isUserDataReady ? (
                <div className="shopping-account-card">
                    <h1 className="welcome-heading">
                        Welcome, <span className="username">{userData.Username}</span>!
                    </h1>
                    <p className="account-info-text">
                        Here's your account information:
                    </p>
                    <ul className="account-info-list">
                        <li>
                            <strong>Email:</strong> {userData.Email}
                        </li>
                        <li>
>>>>>>> b397825 (Commit)
                            <strong>Phone:</strong> {userData.Phone}
                        </li>
                    </ul>

<<<<<<< HEAD
                    <h2
                        style={{
                            marginTop: "40px",
                            color: "#150647",
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                        }}
                    >
                        Your Orders
                    </h2>
                    {isLoadingOrders ? (
                        <p style={{ fontSize: "1.2rem", color: "#999" }}>
                            Loading your orders...
                        </p>
                    ) : orders.length > 0 ? (
                        <div
                            className="orders-list"
                            style={{
                                marginTop: "20px",
                                textAlign: "left",
                                width: "100%",
                            }}
                        >
=======
                    <h2 className="orders-heading">
                        Your Orders
                    </h2>
                    {isLoadingOrders ? (
                        <p className="loading-text">
                            Loading your orders...
                        </p>
                    ) : orders.length > 0 ? (
                        <div className="orders-list">
>>>>>>> b397825 (Commit)
                            {orders.map((order) => (
                                <div
                                    key={order.No}
                                    className="order-card"
                                    onClick={() => handleOrderClick(order)}
<<<<<<< HEAD
                                    style={{
                                        backgroundColor: "#f9f9f9",
                                        padding: "15px",
                                        marginBottom: "15px",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        cursor: "pointer",
                                    }}
=======
>>>>>>> b397825 (Commit)
                                >
                                    <p>
                                        <strong>Date:</strong> {parseDateString(order.OrderDate).toLocaleDateString()}
                                    </p>
                                    <p>
<<<<<<< HEAD
                                        <strong>Items:</strong> {order.Items.reduce((total, item) => total + item.Quantity, 0)}
=======
                                        <strong>Items:</strong> {order.Items.reduce((sum, item) => sum + item.Quantity, 0)}
>>>>>>> b397825 (Commit)
                                    </p>
                                    <p>
                                        <strong>Total:</strong> ₹{order.TotalAmount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
<<<<<<< HEAD
                        <p
                            style={{
                                fontSize: "1.2rem",
                                color: "#999",
                            }}
                        >
=======
                        <p className="no-orders-text">
>>>>>>> b397825 (Commit)
                            You have no orders yet.
                        </p>
                    )}

                    {selectedOrder && (
                        <OrderDescription
                            order={selectedOrder}
                            closePopup={closePopup}
                            isAdmin={isAdmin}
                        />
                    )}
                </div>
            ) : (
<<<<<<< HEAD
                <p
                    style={{
                        fontSize: "1.5rem",
                        color: "#999",
                    }}
                >
=======
                <p className="loading-text">
>>>>>>> b397825 (Commit)
                    Loading your account details...
                </p>
            )}
        </div>
    );
}

export default ShoppingAccount;