// routes.ts
// Main backend API routes for contact form, user authentication, password reset, and email notifications.
// Includes validation, database operations, and error handling.
import express from "express";
import { z, ZodError } from "zod";
import Contact from "./models/contactModel";
import User from "./models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// Contact form validation schema
const messageValidationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

const router = express.Router();

// Move these helper functions to the top level to avoid ES5 strict mode errors
function getLocalMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function formatLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// DEBUG: Log all requests to /api/contact for troubleshooting
router.all(["/api/contact", "/api/contact/"], (req, res, next) => {
  console.log("DEBUG: Received", req.method, "at", req.originalUrl, "body:", req.body);
  next();
});

// Explicitly handle OPTIONS for CORS preflight
router.options(["/api/contact", "/api/contact/"], (req, res) => {
  res.sendStatus(204);
});

// POST /api/contact and /api/contact/ - Save contact and send notification email
router.post(["/api/contact", "/api/contact/"], async (req, res) => {
  try {
    const messageData = messageValidationSchema.parse(req.body);
    const contact = new Contact({
      name: messageData.name,
      email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      createdAt: new Date(),
    });
    await contact.save();
    // Send notification email using nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${contact.name}`,
      html: `
          <div style="font-family: Arial, sans-serif; padding: 16px;">
            <h2>📬 New Contact Form Submission</h2>
            <p><b>Name:</b> ${contact.name}</p>
            <p><b>Email:</b> ${contact.email}</p>
            <p><b>Subject:</b> ${contact.subject}</p>
            <p><b>Message:</b><br/>${contact.message}</p>
            <hr style="margin:24px 0;" />
            <p style="color:#888;font-size:0.95em;">This is an automated notification from your website.</p>
          </div>
        `
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Contact notification email sent!");
    } catch (err) {
      console.error("Failed to send contact notification email:", err);
    }
    res.status(201).json({ success: true, message: "Message received and saved" });
  } catch (error) {
    console.error('Error saving contact:', error);
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Invalid form data", errors: error.errors });
      return;
    }
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    res.status(500).json({ message: "Server error", error: errorMessage, stack: errorStack });
  }
});

// Fallback for all other methods on /api/contact and /api/contact/
router.all(["/api/contact", "/api/contact/"], (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    res.status(405).json({ message: `Method ${req.method} not allowed on /api/contact` });
  }
});

router.get("/api/contact", (req, res) => {
  res.json({ message: "GET /api/contact is working, but use POST to submit data." });
});

router.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
});

router.get("/api/contacts/stats", async (req, res) => {
  try {
    const now = new Date();
    // Start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Start of week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    // Start of year
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [todayCount, weekCount, yearCount] = await Promise.all([
      Contact.countDocuments({ createdAt: { $gte: startOfDay } }),
      Contact.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Contact.countDocuments({ createdAt: { $gte: startOfYear } }),
    ]);
    res.json({ today: todayCount, week: weekCount, year: yearCount });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Failed to fetch stats", error: errorMessage });
  }
});

router.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Generate reset token
      const token = crypto.randomBytes(32).toString("hex");
      user.resetToken = token;
      user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
      await user.save();
      // Send the email with nodemailer
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const frontendUrl = 'https://creatorxjatin.vercel.app'; // Always use deployed frontend URL
      const resetLink = `${frontendUrl}/reset-password?token=${token}&email=${email}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 16px;">
              <h2>🔑 Password Reset Request</h2>
              <p>Hi there! 👋</p>
              <p>We received a request to reset your password for ProductPulse.</p>
              <p>
                <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#22c55e;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Click here to reset your password</a>
              </p>
              <p>This link is valid for 10 minutes. ⏰</p>
              <hr style="margin:24px 0;" />
              <p style="font-size:1.1em;">💡 <b>Motivation:</b> "The best way to get things done is to simply begin. Remember your password and keep moving forward! 🚀"</p>
              <p style="color:#888;font-size:0.95em;">If you did not request this, you can safely ignore this email.</p>
              <p style="margin-top:24px;">Stay secure,<br/>The ProductPulse Team</p>
            </div>
          `
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent!");
        res.json({ message: "If this email exists, a reset link has been sent." });
      } catch (err) {
        console.error("Nodemailer error:", err);
        res.status(500).json({ message: "Failed to send email" });
      }
    } else {
      // Always return success for security
      res.json({ message: "If this email exists, a reset link has been sent." });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    // For demo, just return success
    res.json({ success: true, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/api/test-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email from ProductPulse",
      text: "This is a test email to verify your Nodemailer setup."
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Test mail sent!");
      res.json({ message: "Test email sent (if credentials are correct)." });
    } catch (err) {
      console.error("Nodemailer test email error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ message: "Failed to send test email.", error: errorMessage });
    }
  } catch (error) {
    console.error("Test email error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Failed to send test email.", error: errorMessage });
  }
});

