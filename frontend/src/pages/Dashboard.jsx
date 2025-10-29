import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// A simple, reusable spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start in a loading state
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return; // Exit early if no token
        }

        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;
        setUser(userData);

        // Redirect based on role *before* stopping the loading state
        if (userData.role === "host") {
          navigate("/host/dashboard");
        } else if (userData.role === "admin") {
          navigate("/admin/dashboard");
        }
        // For customers, the loading state will be turned off below
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/login"); // Redirect if token is invalid or API fails
      } finally {
        setLoading(false); // Stop loading after logic is complete
      }
    };

    getProfile();
  }, [navigate]); // Add navigate as a dependency

  // Show a full-page spinner during the initial data fetch and role check
  if (loading) {
    return <LoadingSpinner />;
  }

  // This will only be rendered for 'customer' roles or if a user object exists
  // but doesn't match 'host' or 'admin'
  if (!user) {
    // This case is unlikely if redirects work, but serves as a fallback
    return null;
  }

  const dashboardInfo = {
    host: {
      emoji: "🎯",
      title: "Host Dashboard",
      subtitle: "Manage your listings and bookings.",
    },
    admin: {
      emoji: "🛠️",
      title: "Admin Dashboard",
      subtitle: "Oversee users and platform settings.",
    },
    customer: {
      emoji: "🛍️",
      title: "Welcome to Your Dashboard",
      subtitle: "Browse products and manage your orders.",
    },
  };

  const info = dashboardInfo[user.role] || {
    emoji: "👋",
    title: "Dashboard",
    subtitle: "Welcome to your personal space.",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
      <div
        className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-lg text-center 
                   transform transition-all duration-500 hover:scale-105"
      >
        <div className="text-5xl mb-4">{info.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">
          {info.title}
        </h2>
        <p className="text-lg text-gray-500 mb-6">
          Hello, <span className="font-semibold text-indigo-600">{user.name}</span>!
        </p>
        <p className="text-md text-gray-600">{info.subtitle}</p>
      </div>
    </div>
  );
}