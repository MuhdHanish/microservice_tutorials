import { useState } from "react";
import axios from "axios";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_URL = ["development", "test"]?.includes(process.env.NEXT_PUBLIC_NODE_ENV || "") ? "http://localhost:8001/api/auth/signin" : "/api/auth/signin";
        try {
            if (!email || !password) return;
            setError('');
            setLoading(true);
            await axios.post(API_URL, {
                email,
                password
            });
        } catch (error) {
            if(error.status === 400) setError(error?.response?.data?.message);
            else console.error(error?.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form
                onSubmit={handleSubmit}
                className="col-12 col-md-6 border mx-auto my-5 mb-5 p-5 shadow bg-body rounded d-flex flex-column gap-3"
            >
                <h2>Signin</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
                <p className="text-center">Don't have an account? <a href="/authin">Signup</a></p>
            </form>
        </div>
    );
}