router.delete("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

router.post("/api/reset-password", async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }
  try {
    const user = await User.findOne({ email, resetToken: token, resetTokenExpiry: { $gt: new Date() } });
    if (!user) {
      res.status(400).json({ message: "Invalid or expired reset link." });
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/contacts/trends", async (req, res) => {
  try {
    const now = new Date();
    const range = req.query.range || 'week';
    let days = 7;
    let start;
    let groupFormat = "%Y-%m-%d";
    // In the route handler, remove the inner function declarations and use the top-level ones
    if (range === 'day') {
      days = 1;
      start = getLocalMidnight(now);
    } else if (range === 'month') {
      days = 31;
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (range === 'year') {
      days = 12;
      start = new Date(now.getFullYear(), 0, 1);
      groupFormat = "%Y-%m";
    } else { // week (default)
      days = 7;
      start = getLocalMidnight(new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1)));
    }

    let pipeline;
    if (range === 'year') {
      pipeline = [
        { $match: { createdAt: { $gte: start } } },
        { $group: {
            _id: { $dateToString: { format: groupFormat, date: "$createdAt", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 as 1 } }
      ];
    } else {
      pipeline = [
        { $match: { createdAt: { $gte: start } } },
        { $group: {
            _id: { $dateToString: { format: groupFormat, date: "$createdAt", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 as 1 } }
      ];
    }
    const results = await Contact.aggregate(pipeline);
    const trend = [];
    if (range === 'year') {
      // Fill missing months
      for (let i = 0; i < 12; i++) {
        const month = (i + 1).toString().padStart(2, '0');
        const dateStr = `${now.getFullYear()}-${month}`;
        const found = results.find((r) => r._id === dateStr);
        trend.push({ date: dateStr, count: found ? found.count : 0 });
      }
    } else {
      for (let i = 0; i < days; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const dateStr = groupFormat === "%Y-%m-%d" ? formatLocalDate(d) : `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}`;
        const found = results.find((r) => r._id === dateStr);
        trend.push({ date: dateStr, count: found ? found.count : 0 });
      }
    }
    res.json(trend);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Failed to fetch trends", error: errorMessage });
  }
});

router.get("/api/contacts/recent", async (req, res) => {
  try {
    const recent = await Contact.find({}, "name createdAt").sort({ createdAt: -1 }).limit(5);
    res.json(recent);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Failed to fetch recent contacts", error: errorMessage });
  }
});

router.get("/api/contacts/stats-range", async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      res.status(400).json({ message: "Missing from or to date" });
      return;
    }
    const fromStr = Array.isArray(from) ? from[0] : from;
    const toStr = Array.isArray(to) ? to[0] : to;
    const fromDate = new Date(fromStr as string);
    const toDate = new Date(toStr as string);
    toDate.setHours(23, 59, 59, 999);
    const count = await Contact.countDocuments({ createdAt: { $gte: fromDate, $lte: toDate } });
    res.json({ count });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Failed to fetch range stats", error: errorMessage });
  }
});

export default router;