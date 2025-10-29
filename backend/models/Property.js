import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  type: { type: String, enum: ["apartment", "villa", "room", "house"], required: true },
  amenities: [{ type: String }],
  images: [{ type: String }], // Cloudinary image URLs
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);
