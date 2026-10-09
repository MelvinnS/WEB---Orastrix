import { neon } from "@neondatabase/serverless";

export function getDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not configured.");
  }
  return neon(dbUrl);
}

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      approved BOOLEAN DEFAULT TRUE,
      featured BOOLEAN DEFAULT FALSE,
      device_id TEXT,
      ip_hash TEXT
    )
  `;

  // Bersihkan data dummy lama (id berawalan 'seed-') dari database
  try {
    await sql`DELETE FROM reviews WHERE id LIKE 'seed-%'`;
  } catch (err) {
    console.error("Gagal menghapus data dummy lama:", err);
  }

  isInitialized = true;
}
