import React, { useState } from 'react';
import { handleSignUp } from "../services/authService";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <img src="logo192.png" alt="logo" />
                        <div className="card custom-card">
                            <div className="card-header">
                                Create your GHN account to start your career!
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => { return handleSignUp(e, name, email, password, city); }}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email*</label>
                                        <input type="text" className="form-control" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name*</label>
                                        <input type="text" className="form-control" name="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" name="city" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password*</label>
                                        <input type="password" className="form-control" name="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Create Account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SignUp
