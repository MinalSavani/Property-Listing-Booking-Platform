import Property from "../models/Property.js";
import Booking from "../models/Booking.js";

// ✅ Host Analytics
export const getHostAnalytics = async (req, res) => {
  try {
    const hostId = req.user.id; // from JWT (logged-in host)

    // Step 1: Total Properties
    const totalProperties = await Property.countDocuments({ hostId });

    // Step 2: Get all Property IDs owned by host
    const hostProperties = await Property.find({ hostId }).select("_id");
    const propertyIds = hostProperties.map((p) => p._id);

    // Step 3: Total Bookings
    const totalBookings = await Booking.countDocuments({
      propertyId: { $in: propertyIds },
    });

    // Step 4: Total Earnings
    const totalEarningsData = await Booking.aggregate([
      { $match: { propertyId: { $in: propertyIds } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalEarnings = totalEarningsData[0]?.total || 0;

    res.status(200).json({
      success: true,
      analytics: {
        totalProperties,
        totalBookings,
        totalEarnings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
