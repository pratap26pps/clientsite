import crypto from "crypto";

const sessions = new Map();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

export function createSession() {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { createdAt: Date.now() });
  return token;
}

export function validateSession(token) {
  if (!token) return false;

  const session = sessions.get(token);
  if (!session) return false;

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return false;
  }

  return true;
}

export function revokeSession(token) {
  sessions.delete(token);
}
