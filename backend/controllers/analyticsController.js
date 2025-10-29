import User from "../models/User.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";

// --- Admin Analytics ---
export const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const totalRevenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    res.status(200).json({
      totalUsers,
      totalProperties,
      totalBookings,
      totalRevenue,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching admin analytics", error: err.message });
  }
};

// --- Host Analytics ---
export const getHostAnalytics = async (req, res) => {
  try {
    const hostId = req.user._id; // ✅ from protect middleware

    // Step 1: Total properties listed by this host
    const totalProperties = await Property.countDocuments({ owner: hostId });

    // Step 2: Get all property IDs owned by this host
    const hostProperties = await Property.find({ owner: hostId }).select("_id");
    const propertyIds = hostProperties.map((p) => p._id);

    // Step 3: Total bookings for host’s properties
    const totalBookings = await Booking.countDocuments({
      propertyId: { $in: propertyIds },
    });

    // Step 4: Total earnings for host’s properties
    const totalEarningsAgg = await Booking.aggregate([
      { $match: { propertyId: { $in: propertyIds } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalEarnings = totalEarningsAgg[0]?.total || 0;

    // Step 5: Respond just like admin analytics
    res.status(200).json({
      totalProperties,
      totalBookings,
      totalEarnings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching host analytics", error: err.message });
  }
};
