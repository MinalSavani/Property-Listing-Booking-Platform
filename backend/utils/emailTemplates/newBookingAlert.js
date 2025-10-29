export const newBookingAlertTemplate = ({
  property,
  checkIn,
  checkOut,
  totalAmount,
}) => `
  <div style="font-family: Arial, sans-serif; color: #333; background: #f9fafb; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="color: #d97706; text-align: center;">New Booking Received 🛎️</h2>
      <p>A guest just booked your property.</p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;" />

      <p><strong>🏠 Property:</strong> ${property.title}</p>
      <p><strong>📅 Check-In:</strong> ${new Date(checkIn).toDateString()}</p>
      <p><strong>📅 Check-Out:</strong> ${new Date(checkOut).toDateString()}</p>
      <p><strong>💰 Total Amount:</strong> ₹${totalAmount}</p>

      <p style="margin-top: 20px;">Please prepare your property for the guest’s arrival.</p>

      <p style="margin-top: 30px; font-size: 13px; color: #6b7280; text-align: center;">
        © ${new Date().getFullYear()} StayEase — Host Dashboard
      </p>
    </div>
  </div>
`;
