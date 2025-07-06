import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// dotenv.config();

// Hardcoded MongoDB URI with database name
const MONGODB_URI = 'mongodb+srv://bhuwank301:NLEA3zwE9cnPvKzz@cluster0.lmv9h0b.mongodb.net/productpulse?retryWrites=true&w=majority&appName=Cluster0';
console.log('MONGODB_URI:', MONGODB_URI);

const ADMIN_EMAIL = 'jatinin567@gmail.com'; 
const ADMIN_PASSWORD = 'MONEY777'; 

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
});
const User = mongoose.model('User', userSchema);

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({ email: ADMIN_EMAIL, password: hashed, isAdmin: true });
  console.log('Admin user created!');
  process.exit(0);
}

createAdmin().catch(e => { console.error(e); process.exit(1); }); 