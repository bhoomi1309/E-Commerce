import { useEffect, useState } from "react";
import { fetchOrders } from "../API";
import OrderDescription from '../../../components/admin-view/OrderDescription';

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const handleOrderClick = (order) => {
        setSelectedOrder(order); // Set the selected order to display its details
    };

    const closePopup = () => {
        setSelectedOrder(null); // Close the popup
    };

    return (
        <div className="container my-4">
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
                </div>
            </div>

            {selectedOrder && (
                <OrderDescription 
                    order={selectedOrder} 
                    closePopup={closePopup} 
                />
            )}
        </div>
    );
}

export default AdminOrders;
