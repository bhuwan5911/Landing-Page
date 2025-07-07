// contactRoute.ts
// Express route for handling contact form submissions. Saves contact data to the database.
import { Router } from "express";
import Contact from "./models/contactModel";
const router = Router();

// POST /api/contact - Save contact form submission
router.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to save contact", error: err });
  }
});

export default router;