import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Review from "../models/Review.js";

const router = Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.get("/", async (req, res) => {
  try {
    const { topRated, limit } = req.query;
    const filter = { status: "approved" };

    if (topRated === "true") {
      filter.rating = { $gte: 4 };
    }

    let query = Review.find(filter).sort({ rating: -1, createdAt: -1 });

    if (limit) {
      query = query.limit(Number(limit));
    }

    const reviews = await query.lean();
    res.json({ reviews });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, location, rating, text, savings, system } = req.body;

    if (!name || !location || !rating || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedRating = Number(rating);
    if (parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const review = new Review({
      name,
      location,
      rating: parsedRating,
      text,
      savings: savings || null,
      system: system || null,
      photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      photoFileName: req.file ? req.file.originalname : null,
      status: "approved",
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Review submission error:", error);
    res.status(500).json({ error: "Failed to submit review" });
  }
});

export default router;
