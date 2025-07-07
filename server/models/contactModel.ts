// contactModel.ts
// Defines the Contact schema and model for MongoDB using Mongoose. Includes validation for contact form fields.
import mongoose, { Document, Schema } from "mongoose";

// Contact document interface
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Contact schema definition with validation
const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
    maxlength: [200, "Subject cannot exceed 200 characters"]
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxlength: [1000, "Message cannot exceed 1000 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Contact model
const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;