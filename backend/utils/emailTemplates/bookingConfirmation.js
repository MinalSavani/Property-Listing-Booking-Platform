export const bookingConfirmationTemplate = ({
  userName,
  property,
  checkIn,
  checkOut,
  totalAmount,
}) => `
  <div style="font-family: Arial, sans-serif; color: #333; background: #f9fafb; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="color: #2563eb; text-align: center;">Booking Confirmed ✅</h2>
      <p>Hi ${userName || "Guest"},</p>
      <p>Your booking has been successfully confirmed. Here are your booking details:</p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;" />

      <p><strong>🏠 Property:</strong> ${property.title}</p>
      <p><strong>📍 Location:</strong> ${property.location}</p>
      <p><strong>📅 Check-In:</strong> ${new Date(checkIn).toDateString()}</p>
      <p><strong>📅 Check-Out:</strong> ${new Date(checkOut).toDateString()}</p>
      <p><strong>💰 Total Amount:</strong> ₹${totalAmount}</p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;" />

      <p style="text-align: center;">We’re excited to host you! 🌿</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="#" style="background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">View Booking</a>
      </div>

      <p style="margin-top: 30px; font-size: 13px; color: #6b7280; text-align: center;">
        © ${new Date().getFullYear()} Estately — All rights reserved.
      </p>
    </div>
  </div>
`;
