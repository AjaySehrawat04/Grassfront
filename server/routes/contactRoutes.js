import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Create contact form submission
router.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all contacts
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;