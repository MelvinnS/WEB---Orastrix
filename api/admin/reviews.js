import { getDb, initDb } from "../_lib/db.js";
import { isAdminAuthenticated } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ ok: false, error: "Akses ditolak. Silakan login sebagai admin." });
  }

  try {
    await initDb();
    const sql = getDb();

    // GET /api/admin/reviews -> List ALL reviews
    if (req.method === "GET") {
      const reviews = await sql`
        SELECT id, name, rating, comment, created_at as "createdAt", approved, featured, device_id, ip_hash
        FROM reviews
        ORDER BY created_at DESC
      `;
      return res.status(200).json({ ok: true, reviews });
    }

    // PATCH /api/admin/reviews -> Update review status (approve, unapprove, feature, unfeature)
    if (req.method === "PATCH") {
      const { id, action } = req.body || {};

      if (!id || !action) {
        return res.status(400).json({ ok: false, error: "Parameter id dan action diperlukan." });
      }

      if (action === "approve") {
        const updated = await sql`
          UPDATE reviews SET approved = true WHERE id = ${id}
          RETURNING id, name, rating, comment, created_at as "createdAt", approved, featured
        `;
        return res.status(200).json({ ok: true, review: updated[0] });
      }

      if (action === "unapprove") {
        const updated = await sql`
          UPDATE reviews SET approved = false, featured = false WHERE id = ${id}
          RETURNING id, name, rating, comment, created_at as "createdAt", approved, featured
        `;
        return res.status(200).json({ ok: true, review: updated[0] });
      }

      if (action === "feature") {
        // Enforce max 3 featured limit
        const countRes = await sql`
          SELECT COUNT(*)::int as count FROM reviews WHERE featured = true AND approved = true AND id != ${id}
        `;
        if (countRes[0]?.count >= 3) {
          return res.status(400).json({
            ok: false,
            error: "Maksimal 3 review pilihan yang dapat dijadikan featured di beranda.",
          });
        }
        const updated = await sql`
          UPDATE reviews SET featured = true, approved = true WHERE id = ${id}
          RETURNING id, name, rating, comment, created_at as "createdAt", approved, featured
        `;
        return res.status(200).json({ ok: true, review: updated[0] });
      }

      if (action === "unfeature") {
        const updated = await sql`
          UPDATE reviews SET featured = false WHERE id = ${id}
          RETURNING id, name, rating, comment, created_at as "createdAt", approved, featured
        `;
        return res.status(200).json({ ok: true, review: updated[0] });
      }

      return res.status(400).json({ ok: false, error: "Action tidak dikenal." });
    }

    // DELETE /api/admin/reviews -> Delete a review
    if (req.method === "DELETE") {
      const { id } = req.body || req.query || {};
      if (!id) {
        return res.status(400).json({ ok: false, error: "Parameter id diperlukan." });
      }
      await sql`DELETE FROM reviews WHERE id = ${id}`;
      return res.status(200).json({ ok: true, message: "Review berhasil dihapus." });
    }

    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  } catch (err) {
    console.error("API /api/admin/reviews error:", err);
    return res.status(500).json({ ok: false, error: "Terjadi kesalahan server internal." });
  }
}
