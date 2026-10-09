import crypto from "crypto";
import { parseCookies } from "./auth.js";

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips = typeof forwarded === "string" ? forwarded.split(",") : forwarded;
    if (ips.length > 0 && ips[0]) {
      return ips[0].trim();
    }
  }
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "127.0.0.1";
}

export function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT || "orastrix_default_ip_salt_2026";
  return crypto.createHash("sha256").update(ip + salt).digest("hex");
}

export function getOrCreateDeviceId(req) {
  const cookies = parseCookies(req);
  let deviceId = cookies.orastrix_device_id;
  let isNew = false;
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    isNew = true;
  }
  return { deviceId, isNew };
}

export function buildDeviceCookieHeader(deviceId) {
  return `orastrix_device_id=${encodeURIComponent(
    deviceId
  )}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`;
}
