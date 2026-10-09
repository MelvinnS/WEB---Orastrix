import crypto from "crypto";

export function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      const key = parts.shift()?.trim();
      if (key) {
        list[key] = decodeURIComponent(parts.join("="));
      }
    });
  }
  return list;
}

export function sign(text, secret) {
  return crypto.createHmac("sha256", secret).update(text).digest("hex");
}

export function createAdminToken(secret) {
  const payload = `admin_${Date.now()}`;
  const sig = sign(payload, secret);
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token, secret) {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  try {
    const expectedSig = sign(payload, secret);
    if (sig.length !== expectedSig.length) return false;
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(req) {
  const cookies = parseCookies(req);
  const token = cookies.orastrix_admin_session;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  return verifyAdminToken(token, secret);
}
