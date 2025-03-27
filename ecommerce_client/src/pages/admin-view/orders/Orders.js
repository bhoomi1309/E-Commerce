import { useEffect, useState } from "react";
import { fetchOrders, fetchProducts } from "../API";
import OrderDescription from "../../../components/admin-view/OrderDescription";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
<<<<<<< HEAD
    const isAdmin=true;
=======
    const isAdmin = true;
>>>>>>> b397825 (Commit)

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        getOrders();
    }, []);

    useEffect(() => {
<<<<<<< HEAD
            fetchProducts().then((res) => {
                setOrderItems(res);
            });
        }, []);

    const handleOrderClick = (order) => {
        const enrichedItems = order.Items.map((item) => {
            const productDetails = orderItems.find((product) => product.No === item);
            return { ...item, productDetails };
=======
        fetchProducts().then((res) => {
            setOrderItems(res);
        });
    }, []);

    const handleOrderClick = (order) => {
        const enrichedItems = order.Items.map((item) => {
            const productDetails = orderItems.find(
                (product) => product.No === item.No
            );
    
            if (productDetails) {
                return {
                    ...item,
                    productDetails,
                };
            } else {
                return item;
            }
>>>>>>> b397825 (Commit)
        });
        setSelectedOrder({ ...order, enrichedItems });
    };

    const closePopup = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="container my-4">
<<<<<<< HEAD
            <div className="row">
                <div className="col text-center fw-bold" style={{ fontSize: "45px" }}>
                    Orders
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.No} onClick={() => handleOrderClick(order)} style={{ cursor: "pointer" }}>
                                    <td>{order.No}</td>
                                    <td>{order.OrderDate}</td>
                                    <td>{order.PaymentMethod}</td>
                                    <td>{order.TotalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
=======
            <div className="row mb-4">
                <div className="col">
                    <h1 className="text-center display-4" style={{color:"rgb(255 255 255 / 67%)"}}>Orders</h1>
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <div className="list-group">
                        {orders.map((order) => (
                            <div
                                key={order.No}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleOrderClick(order)}
                                role="button"
                            >
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">
                                            <span className="badge bg-primary me-2">#{order.No}</span>
                                            Order Date: {order.OrderDate}
                                        </h5>
                                        <p className="mb-1">
                                            <span className="text-muted me-3">
                                                <i className="bi bi-credit-card me-1"></i>
                                                {order.PaymentMethod}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="mb-1">{order.TotalAmount}</h5>
                                        <small className="text-muted">Click to view details</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
>>>>>>> b397825 (Commit)
                </div>
            </div>

            {selectedOrder && (
                <OrderDescription
                    order={selectedOrder}
                    closePopup={closePopup}
                    isAdmin={isAdmin}
<<<<<<< HEAD
=======
                    style={{}}
>>>>>>> b397825 (Commit)
                />
            )}
        </div>
    );
}

export default AdminOrders;