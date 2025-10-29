
// import React, { useState } from "react";
// import axios from "axios"; // Import axios directly
// import { Link, useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

// // Create an Axios instance with a base URL
// const API = axios.create({
//     baseURL: "https://property-listing-booking-platform.onrender.com/api",
// });

// // Add a request interceptor to include the token in headers
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // --- SVG Icons for inputs ---
// const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
// const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
// const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
// const RoleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>;

// export default function Signup() {
//     const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const res = await API.post("/auth/register", form);
//             toast.success(res.data.message || "Registration successful! Redirecting...");

//             setTimeout(() => {
//                 navigate("/login");
//             }, 1200);

//         } catch (err) {
//             toast.error(err.response?.data?.message || "Something went wrong.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-slate-900 font-sans p-4">
//             <Toaster position="top-right" toastOptions={{
//                 style: { background: '#334155', color: '#e2e8f0' }
//             }} />
//             <div className="w-full max-w-md">
//                 <form onSubmit={handleSubmit} className="bg-slate-800 shadow-2xl p-8 rounded-xl border border-slate-700">
//                     <div className="mb-8 text-center">
//                         <h2 className="text-4xl font-bold text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
//                             Create Account
//                         </h2>
//                         <p className="text-slate-400 mt-2 text-sm">Join Estately to find your perfect property.</p>
//                     </div>

//                     <div className="space-y-5">
//                         {/* Name */}
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
//                             <div className="relative">
//                                 <UserIcon />
//                                 <input
//                                     id="name"
//                                     name="name"
//                                     placeholder="John Doe"
//                                     value={form.name}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
//                                 />
//                             </div>
//                         </div>

//                         {/* Email */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
//                             <div className="relative">
//                                 <MailIcon />
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     placeholder="you@example.com"
//                                     value={form.email}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
//                                 />
//                             </div>
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
//                             <div className="relative">
//                                 <LockIcon />
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     placeholder="••••••••"
//                                     value={form.password}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
//                                 />
//                             </div>
//                         </div>

//                         {/* Role */}
//                         <div>
//                             <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">Account Type</label>
//                             <div className="relative">
//                                 <RoleIcon />
//                                 <select
//                                     id="role"
//                                     name="role"
//                                     value={form.role}
//                                     onChange={handleChange}
//                                     className="w-full appearance-none pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
//                                 >
//                                     <option value="customer">Customer</option>
//                                     <option value="host">Host</option>
//                                     <option value="admin">Admin</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full mt-6 bg-teal-500 text-slate-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 disabled:bg-teal-800 disabled:text-slate-400 shadow-lg shadow-teal-500/20"
//                     >
//                         {loading ? "Creating Account..." : "Sign Up"}
//                     </button>

//                     <div className="text-center mt-4 text-sm text-slate-400">
//                         Already have an account?{" "}
//                         <Link to="/login" className="font-semibold text-teal-400 hover:underline">
//                             Login
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
// Create an Axios instance with base URL
const API = axios.create({
  baseURL: "https://property-listing-booking-platform.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A8 8 0 1118.879 17.8M12 14a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

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

const RoleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 font-sans">
      <Toaster position="top-right" toastOptions={{
        style: { background: "#334155", color: "#e2e8f0" },
      }} />
      <div className="w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 shadow-2xl rounded-xl p-8 space-y-6 border border-slate-700"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
              Create Account
            </h1>
            <p className="text-sm text-slate-400 mt-2">Sign up to get started!</p>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon />
                <input
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 bg-slate-700 text-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MailIcon />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 bg-slate-700 text-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <LockIcon />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 bg-slate-700 text-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <LockIcon />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 bg-slate-700 text-white border rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 transition ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:border-teal-500 focus:ring-teal-500"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
                Account Type
              </label>
              <div className="relative">
                <RoleIcon />
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full appearance-none pl-10 pr-3 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                >
                  <option value="customer">Customer</option>
                  <option value="host">Host</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-slate-900 p-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 disabled:bg-teal-800 disabled:text-slate-400 shadow-lg shadow-teal-500/20"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// }

