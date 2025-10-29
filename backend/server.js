// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import connectDB from "./config/db.js";
// // import analyticsRoutes from "./routes/analyticsRoutes.js";
// // import authRoutes from "./routes/authRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import propertyRoutes from "./routes/propertyRoutes.js";
// // import bookingRoutes from "./routes/bookingRoutes.js";
// // dotenv.config();
// // connectDB();

// // const app = express();

// // // ✅ Important: JSON body parser middleware
// // app.use(cors());
// // app.use(express.json()); // 👈 Add this line before routes

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/user", userRoutes);
// // app.use("/api/properties", propertyRoutes);
// // app.use("/api/bookings", bookingRoutes);
// // app.use("/api/analytics", analyticsRoutes);
// // app.get("/", (req, res) => res.send("API is running..."));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // ✅ Route imports
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import propertyRoutes from "./routes/propertyRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";

// dotenv.config();

// // ✅ Connect to MongoDB
// connectDB();

// const app = express();

// // ✅ Middlewares
// app.use(cors({
//   origin: "http://localhost:5173", // your React frontend URL
//   credentials: true,               // allow cookies if needed later
// }));
// app.use(express.json()); // parse JSON bodies

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/properties", propertyRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/analytics", analyticsRoutes);

// // ✅ Root endpoint
// app.get("/", (req, res) => {
//   res.send("🏡 Property Listing API is running...");
// });

// // ✅ Global error handler (optional but clean)
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";

// ✅ Routes
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true,
}));
app.use(express.json());

// ✅ Serve uploads folder publicly
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/analytics", analyticsRoutes);

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("🏡 Property Listing API is running...");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
