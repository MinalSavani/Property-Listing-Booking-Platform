import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧾 Fetch user bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings", { withCredentials: true });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ❌ Cancel Booking
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await API.put(`/bookings/${id}/cancel`, {}, { withCredentials: true });
      toast.success("Booking cancelled!");
      // instantly update UI
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, bookingStatus: "cancelled" } : b
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-400 mb-10 text-center">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-slate-400">
            You haven’t booked any property yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-teal-400/20 transition"
              >
                {/* 🖼️ Property Image */}
                <img
                  src={
                    b.propertyId?.images?.[0] ||
                    "https://placehold.co/600x400/1e293b/94a3b8?text=No+Image"
                  }
                  alt={b.propertyId?.title || "Property"}
                  className="rounded-lg mb-4 h-48 w-full object-cover"
                />

                <h2 className="text-2xl font-bold text-white mb-2">
                  {b.propertyId?.title || "Property"}
                </h2>
                <p className="text-slate-400 mb-1">
                  📍 {b.propertyId?.location || "Unknown location"}
                </p>
                <p className="text-slate-400 mb-1">
                  💰 ₹{b.propertyId?.pricePerNight || "N/A"} / night
                </p>
                <p className="text-slate-400 mb-1">
                  🗓️ {new Date(b.checkIn).toLocaleDateString()} →{" "}
                  {new Date(b.checkOut).toLocaleDateString()}
                </p>
                <p className="text-slate-400 mb-4">
                  💵 Total: ₹{b.totalAmount}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    b.bookingStatus === "confirmed"
                      ? "bg-green-500/20 text-green-400"
                      : b.bookingStatus === "cancelled"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {b.bookingStatus}
                </span>

                {/* ❌ Cancel Button */}
                {b.bookingStatus !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="block w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
