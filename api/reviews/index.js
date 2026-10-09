import { getDb, initDb } from "../_lib/db.js";
import {
  getClientIp,
  hashIp,
  getOrCreateDeviceId,
  buildDeviceCookieHeader,
} from "../_lib/ip.js";

export default async function handler(req, res) {
  try {
    await initDb();
    const sql = getDb();

    if (req.method === "GET") {
      const reviews = await sql`
        SELECT id, name, rating, comment, created_at as "createdAt", approved, featured
        FROM reviews
        WHERE approved = true
        ORDER BY created_at DESC
      `;
      return res.status(200).json({ ok: true, reviews });
    }

    if (req.method === "POST") {
      const { name, rating, comment, website } = req.body || {};

      // Honeypot check: bot detection
      if (website && String(website).trim() !== "") {
        return res.status(200).json({
          ok: true,
          message: "Terima kasih atas review Anda.",
        });
      }

      const cleanName = String(name || "").trim().replace(/\s+/g, " ");
      const cleanComment = String(comment || "").trim();
      const numRating = Number(rating);

      if (cleanName.length < 2) {
        return res.status(400).json({ ok: false, error: "Nama minimal 2 karakter." });
      }
      if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        return res.status(400).json({ ok: false, error: "Pilih jumlah bintang antara 1 dan 5." });
      }
      if (cleanComment.length < 10) {
        return res.status(400).json({ ok: false, error: "Komentar minimal 10 karakter." });
      }

      const { deviceId, isNew } = getOrCreateDeviceId(req);
      const ip = getClientIp(req);
      const ipHash = hashIp(ip);

      // Check 1: Device ID restriction
      const deviceCheck = await sql`
        SELECT COUNT(*)::int as count FROM reviews WHERE device_id = ${deviceId}
      `;
      if (deviceCheck[0]?.count > 0) {
        return res.status(400).json({
          ok: false,
          error: "Kamu sudah pernah memberikan review dari perangkat ini.",
        });
      }

      // Check 2: IP Hash restriction (1 review per ip_hash per 24 hours)
      const ipCheck = await sql`
        SELECT COUNT(*)::int as count FROM reviews
        WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '24 hours'
      `;
      if (ipCheck[0]?.count > 0) {
        return res.status(400).json({
          ok: false,
          error: "Kamu sudah memberikan review dalam 24 jam terakhir dari jaringan ini.",
        });
      }

      const id = `r-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const inserted = await sql`
        INSERT INTO reviews (id, name, rating, comment, created_at, approved, featured, device_id, ip_hash)
        VALUES (${id}, ${cleanName}, ${numRating}, ${cleanComment}, NOW(), false, false, ${deviceId}, ${ipHash})
        RETURNING id, name, rating, comment, created_at as "createdAt", approved, featured
      `;

      if (isNew) {
        res.setHeader("Set-Cookie", buildDeviceCookieHeader(deviceId));
      }

      return res.status(200).json({ ok: true, review: inserted[0] });
    }

    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  } catch (err) {
    console.error("API /api/reviews error:", err);
    return res.status(500).json({ ok: false, error: "Terjadi kesalahan server internal." });
  }
}
