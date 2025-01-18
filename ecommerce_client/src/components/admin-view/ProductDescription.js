import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductDescription({ selectedProduct, closeModal, deleteModal, updateStock }) {
    const navigate = useNavigate();
    const [stockChange, setStockChange] = useState(0);

    const handleStockUpdate = (isAdding) => {

        const updatedStock = isAdding
            ? selectedProduct.Stock + stockChange
            : selectedProduct.Stock - stockChange;

        if (updatedStock < 0) {
            alert("Stock cannot be negative.");
            return;
        }

        updateStock(selectedProduct.No, updatedStock);
        setStockChange(0);
    };

    return (
        <div className="modal show d-block modal-backdrop-custom" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "800px", width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedProduct.Title}</h5>
                        <button
                            type="button"
                            className="btn btn-close fw-bold"
                            onClick={closeModal}
                            style={{ position: "absolute", top: "15px", right: "15px", zIndex: "10" }}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                            {/* Image Section */}
                            <div style={{ flex: "1", maxWidth: "50%" }}>
                                <img
                                    src={selectedProduct.Image}
                                    alt={selectedProduct.Title}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </div>

                            {/* Details Section */}
                            <div style={{ flex: "2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <p className="fw-bold mb-1">Title:</p>
                                    <p>{selectedProduct.Title}</p>

                                    <p className="fw-bold mb-1">Brand:</p>
                                    <p>{selectedProduct.Brand}</p>

                                    <p className="fw-bold mb-1">Details:</p>
                                    <p>{selectedProduct.Details}</p>
                                </div>
                                <div>
                                    <p className="fw-bold mb-1">Cost Price:</p>
                                    <p>{selectedProduct.Price}</p>

                                    <p className="fw-bold mb-1">Sale Price:</p>
                                    <p>{selectedProduct.SalePrice}</p>

                                    <p className="fw-bold mb-1">Stock:</p>
                                    <p>{selectedProduct.Stock}</p>
                                </div>
                            </div>
                        </div>
                        {/* Modify Stock Section */}
                        <div style={{ marginTop: "1rem" }}>
                            <p className="fw-bold">Modify Stock:</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter quantity"
                                    value={stockChange}
                                    onChange={(e) => setStockChange(Number(e.target.value))}
                                    style={{ maxWidth: "150px" }}
                                />
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleStockUpdate(true)}
                                    disabled={stockChange <= 0}
                                >
                                    Add Stock
                                </button>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleStockUpdate(false)}
                                    disabled={stockChange <= 0}
                                >
                                    Remove Stock
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal-footer"
                        style={{
                            marginTop: "1rem",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                deleteModal(selectedProduct.No, navigate);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDescription;