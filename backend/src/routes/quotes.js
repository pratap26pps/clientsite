import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Quote from "../models/Quote.js";

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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.post("/package", async (req, res) => {
  try {
    const { firstName, mobile, email, service, address, message } = req.body;

    if (!firstName || !mobile || !email || !service || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const quote = new Quote({
      fullName: firstName,
      phone: mobile,
      email,
      service,
      address,
      message: message || null,
      electricityBill: service,
      source: "package",
    });

    await quote.save();

    res.status(201).json({
      success: true,
      message: "Package quote request received",
      id: quote._id,
    });
  } catch (error) {
    console.error("Package quote submission error:", error);
    res.status(500).json({ error: "Failed to submit quote request" });
  }
});

router.post("/", upload.single("billFile"), async (req, res) => {
  try {
    const { fullName, phone, postcode, electricityBill } = req.body;

    if (!fullName || !phone || !postcode || !electricityBill) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const quote = new Quote({
      fullName,
      phone,
      postcode,
      electricityBill,
      billFileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      billFileName: req.file ? req.file.originalname : null,
    });

    await quote.save();

    res.status(201).json({
      success: true,
      message: "Quote request received",
      id: quote._id,
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    res.status(500).json({ error: "Failed to submit quote request" });
  }
});

export default router;
