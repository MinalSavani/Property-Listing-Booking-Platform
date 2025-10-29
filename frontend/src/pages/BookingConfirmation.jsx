import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function BookingConfirmation() {
  const { id } = useParams(); // booking ID from URL
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("Booking ID is missing in URL!");
      navigate("/"); // fallback if no ID
      return;
    }

    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if booking and property exist
        if (!res.data || !res.data.propertyId) {
          setBooking(null);
        } else {
          setBooking(res.data);
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        setBooking(null);
        navigate("/"); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!booking) return <p className="text-center mt-10 text-red-600">Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Booking Confirmed! 🎉
      </h2>

      <div className="space-y-3 text-gray-700">
        <p><strong>Property:</strong> {booking.propertyId.title}</p>
        <p><strong>Location:</strong> {booking.propertyId.location}</p>
        <p><strong>Check-In:</strong> {new Date(booking.checkIn).toDateString()}</p>
        <p><strong>Check-Out:</strong> {new Date(booking.checkOut).toDateString()}</p>
        <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
        <p><strong>Status:</strong> {booking.bookingStatus}</p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
