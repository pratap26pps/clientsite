import { Router } from "express";
import crypto from "crypto";
import Quote from "../models/Quote.js";
import { createSession, revokeSession } from "../lib/adminSessions.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

function safeCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

router.post("/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(503).json({ error: "Admin access is not configured" });
  }

  if (!password || !safeCompare(String(password), adminPassword)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = createSession();
  res.json({ token });
});

router.post("/logout", requireAdmin, (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  revokeSession(token);
  res.json({ success: true });
});

router.get("/quotes", requireAdmin, async (req, res) => {
  try {
    const { source, status } = req.query;
    const filter = {};

    if (source && ["website", "package"].includes(source)) {
      filter.source = source;
    }

    if (status && ["new", "contacted", "quoted", "closed"].includes(status)) {
      filter.status = status;
    }

    const quotes = await Quote.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(quotes);
  } catch (error) {
    console.error("Admin fetch quotes error:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

router.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const [total, website, packageCount, newCount, contacted, quoted, closed] =
      await Promise.all([
        Quote.countDocuments(),
        Quote.countDocuments({ source: "website" }),
        Quote.countDocuments({ source: "package" }),
        Quote.countDocuments({ status: "new" }),
        Quote.countDocuments({ status: "contacted" }),
        Quote.countDocuments({ status: "quoted" }),
        Quote.countDocuments({ status: "closed" }),
      ]);

    res.json({
      total,
      website,
      package: packageCount,
      byStatus: { new: newCount, contacted, quoted, closed },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.patch("/quotes/:id", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["new", "contacted", "quoted", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.json(quote);
  } catch (error) {
    console.error("Admin update quote error:", error);
    res.status(500).json({ error: "Failed to update quote" });
  }
});

router.delete("/quotes/:id", requireAdmin, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Admin delete quote error:", error);
    res.status(500).json({ error: "Failed to delete quote" });
  }
});

export default router;
