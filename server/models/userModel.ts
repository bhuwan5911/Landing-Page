// userModel.ts
// Defines the User schema and model for MongoDB using Mongoose. Includes logic to create a default admin user.
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// User document interface
export interface IUser extends Document {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

// User schema definition
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

// User model
const User = mongoose.model<IUser>("User", userSchema);

// Create default admin user if not exists
async function createDefaultAdmin() {
  const email = "jatinin567@gmail.com";
  const plainPassword = "MONEY777";
  const existing = await User.findOne({ email });
  if (!existing) {
    const hashed = await bcrypt.hash(plainPassword, 10);
    await User.create({ email, password: hashed });
    console.log("Default admin user created:", email);
  }
}

// Run admin creation on startup
createDefaultAdmin().catch(console.error);

export default User; 