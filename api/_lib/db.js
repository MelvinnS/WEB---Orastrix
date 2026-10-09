import { neon } from "@neondatabase/serverless";

export function getDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not configured.");
  }
  return neon(dbUrl);
}

const SEED_REVIEWS = [
  {
    id: "seed-1",
    name: "Arjun Malhotra",
    rating: 5,
    comment:
      "Praktis banget dibawa ke kantor. Larut cepat di lidah, napas langsung segar tanpa rasa menyengat. Varian Lemon Mint jadi favorit saya sepanjang hari.",
    created_at: "2026-09-02T09:00:00Z",
    approved: true,
    featured: true,
    device_id: "seed-device-1",
    ip_hash: "seed-ip-1",
  },
  {
    id: "seed-2",
    name: "Sara Qureshi",
    rating: 5,
    comment:
      "Awalnya coba karena penasaran sama kemasan kalengnya yang cantik, ternyata rasanya juga enak. Berry-nya manis-asam lembut, nggak bikin eneg. Sudah repurchase dua kali!",
    created_at: "2026-09-10T13:30:00Z",
    approved: true,
    featured: true,
    device_id: "seed-device-2",
    ip_hash: "seed-ip-2",
  },
  {
    id: "seed-3",
    name: "Nikhil Verma",
    rating: 4,
    comment:
      "Fresh Mint-nya tajam dan tahan lama, cocok setelah makan siang. Semoga ke depannya ada ukuran isi yang lebih banyak.",
    created_at: "2026-09-18T18:15:00Z",
    approved: true,
    featured: true,
    device_id: "seed-device-3",
    ip_hash: "seed-ip-3",
  },
  {
    id: "seed-4",
    name: "Dewi Lestari",
    rating: 5,
    comment: "Kalengnya ramping, muat di saku kecil. Rasanya segar dan nggak lengket.",
    created_at: "2026-09-25T08:05:00Z",
    approved: true,
    featured: false,
    device_id: "seed-device-4",
    ip_hash: "seed-ip-4",
  },
  {
    id: "seed-5",
    name: "Rizky Pratama",
    rating: 4,
    comment: "Enak dan praktis, cuma harus rajin beli lagi karena cepat habis hehe.",
    created_at: "2026-10-01T20:40:00Z",
    approved: true,
    featured: false,
    device_id: "seed-device-5",
    ip_hash: "seed-ip-5",
  },
];

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
      approved BOOLEAN DEFAULT FALSE,
      featured BOOLEAN DEFAULT FALSE,
      device_id TEXT,
      ip_hash TEXT
    )
  `;

  try {
    const countResult = await sql`SELECT COUNT(*)::int as count FROM reviews`;
    if (countResult[0]?.count === 0) {
      for (const seed of SEED_REVIEWS) {
        await sql`
          INSERT INTO reviews (id, name, rating, comment, created_at, approved, featured, device_id, ip_hash)
          VALUES (${seed.id}, ${seed.name}, ${seed.rating}, ${seed.comment}, ${seed.created_at}, ${seed.approved}, ${seed.featured}, ${seed.device_id}, ${seed.ip_hash})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
  } catch (err) {
    console.error("Database seed check failed:", err);
  }

  isInitialized = true;
}
