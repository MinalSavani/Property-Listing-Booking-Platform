
// import Booking from "../models/Booking.js";
// import Property from "../models/Property.js";
// import { sendEmail } from "../utils/sendEmail.js";
// import { bookingConfirmationTemplate } from "../utils/emailTemplates/bookingConfirmation.js";
// import { newBookingAlertTemplate } from "../utils/emailTemplates/newBookingAlert.js";

// // ✅ Create booking + send confirmation email
// // export const createBooking = async (req, res) => {
// //   try {
// //     const { propertyId, checkIn, checkOut, totalAmount } = req.body;

// //     const property = await Property.findById(propertyId);
// //     if (!property) return res.status(404).json({ message: "Property not found" });

// //     // Convert dates
// //     const today = new Date();
// //     const checkInDate = new Date(checkIn);
// //     const checkOutDate = new Date(checkOut);

// //     if (checkInDate < today.setHours(0, 0, 0, 0))
// //       return res.status(400).json({ message: "Check-in cannot be in the past" });
// //     if (checkOutDate <= checkInDate)
// //       return res.status(400).json({ message: "Check-out must be after check-in" });

// //     // Save booking
// //     const booking = new Booking({
// //       userId: req.user.id,
// //       propertyId,
// //       checkIn: checkInDate,
// //       checkOut: checkOutDate,
// //       totalAmount,
// //     });

// //     await booking.save();

// //     // ✅ Send confirmation email to user
// //     await sendEmail({
// //       to: req.user.email,
// //       subject: "Booking Confirmed ✅",
// //       html: bookingConfirmationTemplate({
// //         userName: req.user.name,
// //         property,
// //         checkIn,
// //         checkOut,
// //         totalAmount,
// //       }),
// //     });

// //     // ✅ Optional: send notification email to host
// //     if (property.hostEmail) {
// //       await sendEmail({
// //         to: property.hostEmail,
// //         subject: "New Booking Received 🛎️",
// //         html: newBookingAlertTemplate({
// //           property,
// //           checkIn,
// //           checkOut,
// //           totalAmount,
// //         }),
// //       });
// //     }

// //     res.status(201).json({
// //       message: "Booking successful! Confirmation email sent.",
// //       booking,
// //     });
// //   } catch (error) {
// //     console.error("Booking error:", error);
// //     res.status(500).json({ message: "Server error. Try again later." });
// //   }
// // };
// export const createBooking = async (req, res) => {
//   try {
//     const { propertyId, checkIn, checkOut, totalAmount } = req.body;

//     // 🔹 Find property by ID
//     const property = await Property.findById(propertyId);
//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     // 🔹 Convert and validate dates
//     const today = new Date();
//     const checkInDate = new Date(checkIn);
//     const checkOutDate = new Date(checkOut);

//     if (checkInDate < today.setHours(0, 0, 0, 0)) {
//       return res.status(400).json({ message: "Check-in cannot be in the past" });
//     }
//     if (checkOutDate <= checkInDate) {
//       return res.status(400).json({ message: "Check-out must be after check-in" });
//     }

//     // 🔹 Check for overlapping bookings
//     const overlappingBooking = await Booking.findOne({
//       propertyId,
//       bookingStatus: { $ne: "cancelled" }, // ignore cancelled bookings
//       $or: [
//         {
//           checkIn: { $lt: checkOutDate },
//           checkOut: { $gt: checkInDate },
//         },
//       ],
//     });

//     if (overlappingBooking) {
//       return res.status(400).json({
//         message: "This property is already booked for the selected dates. Please choose different dates.",
//       });
//     }

//     // 🔹 Create and save booking
//     const booking = new Booking({
//       userId: req.user.id,
//       propertyId,
//       checkIn: checkInDate,
//       checkOut: checkOutDate,
//       totalAmount,
//       bookingStatus: "confirmed",
//     });

//     await booking.save();

//     // 🔹 Send confirmation email to user
//     await sendEmail({
//       to: req.user.email,
//       subject: "Booking Confirmed ✅",
//       html: bookingConfirmationTemplate({
//         userName: req.user.name,
//         property,
//         checkIn,
//         checkOut,
//         totalAmount,
//       }),
//     });

//     // 🔹 Optional: Notify property host
//     if (property.hostEmail) {
//       await sendEmail({
//         to: property.hostEmail,
//         subject: "New Booking Received 🛎️",
//         html: newBookingAlertTemplate({
//           property,
//           checkIn,
//           checkOut,
//           totalAmount,
//         }),
//       });
//     }

