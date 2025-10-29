import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Customer/Home";
import PropertyDetails from "./pages/Customer/PropertyDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminDashboard from "./pages/Admin/AdminDashboard";

// Host Pages
import AddProperty from "./pages/Host/AddProperty";
import HostDashboard from "./pages/Host/Dashboard";
import EditProperty from "./pages/Host/EditProperty";
import HostAnalytics from "./pages/Host/HostAnalytics";

// Private Route
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Common Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/customer/booking-confirmation/:id" element={<BookingConfirmation />} />

        {/* Host Routes (Protected) */}
        <Route
          path="/host/dashboard"
          element={
            <PrivateRoute role="host">
              <HostDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/add-property"
          element={
            <PrivateRoute role="host">
              <AddProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/edit-property/:id"
          element={
            <PrivateRoute role="host">
              <EditProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/analytics"
          element={
            <PrivateRoute role="host">
              <HostAnalytics />
            </PrivateRoute>
          }
        />

        {/* Admin Route (Optional: Protect with role="admin") */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
