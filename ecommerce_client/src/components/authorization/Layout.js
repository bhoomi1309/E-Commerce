import { Outlet } from 'react-router-dom';
import './style.css';

function AuthorizationLayout() {
    return (
        <>
<<<<<<< HEAD
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-6 d-flex flex-column justify-content-center align-items-center styleLeft'>
                        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                            Welcome to Your Favorite Store!
                        </h1>
                        <p style={{ fontSize: "1.2rem", fontWeight: "lighter", maxWidth: "80%", color: "orange" }}>
                            Where shopping meets convenience and joy.
                        </p>
                    </div>
                    <div className='col-6 d-flex justify-content-center align-items-center styleRight'>
=======
            <div className='auth-layout'>
                <div className='row'>
                    {/* Left Section */}
                    <div className='col-md-6 col-12 d-flex flex-column justify-content-center align-items-center styleLeft'>
                        <h1 className="welcome-heading">
                            Welcome to Your Favorite Store!
                        </h1>
                        <p className="welcome-subtext">
                            Where shopping meets convenience and joy.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className='col-md-6 col-12 d-flex justify-content-center align-items-center styleRight'>
>>>>>>> b397825 (Commit)
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthorizationLayout;