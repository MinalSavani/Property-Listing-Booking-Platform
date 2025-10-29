// // import { useEffect, useState } from "react";
// // import API from "../../api/axios";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";

// // export default function AdminDashboard() {
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     const fetchAnalytics = async () => {
// //       try {
// //         const res = await API.get("/analytics/admin");
// //         setData(res.data);
// //       } catch (err) {
// //         console.error("Error fetching analytics:", err);
// //       }
// //     };
// //     fetchAnalytics();
// //   }, []);

// //   if (!data)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-gray-500">
// //         Loading analytics...
// //       </div>
// //     );

// //   const chartData = [
// //     { name: "Users", value: data.totalUsers },
// //     { name: "Properties", value: data.totalProperties },
// //     { name: "Bookings", value: data.totalBookings },
// //     { name: "Revenue", value: data.totalRevenue },
// //   ];

// //   return (
// //     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
// //       <h1 className="text-3xl font-semibold text-gray-800 mb-6">
// //         Admin Dashboard
// //       </h1>

// //       {/* --- Stats Cards --- */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //         <div className="p-6 bg-blue-100 rounded-2xl text-center shadow">
// //           <h2 className="text-3xl font-bold text-blue-700">{data.totalUsers}</h2>
// //           <p className="text-gray-600 mt-1">Total Users</p>
// //         </div>

// //         <div className="p-6 bg-green-100 rounded-2xl text-center shadow">
// //           <h2 className="text-3xl font-bold text-green-700">
// //             {data.totalProperties}
// //           </h2>
// //           <p className="text-gray-600 mt-1">Total Properties</p>
// //         </div>

// //         <div className="p-6 bg-yellow-100 rounded-2xl text-center shadow">
// //           <h2 className="text-3xl font-bold text-yellow-700">
// //             {data.totalBookings}
// //           </h2>
// //           <p className="text-gray-600 mt-1">Total Bookings</p>
// //         </div>

// //         <div className="p-6 bg-pink-100 rounded-2xl text-center shadow">
// //           <h2 className="text-3xl font-bold text-pink-700">
// //             ₹{data.totalRevenue}
// //           </h2>
// //           <p className="text-gray-600 mt-1">Total Revenue</p>
// //         </div>
// //       </div>

// //       {/* --- Chart --- */}
// //       <div className="bg-white rounded-2xl shadow p-6">
// //         <h2 className="text-lg font-medium text-gray-700 mb-4">
// //           Performance Overview
// //         </h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={chartData}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip />
// //             <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

// // --- Axios Instance with Interceptor ---
// const API = axios.create({
//     baseURL:  import.meta.env.VITE_API_URL,
// });

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

// // --- Icons for Stat Cards ---
// const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
// const PropertiesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
// const BookingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
// const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

// export default function AdminDashboard() {
//     const [analytics, setAnalytics] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAnalytics = async () => {
//             try {
//                 const res = await API.get("/analytics/admin");
//                 setAnalytics(res.data);
//             } catch (err) {
//                 console.error("Error fetching analytics:", err);
//                 toast.error("Could not load admin analytics.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAnalytics();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         toast.success("Logged out successfully!");
//         navigate("/login");
//     };

//     const chartData = analytics ? [
//         { name: "Users", value: analytics.totalUsers, fill: "#818cf8" },
//         { name: "Properties", value: analytics.totalProperties, fill: "#60a5fa" },
//         { name: "Bookings", value: analytics.totalBookings, fill: "#2dd4bf" },
//         { name: "Revenue", value: analytics.totalRevenue, fill: "#c084fc" },
//     ] : [];

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen bg-slate-900">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-400"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-slate-900 min-h-screen text-slate-300">
//             <Toaster position="top-right" toastOptions={{
//                 style: { background: '#334155', color: '#e2e8f0' }
//             }} />
            
//             <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//                     <h1 className="text-3xl font-bold text-teal-400 tracking-wider">Admin Panel</h1>
//                     <button
//                         onClick={handleLogout}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//                     <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//                         <UsersIcon />
//                         <div>
//                             <h2 className="text-sm font-semibold text-slate-400">Total Users</h2>
//                             <p className="text-4xl font-extrabold text-white mt-1">{analytics.totalUsers}</p>
//                         </div>
//                     </div>
//                     <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//                         <PropertiesIcon />
//                         <div>
//                             <h2 className="text-sm font-semibold text-slate-400">Total Properties</h2>
//                             <p className="text-4xl font-extrabold text-white mt-1">{analytics.totalProperties}</p>
//                         </div>
//                     </div>
//                     <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//                         <BookingsIcon />
//                         <div>
//                             <h2 className="text-sm font-semibold text-slate-400">Total Bookings</h2>
//                             <p className="text-4xl font-extrabold text-white mt-1">{analytics.totalBookings}</p>
//                         </div>
//                     </div>
//                     <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//                         <RevenueIcon />
//                         <div>
//                             <h2 className="text-sm font-semibold text-slate-400">Total Revenue</h2>
//                             <p className="text-4xl font-extrabold text-white mt-1">₹{analytics.totalRevenue.toLocaleString()}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6">
//                     <h2 className="text-xl font-bold text-white mb-4">
//                         Performance Overview
//                     </h2>
//                     <div style={{ width: "100%", height: 400 }}>
//                         <ResponsiveContainer>
//                             <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//                                 <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
//                                 <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} tickLine={{ stroke: '#94a3b8' }} />
//                                 <YAxis tick={{ fill: '#94a3b8' }} tickLine={{ stroke: '#94a3b8' }} />
//                                 <Tooltip
//                                     cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
//                                     contentStyle={{
//                                         backgroundColor: '#1e293b',
//                                         border: '1px solid #334155',
//                                         borderRadius: '0.5rem',
//                                     }}
//                                 />
//                                 <Bar dataKey="value" name="Total" radius={[6, 6, 0, 0]} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

// // --- Axios Instance with Interceptors ---
// const API = axios.create({
//   baseURL:  import.meta.env.VITE_API_URL,
// });

// // ✅ Add token automatically in every request
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Auto-logout if token expires or invalid
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       toast.error("Session expired. Please log in again.");
//       window.location.href = "/login"; // redirect instantly
//     }
//     return Promise.reject(error);
//   }
// );

// // --- Icons for Stat Cards ---
// const UsersIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-indigo-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//     />
//   </svg>
// );

// const PropertiesIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-blue-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//     />
//   </svg>
// );

// const BookingsIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-teal-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//     />
//   </svg>
// );

// const RevenueIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-purple-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
//     />
//   </svg>
// );

// export default function AdminDashboard() {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await API.get("/analytics/admin");
//         setAnalytics(res.data);
//       } catch (err) {
//         console.error("Error fetching analytics:", err);
//         toast.error("Could not load admin analytics.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalytics();
//   }, []);

//   // ✅ Fixed logout (now clears both token + user)
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully!");
//     navigate("/login");
//   };

//   const chartData = analytics
//     ? [
//         { name: "Users", value: analytics.totalUsers, fill: "#818cf8" },
//         { name: "Properties", value: analytics.totalProperties, fill: "#60a5fa" },
//         { name: "Bookings", value: analytics.totalBookings, fill: "#2dd4bf" },
//         { name: "Revenue", value: analytics.totalRevenue, fill: "#c084fc" },
//       ]
//     : [];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-slate-900">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-400"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-900 min-h-screen text-slate-300">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: { background: "#334155", color: "#e2e8f0" },
//         }}
//       />

//       {/* Navbar */}
//       <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-teal-400 tracking-wider">
//             Admin Panel
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//             <UsersIcon />
//             <div>
//               <h2 className="text-sm font-semibold text-slate-400">
//                 Total Users
//               </h2>
//               <p className="text-4xl font-extrabold text-white mt-1">
//                 {analytics.totalUsers}
//               </p>
//             </div>
//           </div>

//           <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//             <PropertiesIcon />
//             <div>
//               <h2 className="text-sm font-semibold text-slate-400">
//                 Total Properties
//               </h2>
//               <p className="text-4xl font-extrabold text-white mt-1">
//                 {analytics.totalProperties}
//               </p>
//             </div>
//           </div>

//           <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//             <BookingsIcon />
//             <div>
//               <h2 className="text-sm font-semibold text-slate-400">
//                 Total Bookings
//               </h2>
//               <p className="text-4xl font-extrabold text-white mt-1">
//                 {analytics.totalBookings}
//               </p>
//             </div>
//           </div>

//           <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
//             <RevenueIcon />
//             <div>
//               <h2 className="text-sm font-semibold text-slate-400">
//                 Total Revenue
//               </h2>
//               <p className="text-4xl font-extrabold text-white mt-1">
//                 ₹{analytics.totalRevenue.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6">
//           <h2 className="text-xl font-bold text-white mb-4">
//             Performance Overview
//           </h2>
//           <div style={{ width: "100%", height: 400 }}>
//             <ResponsiveContainer>
//               <BarChart
//                 data={chartData}
//                 margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="name"
//                   tick={{ fill: "#94a3b8" }}
//                   tickLine={{ stroke: "#94a3b8" }}
//                 />
//                 <YAxis
//                   tick={{ fill: "#94a3b8" }}
//                   tickLine={{ stroke: "#94a3b8" }}
//                 />
//                 <Tooltip
//                   cursor={{ fill: "rgba(14, 165, 233, 0.1)" }}
//                   contentStyle={{
//                     backgroundColor: "#1e293b",
//                     border: "1px solid #334155",
//                     borderRadius: "0.5rem",
//                   }}
//                 />
//                 <Bar dataKey="value" name="Total" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"; // ✅ Use the global auth context

// --- Axios Instance with Interceptors ---
const API = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
});

