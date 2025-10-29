import { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// --- Axios Instance with Interceptor ---
const API = axios.create({
    baseURL:  import.meta.env.VITE_API_URL,
});

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

// --- Icons for Stat Cards ---
const PropertiesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const BookingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const EarningsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

export default function HostAnalytics() {
    const [analytics, setAnalytics] = useState({
        totalProperties: 0,
        totalBookings: 0,
        totalEarnings: 0,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await API.get("/analytics/host");
                setAnalytics(res.data);
            } catch (err) {
                console.error("Error fetching host analytics:", err);
                toast.error("Could not load analytics.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const chartData = [
        { name: "Properties", value: analytics.totalProperties, fill: "#60a5fa" },
        { name: "Bookings", value: analytics.totalBookings, fill: "#2dd4bf" },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Toaster position="top-right" toastOptions={{
                style: { background: '#334155', color: '#e2e8f0' }
            }} />

            <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-teal-400 tracking-wider">Host Analytics</h1>
                    <button onClick={() => navigate(-1)} className="text-sm font-medium text-slate-300 hover:text-teal-400">
                        &larr; Back to Dashboard
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
                        <PropertiesIcon />
                        <div>
                            <h2 className="text-sm font-semibold text-slate-400">Total Properties</h2>
                            <p className="text-4xl font-extrabold text-white mt-1">
                                {analytics.totalProperties}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
                        <BookingsIcon />
                        <div>
                            <h2 className="text-sm font-semibold text-slate-400">Total Bookings</h2>
                            <p className="text-4xl font-extrabold text-white mt-1">
                                {analytics.totalBookings}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6 flex items-center gap-6">
                        <EarningsIcon />
                        <div>
                            <h2 className="text-sm font-semibold text-slate-400">Total Earnings</h2>
                            <p className="text-4xl font-extrabold text-white mt-1">
                                ₹{analytics.totalEarnings.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Performance Overview
                    </h2>
                    <div style={{ width: "100%", height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} tickLine={{ stroke: '#94a3b8' }} />
                                <YAxis tick={{ fill: '#94a3b8' }} tickLine={{ stroke: '#94a3b8' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '0.5rem',
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

