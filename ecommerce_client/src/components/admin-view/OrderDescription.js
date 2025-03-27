import React, { useState, useEffect } from "react";
import { getUserByEmail } from "../../pages/admin-view/API";
<<<<<<< HEAD
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
=======
>>>>>>> b397825 (Commit)
import "./style.css";

function OrderDescription({ order, closePopup, isAdmin }) {
  const [userData, setUserData] = useState([]);
<<<<<<< HEAD
=======
  const [isVisible, setIsVisible] = useState(true);
>>>>>>> b397825 (Commit)

  useEffect(() => {
    if (isAdmin) {
      const fetchUserData = async () => {
        try {
          const data = await getUserByEmail(order.Email);
          if (data != null) {
            setUserData(data);
          } else {
            console.log("User not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [isAdmin, order.Email]);

<<<<<<< HEAD
  return (
    <Popup
      open={true}
      onClose={closePopup}
      contentStyle={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        padding: "20px",
        background: "white",
        maxWidth: "850px",
        maxHeight: "100vh",
        overflowY: "auto",
        backgroundColor: "#37ab96",
        border: "3px solid black"
      }}
    >
      <div className="popup-content popup-order">
        <button onClick={closePopup}>&times;</button>
        <h3>Order ID: {order.No}</h3>

        {isAdmin && (
          <div className="text-start py-3">
            <h4 className="text-center">Customer Details</h4>
            <p>
              <strong>Email:</strong> {userData.Email}
            </p>
            <p>
              <strong>Username:</strong> {userData.Username}
            </p>
            <p>
=======
  const handleClose = () => {
    setIsVisible(false);
    closePopup();
  };

  return (
    <div className={`order-description-popup-container ${isVisible ? "visible" : "hidden"}`} style={{width:"120vw"}}>
      <div className="order-description-popup">
        <button className="popup-close-btn mt-5" onClick={handleClose}>
          &times;
        </button>
        <h3 className="order-id fs-4 mb-3">
          {isAdmin ? `Order ID: ${order.No}` : 'Order'}
        </h3>

        {isAdmin && (
          <div className="customer-details">
            <h4 className="section-title">Customer Details</h4>
            <p className="detail">
              <strong>Email:</strong> {userData.Email}
            </p>
            <p className="detail">
              <strong>Username:</strong> {userData.Username}
            </p>
            <p className="detail">
>>>>>>> b397825 (Commit)
              <strong>Phone:</strong> {userData.Phone}
            </p>
          </div>
        )}

<<<<<<< HEAD
        <h4>Order Date: {order.OrderDate}</h4>

        <h4>Products</h4>
        <table>
=======
        <h4 className="order-date">Order Date: {order.OrderDate}</h4>

        <h4 className="products-title">Products</h4>
        <table className="products-table">
>>>>>>> b397825 (Commit)
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.enrichedItems.map((item, index) => (
              <tr key={index}>
<<<<<<< HEAD
                <td>{index+1}</td>
                <td>{item.productDetails.Title}</td>
                <td>{item.productDetails.Category}</td>
                <td>{item.productDetails.SalePrice}</td>
                <td>{item.Quantity}</td>
=======
                <td>{isAdmin ? item.productDetails.No : index + 1}</td>
                <td>{item.productDetails.Title}</td>
                <td>{item.productDetails.Category}</td>
                <td>{item.productDetails.SalePrice}</td>
                <td>{item.Quantity ?? 1}</td>
>>>>>>> b397825 (Commit)
              </tr>
            ))}
          </tbody>
        </table>

<<<<<<< HEAD

        <div>
          <strong>Payment Method:</strong> {order.PaymentMethod}
        </div>
        <div>
          <strong>Total Amount:</strong> {order.TotalAmount}
        </div>
      </div>
    </Popup>
=======
        <div className="payment-method">
          <strong>Payment Method:</strong> {order.PaymentMethod}
        </div>
        <div className="total-amount">
          <strong>Total Amount:</strong> {order.TotalAmount}
        </div>
      </div>
    </div>
>>>>>>> b397825 (Commit)
  );
}

export default OrderDescription;