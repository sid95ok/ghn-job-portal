import React, { useState } from 'react';
import { handleProfileUpdate } from "../services/authService";
import Layout from "../components/shared/Layout/Layout";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [city, setCity] = useState(user.city);
    const [password, setPassword] = useState("");
    return (
        <>
            <Layout>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="card custom-card">
                                <div className="card-header">
                                    Update your profile information
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(e) => { return handleProfileUpdate(e, name, email, password, city); }}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email*</label>
                                            <input type="text" className="form-control" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name*</label>
                                            <input type="text" className="form-control" name="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="city" className="form-label">City*</label>
                                            <input type="text" className="form-control" name="city" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" name="password" placeholder="Set a new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Update Account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout></>
    )
}

export default Profile
