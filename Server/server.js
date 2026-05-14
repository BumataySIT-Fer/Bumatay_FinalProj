const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: '*'
}))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully Connected to MongoDB"))
  .catch(console.error);

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    teacherName: String,
    subject: String,
    rating: Number,
    comments: String,
    date: { type: Date, default: Date.now }
});
const Feedback = mongoose.model("Feedback", feedbackSchema, "Feedback");

// GET all feedbacks
app.get("/api/feedbacks", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
});

// GET single feedback
app.get("/api/feedbacks/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ error: "Feedback not found" });
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
});

// POST create feedback
app.post("/api/feedbacks", async (req, res) => {
    try {
        const newFeedback = await Feedback.create(req.body);
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(500).json({ error: "Failed to create feedback" });
    }
});

// PUT update feedback
app.put("/api/feedbacks/:id", async (req, res) => {
    try {
        const updated = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: "Feedback not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update feedback" });
    }
});

// DELETE feedback
app.delete("/api/feedbacks/:id", async (req, res) => {
    try {
        const deleted = await Feedback.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Feedback not found" });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete feedback" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));