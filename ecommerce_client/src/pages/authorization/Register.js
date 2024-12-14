import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addUser, checkUserByEmail, checkUserByUsername } from './API';
import Swal from 'sweetalert2';

function Register() {
    const [user, setUser] = useState({
        Username: '',
        Email: '', 
        Password: '',
        Phone: '',
        Role: 'user'
    });

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPassword = (password) => password.length >= 8;

    const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setUser((prev) => ({ ...prev, Email: email }));
        setEmailValid(isValidEmail(email));
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setUser((prev) => ({ ...prev, Password: password }));
        setPasswordValid(isValidPassword(password));
    };

    const handlePhoneChange = (e) => {
        const phone = e.target.value;
        setUser((prev) => ({ ...prev, Phone: phone }));
        setPhoneValid(isValidPhone(phone));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (
            user.Username === '' ||
            user.Email === '' ||
            user.Password === '' ||
            user.Phone === ''
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all the fields for registration!",
            });
            return;
        }

        if (!isValidEmail(user.Email)) {
            setEmailValid(false); 
            return;
        }

        if (!isValidPassword(user.Password)) {
            setPasswordValid(false);
            return;
        }

        if (!isValidPhone(user.Phone)) {
            setPhoneValid(false);
            return;
        }

        const userEmail = await checkUserByEmail(user.Email);
        if (userEmail) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email already exists!",
            });
            return;
        }

        const userName = await checkUserByUsername(user.Username);
        if (userName) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Username already exists!",
            });
            return;
        }

        await addUser(user, navigate);
    };

    return (
        <>
            <div className="container px-4">
                <div className="row text-center">
                    <div className="col h1">
                        Create New Account
                    </div>
                </div>
                <div className="row text-center py-1">
                    <div className="col">
                        Already have an account? <Link to='/auth/login' className='text-decoration-none'>Login</Link>
                    </div>
                </div>

                {/* Username Field */}
                <div className='row pt-4 px-5 pb-1'>
                    <div className='col fw-bold fs-5'>Username</div>
                </div>
                <div className='row px-5'>
                    <div className='col text-center'>
                        <input
                            type='text'
                            className='w-100 py-1 px-2'
                            placeholder='Enter your username'
                            onChange={(e) => setUser(prev => ({ ...prev, Username: e.target.value }))}
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className='row pt-4 px-5 pb-1'>
                    <div className='col fw-bold fs-5'>Email</div>
                </div>
                <div className='row px-5'>
                    <div className='col text-center'>
                        <input
                            type='email'
                            className='w-100 py-1 px-2'
                            placeholder='Enter your email'
                            onChange={handleEmailChange}
                        />
                        {!emailValid && (
                            <div className='text-start text-danger'>
                                Please enter a valid email address!
                            </div>
                        )}
                    </div>
                </div>

                {/* Password Field */}
                <div className='row pt-4 px-5 pb-1'>
                    <div className='col fw-bold fs-5'>Password</div>
                </div>
                <div className='row px-5'>
                    <div className='col text-center'>
                        <input
                            type='password'
                            className='w-100 py-1 px-2'
                            placeholder='Enter your password'
                            onChange={handlePasswordChange}
                        />
                        {!passwordValid && (
                            <div className='text-start text-danger'>
                                The length of password must be at least 8!
                            </div>
                        )}
                    </div>
                </div>

                {/* Phone Field */}
                <div className='row pt-4 px-5 pb-1'>
                    <div className='col fw-bold fs-5'>Phone</div>
                </div>
                <div className='row px-5'>
                    <div className='col text-center'>
                        <input
                            type='text'
                            className='w-100 py-1 px-2'
                            placeholder='Enter your phone number'
                            onChange={handlePhoneChange}
                        />
                        {!phoneValid && (
                            <div className='text-start text-danger'>
                                Phone number must be exactly 10 digits!
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className='row px-5 py-5'>
                    <div className='col'>
                        <button
                            className='btn btn-lg w-100'
                            style={{ backgroundColor: "#150647", color: "white" }}
                            onClick={handleFormSubmit}
                        >Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;