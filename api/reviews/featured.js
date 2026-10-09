import { getDb, initDb } from "../_lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    await initDb();
    const sql = getDb();

    // Fetch featured approved reviews (max 3)
    const featured = await sql`
      SELECT id, name, rating, comment, created_at as "createdAt", approved, featured
      FROM reviews
      WHERE approved = true AND featured = true
      ORDER BY created_at DESC
      LIMIT 3
    `;

    let result = [...featured];

    if (result.length < 3) {
      const featuredIds = result.map((r) => r.id);
      const remainingCount = 3 - result.length;

      let fallback = [];
      if (featuredIds.length > 0) {
        fallback = await sql`
          SELECT id, name, rating, comment, created_at as "createdAt", approved, featured
          FROM reviews
          WHERE approved = true AND id != ALL(${featuredIds})
          ORDER BY rating DESC, created_at DESC
          LIMIT ${remainingCount}
        `;
      } else {
        fallback = await sql`
          SELECT id, name, rating, comment, created_at as "createdAt", approved, featured
          FROM reviews
          WHERE approved = true
          ORDER BY rating DESC, created_at DESC
          LIMIT 3
        `;
      }
      result = [...result, ...fallback];
    }

    return res.status(200).json({ ok: true, reviews: result });
  } catch (err) {
    console.error("API /api/reviews/featured error:", err);
    return res.status(500).json({ ok: false, error: "Terjadi kesalahan server internal." });
  }
}
