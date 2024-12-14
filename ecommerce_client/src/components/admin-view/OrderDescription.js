import React from "react";

function OrderDescription({ order, closePopup }) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 order-details-popup text-center p-4 position-relative">
                    <button type="button" className="btn btnClose mt-2" onClick={closePopup}>Close</button>
                    <div className="row mb-4">
                        <div className="col">
                            <h3>Order ID: {order.No}</h3>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col text-start">
                            <p><strong>Order Date:</strong> {order.OrderDate}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <p><strong>Products</strong></p>
                            <table className="table table-responsive tableItems">
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
                                    {order.Items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.ProductId}</td>
                                            <td>{item.Title}</td>
                                            <td>{item.Category}</td>
                                            <td>{item.SalePrice}</td>
                                            <td>{item.Quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col">
                            <p><strong>Payment Method:</strong> {order.PaymentMethod}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <p><strong>Total Amount:</strong> {order.TotalAmount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDescription;
