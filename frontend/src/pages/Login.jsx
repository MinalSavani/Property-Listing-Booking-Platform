
import React, { useState } from "react";
import axios from "axios"; // Import axios directly
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// Create an Axios instance with a base URL
const API = axios.create({
    baseURL: "https://property-listing-booking-platform.onrender.com/api",
});


// Add a request interceptor to include the token in headers
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// --- SVG Icons to replace react-icons ---
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Login successful! Redirecting...");

            const role = res.data.user.role;

            setTimeout(() => {
                if (role === "host") navigate("/host/dashboard");
                else if (role === "admin") navigate("/admin/dashboard");
                else navigate("/home");
            }, 1200);

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900 font-sans">
            <Toaster position="top-right" toastOptions={{
                style: { background: '#334155', color: '#e2e8f0' }
            }} />
            <div className="w-full max-w-md mx-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800 shadow-2xl rounded-xl p-8 space-y-6 border border-slate-700"
                >
                    {/* --- Header --- */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-slate-400 mt-2">Sign in to access your dashboard.</p>
                    </div>

                    {/* --- Form Fields --- */}
                    <div className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <MailIcon />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-300"
                                >
                                    Password
                                </label>
                                <a href="#" className="text-sm text-teal-400 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <LockIcon />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Submit Button --- */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-500 text-slate-900 p-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 disabled:bg-teal-800 disabled:text-slate-400 shadow-lg shadow-teal-500/20"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>

                    {/* --- Footer --- */}
                    <p className="text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/" className="font-semibold text-teal-400 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}



