// server/contactRoute.ts
import { Router } from "express";
import Contact from "./models/contactModel";
const router = Router();

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