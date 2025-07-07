// Message.ts
// Defines the Message schema and model for MongoDB using Mongoose. Used for storing user messages.
import mongoose from "mongoose";

// Message schema definition
const messageSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  subject: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Message model
export const Message = mongoose.model("Message", messageSchema);
