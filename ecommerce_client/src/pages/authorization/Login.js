<<<<<<< HEAD
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {checkUser} from './API';
import Swal from 'sweetalert2';
import { useUser } from './UserContext';

function Login(){
    const [user,setUser]=useState({
        Email:'',
        Password:''
    });
    const  {setUserGlobal}  = useUser();
    const navigate = useNavigate();

    const forgotPassword = async (e) => {
        navigate('/auth/forgot-password');
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (user.Email === '' || user.Password === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all the fields for login!",
            });
            return;
        }
    
        try {
            const response = await checkUser(user);
            if (response.success) {
                setUserGlobal(response.user);
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You have logged in successfully",
                });
=======
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { checkUser } from './API';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';
import '../../components/authorization/style.css';

function Login() {
    const [user, setUser] = useState({
        Email: '',
        Password: ''
    });
    const { setUserGlobal } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Email format validation
        const isValidEmail = /\S+@\S+\.\S+/;
        if (!isValidEmail.test(user.Email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Password validation
        if (user.Password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (user.Email === '' || user.Password === '') {
            toast.error("Please fill in all the fields for login!");
            return;
        }

        setLoading(true); // Set loading state
        console.log("Loading state set to true");

        try {
            const response = await checkUser(user);
            console.log("API response:", response);

            if (response.success) {
                setUserGlobal(response.user);
                console.log("User set in global state");

                toast.success("You have logged in successfully");

                // Navigate after the toast notification
>>>>>>> b397825 (Commit)
                if (response.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/shopping');
                }
<<<<<<< HEAD
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: response.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again later.",
            });
            console.error("Login error:", error);
        }
    };
    
    return(
        <>
            <div className="container px-lg-4">
                <div className="row text-center">
                    <div className="col h1">
=======
                console.log("Navigation complete");
            } else {
                toast.error(response.message);
                console.log("Login failed alert shown");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again later.");
            console.log("Error alert shown");
        } finally {
            setLoading(false); // Reset loading state
            console.log("Loading state set to false");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFormSubmit(e);
        }
    };

    const handleForgotPassword = async (e) => {
        navigate('/auth/forgot-password');
    };

    return (
        <>
            <div className="container px-lg-4">
                <div className="row text-center">
                    <div className="col h1 signInText">
>>>>>>> b397825 (Commit)
                        Sign in to your account
                    </div>
                </div>
                <div className="row text-center py-1">
<<<<<<< HEAD
                    <div className="col">
=======
                    <div className="col toRegister">
>>>>>>> b397825 (Commit)
                        Don't have an account? <Link to='/auth/register' className='text-decoration-none'>Register</Link>
                    </div>
                </div>
                <div className='row pt-4 px-lg-5 pb-1 px-1'>
                    <div className='col fw-bold fs-5'>
                        Email
                    </div>
                </div>
                <div className='row px-lg-5 px-1'>
                    <div className='col text-center'>
                        <input 
<<<<<<< HEAD
                            type='email' 
                            className='w-100 py-1 px-2' 
                            placeholder='Enter your email'
                            onChange={(e) => setUser(prev => ({ ...prev, Email: e.target.value }))}
                        />
=======
                            id="emailInput"
                            type='email' 
                            className='w-100 py-1 px-2 myinput' 
                            placeholder='Enter your email'
                            onChange={(e) => setUser(prev => ({ ...prev, Email: e.target.value }))}
                            onKeyDown={handleKeyDown}
                        />
                        {user.Email && !/\S+@\S+\.\S+/.test(user.Email) && (
                            <small className="text-danger">Please enter a valid email address</small>
                        )}
>>>>>>> b397825 (Commit)
                    </div>
                </div>
                <div className='row pt-4 px-lg-5 pb-1 px-1'>
                    <div className='col fw-bold fs-5'>
                        Password
                    </div>
                </div>
                <div className='row px-lg-5 px-1'>
                    <div className='col text-center'>
                        <input 
                            type='password' 
<<<<<<< HEAD
                            className='w-100 py-1 px-2' 
                            placeholder='Enter your password'
                            onChange={(e) => setUser(prev => ({ ...prev, Password: e.target.value }))}
                        />
=======
                            className='w-100 py-1 px-2 myinput' 
                            placeholder='Enter your password'
                            onChange={(e) => setUser(prev => ({ ...prev, Password: e.target.value }))}
                            onKeyDown={handleKeyDown}
                        />
                        {user.Password.length > 0 && user.Password.length < 6 && (
                            <small className="text-danger">Password must be at least 6 characters long</small>
                        )}
>>>>>>> b397825 (Commit)
                    </div>
                </div>
                <div className='row px-5 py-5'>
                    <div className='col'>
                        <button 
<<<<<<< HEAD
                            className='btn btn-lg w-100' 
                            style={{backgroundColor: "#150647" , color: "white"}}
                            onClick={handleFormSubmit}
                        >Sign In</button>
                    </div>
                </div>
                <div className='row px-5 py-5'>
                    <div className='col'>
                        <button 
                            className='btn btn-lg w-100' 
                            style={{backgroundColor: "#150647" , color: "white"}}
                            onClick={forgotPassword}
                        >Forgot Password</button>
=======
                            className='btn-lg w-100 mybtn fw-medium fs-5'  
                            style={{ color: "white" }}
                            onClick={handleFormSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                    <span className="ms-2">Signing In...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                        <button 
                            className='btn-lg w-100 mt-2 mybtn fw-medium fs-5' 
                            style={{ color: "white" }}
                            onClick={handleForgotPassword}
                            disabled={loading}
                        >
                            Forgot Password?
                        </button>
>>>>>>> b397825 (Commit)
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;