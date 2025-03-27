<<<<<<< HEAD
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

=======
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from 'lucide-react';
import { FiShoppingBag } from "react-icons/fi";
import useUserDetails from "../../pages/useUserDetails";
import { getCartByEmail } from "../../pages/shopping-view/API";
import Chatbot from "../../components/shopping-view/Chatbot";
import './style.css';

function ShoppingLayout() {
    const location = useLocation();
    const { userData, isUserDataReady } = useUserDetails();
    const [userInitial, setUserInitial] = useState("");
    const [cartItemCount, setCartItemCount] = useState(0);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
>>>>>>> b397825 (Commit)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserDataReady) {
            setUserInitial("?");
        } else {
            setUserInitial(userData.Username.charAt(0).toUpperCase());
        }
    }, [userData, isUserDataReady]);

<<<<<<< HEAD
=======
    useEffect(() => {
        const getCartItemCount = async () => {
            if (isUserDataReady && userData?.Email) {
                const cart = await getCartByEmail(userData.Email);
                setCartItemCount(cart.length);
            }
        };
        getCartItemCount();
    }, [userData, isUserDataReady]);

>>>>>>> b397825 (Commit)
    const selectedCategory = location.state?.category;

    const handleLogout = () => {
        localStorage.removeItem("user");
<<<<<<< HEAD
=======
        sessionStorage.removeItem('user');
>>>>>>> b397825 (Commit)
        window.location.href = "/";
    };

    const handleNavigation = (path) => {
        setIsChatbotOpen(false);
        navigate(path);
<<<<<<< HEAD
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
=======
        // Optional: Close menu on smaller screens
        if (window.innerWidth < 992) {
            setIsMenuOpen(false);
        }
    };

    const isActive = (item) => {
        if (item.state?.category) {
            return selectedCategory === item.state.category;
        }
        return location.pathname === item.path && !selectedCategory;
    };

    const navItems = [
        { path: "/shopping", label: "Home" },
        { path: "/shopping/listing", label: "Products" },
        { path: "/shopping/listing", label: "Men", state: { category: "Male" } },
        { path: "/shopping/listing", label: "Women", state: { category: "Female" } },
        { path: "/shopping/search", label: "Search" },
        { path: "/shopping/wishlist", label: "Wishlist" }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="navbar navbar-expand-lg fixed-top navbar-dark mobile-navbar"
                style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="container-fluid px-3">
                    {/* Logo */}
                    <Link to="/shopping" className="navbar-brand">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ width: "120px", height: "auto" }}
                        >
                            <img src='/Adaa.png' alt="Adaa Logo" style={{ width: "100%", height: "auto" }} />
                        </motion.div>
                    </Link>

                    {/* Mobile menu button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-controls="navbarContent"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
                    </motion.button>

                    {/* Navigation Content */}
                    <div 
                        className={`navbar-collapse mobile-menu ${isMenuOpen ? 'show' : ''}`} 
                        id="navbarContent"
                    >
                        {/* Navigation Items */}
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            {navItems.map((item) => {
                                const active = isActive(item);
                                return (
                                    <motion.li
                                        key={item.label}
                                        className="nav-item"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to={item.path}
                                            state={item.state}
                                            className={`nav-link px-3 position-relative text-white ${active ? 'active fw-bold' : ''}`}
                                            onClick={() => handleNavigation(item.path)}
                                        >
                                            {item.label}
                                            {active && (
                                                <motion.div
                                                    className="position-absolute bottom-0 start-0 w-100"
                                                    style={{ height: '2px', backgroundColor: '#fff' }}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>

                        {/* User Actions */}
                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/shopping/cart" className="position-relative text-white">
                                    <FiShoppingBag size={30} />
                                    {cartItemCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        >
                                            {cartItemCount}
                                        </motion.span>
                                    )}
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/shopping/account" className="text-decoration-none">
                                    <div 
                                        className="bg-white rounded-circle d-flex align-items-center justify-content-center text-dark"
                                        style={{ width: '32px', height: '32px' }}
>>>>>>> b397825 (Commit)
                                    >
                                        {userInitial}
                                    </div>
                                </Link>
<<<<<<< HEAD
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
=======
                            </motion.div>

                            {userData && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="btn btn-danger d-flex align-items-center gap-2"
                                >
                                    <LogOut size={19} />
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.nav>

            <div style={{ marginTop: "75px" }}>
>>>>>>> b397825 (Commit)
                <Outlet />
            </div>

            {/* Chatbot */}
<<<<<<< HEAD
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
=======
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                className="btn btn-teal position-fixed bottom-0 end-0 m-4 rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                    width: '56px', 
                    height: '56px',
                    backgroundColor: 'black',
                    color: 'white',
                    zIndex: 1050 
                }}
            >
                💬
            </motion.button>

            <AnimatePresence>
                {isChatbotOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="position-fixed bottom-0 end-0 mb-5 me-4"
                        style={{ zIndex: 1050 }}
                    >
                        <Chatbot setIsChatbotOpen={setIsChatbotOpen} />
                    </motion.div>
                )}
            </AnimatePresence>
>>>>>>> b397825 (Commit)
        </>
    );
}

export default ShoppingLayout;