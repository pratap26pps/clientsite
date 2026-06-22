import { validateSession } from "../lib/adminSessions.js";

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!validateSession(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
