import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    // logout handler
    const handleLogout = () => {
        localStorage.clear();
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar fixed-top bg-dark border-bottom border-body">
                <div className="container-fluid ">
                    <div className="navbar-brand h1 ">
                        <Link to="/" className="nav-link">
                            Get Hired Now
                        </Link>

                    </div>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item mx-3">
                            <p className="nav-link">
                                Welcome{" "}
                                {user?.name}
                                &nbsp;
                            </p>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/postJob" className="nav-link">
                                Post a Job
                            </Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/applications" className="nav-link">
                                Applications
                            </Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item mx-3">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <br /><br /><br /><br />
        </>
    );
};

export default Header;