// ✅ Attach token automatically to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle token expiry (auto-logout)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// --- Icons (unchanged) ---
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PropertiesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BookingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const RevenueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ use global logout from context

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics/admin");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        toast.error("Could not load admin analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // ✅ Logout using global function
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const chartData = analytics
    ? [
        { name: "Users", value: analytics.totalUsers, fill: "#818cf8" },
        { name: "Properties", value: analytics.totalProperties, fill: "#60a5fa" },
        { name: "Bookings", value: analytics.totalBookings, fill: "#2dd4bf" },
        { name: "Revenue", value: analytics.totalRevenue, fill: "#c084fc" },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-300">
      <Toaster position="top-right" toastOptions={{ style: { background: "#334155", color: "#e2e8f0" } }} />

      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-teal-400 tracking-wider">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
            <UsersIcon />
            <div>
              <h2 className="text-sm font-semibold text-slate-400">Total Users</h2>
              <p className="text-4xl font-extrabold text-white mt-1">{analytics.totalUsers}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
            <PropertiesIcon />
            <div>
              <h2 className="text-sm font-semibold text-slate-400">Total Properties</h2>
              <p className="text-4xl font-extrabold text-white mt-1">{analytics.totalProperties}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
            <BookingsIcon />
            <div>
              <h2 className="text-sm font-semibold text-slate-400">Total Bookings</h2>
              <p className="text-4xl font-extrabold text-white mt-1">{analytics.totalBookings}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
            <RevenueIcon />
            <div>
              <h2 className="text-sm font-semibold text-slate-400">Total Revenue</h2>
              <p className="text-4xl font-extrabold text-white mt-1">
                ₹{analytics.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Performance Overview</h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} tickLine={{ stroke: "#94a3b8" }} />
                <YAxis tick={{ fill: "#94a3b8" }} tickLine={{ stroke: "#94a3b8" }} />
                <Tooltip
                  cursor={{ fill: "rgba(14, 165, 233, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="value" name="Total" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

