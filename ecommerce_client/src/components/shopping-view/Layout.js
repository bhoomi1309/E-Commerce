import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useUserDetails from "../../pages/useUserDetails";
import Chatbot from "../../components/shopping-view/Chatbot";
import { useNavigate } from 'react-router-dom';

function ShoppingLayout() {

    const location = useLocation();
    const { userData, isUserDataReady } = useUserDetails();
    const [userInitial, setUserInitial] = useState("");
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserDataReady) {
            setUserInitial("?");
        } else {
            setUserInitial(userData.Username.charAt(0).toUpperCase());
        }
    }, [userData, isUserDataReady]);

    const selectedCategory = location.state?.category;

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const handleNavigation = (path) => {
        setIsChatbotOpen(false);
        navigate(path);
    };

    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/shopping">
                        <i className="fa-solid fa-charging-station me-3"></i>ECommerce
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-5">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link me-2 ${location.pathname === "/shopping" ? "fw-bold" : ""}`}
                                    to="/shopping"
                                    onClick={() => handleNavigation("/shopping")}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link me-2 ${location.pathname === "/shopping/listing" &&
                                        !selectedCategory
                                        ? "fw-bold"
                                        : ""
                                        }`}
                                    to="/shopping/listing"
                                >
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link me-2 ${selectedCategory === "Male" ? "fw-bold" : ""}`}
                                    to="/shopping/listing"
                                    state={{ category: "Male" }}
                                >
                                    Men
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link me-2 ${selectedCategory === "Female" ? "fw-bold" : ""}`}
                                    to="/shopping/listing"
                                    state={{ category: "Female" }}
                                >
                                    Women
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link me-2 ${location.pathname === "/shopping/search" &&
                                        !selectedCategory
                                        ? "fw-bold"
                                        : ""
                                        }`}
                                    to="/shopping/search"
                                >
                                    Search
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link me-2 ${location.pathname === "/shopping/aswdc" &&
                                        !selectedCategory
                                        ? "fw-bold"
                                        : ""
                                        }`}
                                    to="/shopping/aswdc"
                                >
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item pt-1">
                                <Link
                                    to="/shopping/cart"
                                    style={{
                                        textDecoration: "none",
                                        display: "inline-block",
                                    }}
                                    className="text-dark"
                                >
                                        <i
                                            className="fa-solid fa-cart-shopping fs-3 me-1"
                                            style={{ position: "relative" }}
                                        ></i>
                                </Link>
                            </li>
                            <li className="nav-item pt-1 ms-2">
                                <Link
                                    to="/shopping/account"
                                    style={{
                                        textDecoration: "none",
                                        display: "inline-block",
                                    }}
                                >
                                    <div
                                        className="bg-dark rounded-circle px-2 fs-5 mx-lg-3 text-light"
                                        style={{ border: "55px", cursor: "pointer" }}
                                    >
                                        {userInitial}
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                {userData && (
                                    <div
                                        className="mx-lg-2 btn btn-danger logout-btn"
                                        onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: "63px" }}>
                <Outlet />
            </div>

            {/* Chatbot */}
            <div>
                <button
                    className="chatbot-toggle-btn"
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        backgroundColor: "#00796b",
                        color: "#fff",
                        border: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        zIndex: "2000",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    💬
                </button>

                {/* Overlay */}
                {isChatbotOpen && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 999,
                        }}
                        onClick={() => setIsChatbotOpen(false)}
                    ></div>
                )}

                {/* Chatbot Container */}
                {isChatbotOpen && (
                    <div
                        className="chatbot-container"
                    >
                        <Chatbot setIsChatbotOpen={setIsChatbotOpen} />
                    </div>
                )}
            </div>
        </>
    );
}

export default ShoppingLayout;