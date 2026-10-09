import { getDb, initDb } from "../_lib/db.js";
import { getClientIp, hashIp, getOrCreateDeviceId } from "../_lib/ip.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    await initDb();
    const sql = getDb();

    const { deviceId } = getOrCreateDeviceId(req);
    const ip = getClientIp(req);
    const ipHash = hashIp(ip);

    const result = await sql`
      SELECT id, name, rating, comment, created_at as "createdAt", approved, featured
      FROM reviews
      WHERE device_id = ${deviceId} OR ip_hash = ${ipHash}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    return res.status(200).json({
      ok: true,
      review: result.length > 0 ? result[0] : null,
    });
  } catch (err) {
    console.error("API /api/reviews/me error:", err);
    return res.status(500).json({ ok: false, error: "Terjadi kesalahan server internal." });
  }
}
