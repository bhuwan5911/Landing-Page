import mongoose from "mongoose";

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

export const Message = mongoose.model("Message", messageSchema);
