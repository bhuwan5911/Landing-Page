// db.ts
// Database connection utility for MongoDB using Mongoose. Handles connection and error logging.
import mongoose from "mongoose";

// Connect to MongoDB using URI from environment or default
export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/jatin";
    console.log("Connecting to MongoDB URI:", uri.replace(/:\/\/.*@/, '://[HIDDEN]@'));
    await mongoose.connect(uri);
    console.log("  MongoDB connected");
  } catch (error) {
    console.error("  MongoDB connection error:", error);
    process.exit(1);
  }
};
