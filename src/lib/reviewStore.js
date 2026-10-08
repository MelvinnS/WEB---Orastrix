/**
 * Penyimpanan review (VERSI TAMPILAN / PROTOTYPE).
 *
 * Saat ini data review disimpan di localStorage browser, jadi review baru
 * hanya terlihat di browser pengguna itu sendiri. Untuk produksi, ganti
 * isi fungsi-fungsi di file ini dengan pemanggilan API/database
 * (tanda "TODO-BACKEND") — komponen UI tidak perlu diubah.
 *
 * Field `featured: true` = review dipilih admin untuk tampil di beranda
 * (maksimal 3 yang tampil).
 */

const STORAGE_KEY = "orastrix_reviews_v1";
const SUBMITTED_KEY = "orastrix_review_submitted_v1";

// Data contoh (nanti datang dari database)
const SEED_REVIEWS = [
  {
    id: "seed-1",
    name: "Arjun Malhotra",
    rating: 5,
    comment:
      "Praktis banget dibawa ke kantor. Larut cepat di lidah, napas langsung segar tanpa rasa menyengat. Varian Lemon Mint jadi favorit saya sepanjang hari.",
    createdAt: "2026-09-02T09:00:00Z",
    featured: true,
  },
  {
    id: "seed-2",
    name: "Sara Qureshi",
    rating: 5,
    comment:
      "Awalnya coba karena penasaran sama kemasan kalengnya yang cantik, ternyata rasanya juga enak. Berry-nya manis-asam lembut, nggak bikin eneg. Sudah repurchase dua kali!",
    createdAt: "2026-09-10T13:30:00Z",
    featured: true,
  },
  {
    id: "seed-3",
    name: "Nikhil Verma",
    rating: 4,
    comment:
      "Fresh Mint-nya tajam dan tahan lama, cocok setelah makan siang. Semoga ke depannya ada ukuran isi yang lebih banyak.",
    createdAt: "2026-09-18T18:15:00Z",
    featured: true,
  },
  {
    id: "seed-4",
    name: "Dewi Lestari",
    rating: 5,
    comment: "Kalengnya ramping, muat di saku kecil. Rasanya segar dan nggak lengket.",
    createdAt: "2026-09-25T08:05:00Z",
    featured: false,
  },
  {
    id: "seed-5",
    name: "Rizky Pratama",
    rating: 4,
    comment: "Enak dan praktis, cuma harus rajin beli lagi karena cepat habis hehe.",
    createdAt: "2026-10-01T20:40:00Z",
    featured: false,
  },
];

const safeParse = (raw, fallback) => {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

const readLocal = () => {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY), []);
};

/** Semua review, terbaru di atas. TODO-BACKEND: GET /api/reviews */
export function getReviews() {
  return [...SEED_REVIEWS, ...readLocal()].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/** Maks. 3 review pilihan admin untuk beranda. TODO-BACKEND: GET /api/reviews?featured=1 */
export function getFeaturedReviews(limit = 3) {
  const all = getReviews();
  const picked = all.filter((r) => r.featured);
  // Cadangan: kalau admin belum memilih 3, isi dengan rating tertinggi
  if (picked.length < limit) {
    const rest = all
      .filter((r) => !r.featured)
      .sort((a, b) => b.rating - a.rating);
    return [...picked, ...rest].slice(0, limit);
  }
  return picked.slice(0, limit);
}

/** Apakah browser ini sudah pernah mengirim review? */
export function getMyReview() {
  if (typeof window === "undefined") return null;
  const id = window.localStorage.getItem(SUBMITTED_KEY);
  if (!id) return null;
  return getReviews().find((r) => r.id === id) || { id, name: "", rating: 0, comment: "" };
}

/**
 * Kirim review. Mengembalikan { ok, error?, review? }.
 * Batasan 1x per orang di sini hanya per-browser & per-nama (prototype).
 * TODO-BACKEND: POST /api/reviews (server yang harus menjamin 1 review per akun).
 */
export function addReview({ name, rating, comment }) {
  const cleanName = name.trim().replace(/\s+/g, " ");
  const cleanComment = comment.trim();

  if (getMyReview()) return { ok: false, error: "Kamu sudah pernah memberikan review." };
  if (cleanName.length < 2) return { ok: false, error: "Nama minimal 2 karakter." };
  if (!(rating >= 1 && rating <= 5)) return { ok: false, error: "Pilih jumlah bintang dulu." };
  if (cleanComment.length < 10) return { ok: false, error: "Komentar minimal 10 karakter." };

  const duplicate = getReviews().some(
    (r) => r.name.toLowerCase() === cleanName.toLowerCase()
  );
  if (duplicate) return { ok: false, error: "Nama ini sudah pernah memberikan review." };

  const review = {
    id: `r-${Date.now()}`,
    name: cleanName,
    rating,
    comment: cleanComment,
    createdAt: new Date().toISOString(),
    featured: false,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...readLocal(), review]));
    window.localStorage.setItem(SUBMITTED_KEY, review.id);
  } catch {
    return { ok: false, error: "Gagal menyimpan review di browser ini." };
  }
  return { ok: true, review };
}
