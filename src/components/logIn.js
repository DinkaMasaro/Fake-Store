import React, { useState } from "react";
import AlertMessage from "./alertMessage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(false);
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const correctEmail = process.env.REACT_APP_CORRECT_EMAIL || "user@gmail.com";
    const correctPassword = process.env.REACT_APP_CORRECT_PASSWORD || "123456"; 

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (email === correctEmail && password === correctPassword) {
            handleLogin(email, password);
            navigate("/products");
        } else {
            setAlert({ text: "Incorrect email or password", type: "error" });
        }

        setLoading(false);
    };

    const handleCloseAlert = () => {
        setAlert("");
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleLoginSubmit} className="bg-light p-4 rounded shadow">
                <h1 className="text-center mb-4">Log in RUA</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        className="form-control"
                        required
                    />
                </div>
                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                    Log in
                </button>
                {alert && <AlertMessage
                    message={alert.text}
                    type={alert.type}
                    onClose={handleCloseAlert}
                />}
            </form>
        </div>
    );
}