//     // 🔹 Success response
//     res.status(201).json({
//       message: "Booking successful! Confirmation email sent.",
//       booking,
//     });
//   } catch (error) {
//     console.error("❌ Booking creation error:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

// // ✅ Get all bookings for logged-in user
// export const getUserBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.user.id })
//       .populate("propertyId", "title location pricePerNight");
//     res.json(bookings);
//   } catch (error) {
//     console.error("Get bookings error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const cancelBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     // Allow only the user who booked it to cancel
//     if (booking.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     booking.bookingStatus = "cancelled";
//     await booking.save();

//     res.json({ message: "Booking cancelled successfully", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Get a single booking by ID
// export const getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id)
//       .populate("propertyId", "title location pricePerNight");

//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     if (booking.userId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Access denied" });

//     res.json(booking);
//   } catch (error) {
//     console.error("Get booking by ID error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Update booking status (cancel booking)
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     if (booking.userId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Access denied" });

//     const { status } = req.body;
//     if (!["pending", "confirmed", "cancelled"].includes(status))
//       return res.status(400).json({ message: "Invalid status value" });

//     booking.bookingStatus = status;
//     await booking.save();

//     res.json({ message: `Booking ${status} successfully`, booking });
//   } catch (error) {
//     console.error("Update booking status error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ Get all bookings for a specific property (for host view)
// export const getPropertyBookings = async (req, res) => {
//   try {
//     const propertyId = req.params.propertyId;
//     const bookings = await Booking.find({ propertyId })
//       .populate("userId", "name email")
//       .populate("propertyId", "title location");
//     res.json(bookings);
//   } catch (error) {
//     console.error("Get property bookings error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };
import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import { sendEmail } from "../utils/sendEmail.js";
import { bookingConfirmationTemplate } from "../utils/emailTemplates/bookingConfirmation.js";
import { newBookingAlertTemplate } from "../utils/emailTemplates/newBookingAlert.js";

// ✅ Create booking + send confirmation email
export const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, totalAmount } = req.body;

    // 🔹 Find property by ID
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // 🔹 Convert and validate dates
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < today.setHours(0, 0, 0, 0))
      return res.status(400).json({ message: "Check-in cannot be in the past" });
    if (checkOutDate <= checkInDate)
      return res.status(400).json({ message: "Check-out must be after check-in" });

    // 🔹 Check overlapping bookings
    const overlappingBooking = await Booking.findOne({
      propertyId,
      bookingStatus: { $ne: "cancelled" },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message:
          "This property is already booked for the selected dates. Please choose different dates.",
      });
    }

    // 🔹 Create and save booking
    const booking = new Booking({
      userId: req.user.id,
      propertyId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalAmount,
      bookingStatus: "confirmed",
    });

    await booking.save();

    // 🔹 Send confirmation email to user
    await sendEmail({
      to: req.user.email,
      subject: "Booking Confirmed ✅",
      html: bookingConfirmationTemplate({
        userName: req.user.name,
        property,
        checkIn,
        checkOut,
        totalAmount,
      }),
    });

    // 🔹 Optional: Notify property host
    if (property.hostEmail) {
      await sendEmail({
        to: property.hostEmail,
        subject: "New Booking Received 🛎️",
        html: newBookingAlertTemplate({
          property,
          checkIn,
          checkOut,
          totalAmount,
        }),
      });
    }

    res.status(201).json({
      message: "Booking successful! Confirmation email sent.",
      booking,
    });
  } catch (error) {
    console.error("❌ Booking creation error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Get all bookings for logged-in user (excluding cancelled)
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
      bookingStatus: { $ne: "cancelled" }, // ✅ hide cancelled
    }).populate("propertyId", "title location pricePerNight images"); // ✅ include images

    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Allow only the user who booked it to cancel
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("propertyId", "title location pricePerNight images");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    res.json(booking);
  } catch (error) {
    console.error("Get booking by ID error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update booking status (admin use)
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status))
      return res.status(400).json({ message: "Invalid status value" });

    booking.bookingStatus = status;
    await booking.save();

    res.json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get all bookings for a specific property (for host)
export const getPropertyBookings = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const bookings = await Booking.find({ propertyId })
      .populate("userId", "name email")
      .populate("propertyId", "title location");
    res.json(bookings);
  } catch (error) {
    console.error("Get property bookings error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
