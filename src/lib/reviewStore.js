/**
 * Penyimpanan & Layanan Review Orastrix.
 * Menggunakan Backend Vercel Serverless Functions (/api/reviews) + Neon Postgres.
 */

async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error || `HTTP Error ${res.status}` };
    }
    return data;
  } catch (err) {
    console.error(`API request error on ${url}:`, err);
    return { ok: false, error: "Gagal terhubung ke server. Periksa koneksi internet Anda." };
  }
}

/** Mengambil semua review yang disetujui (Approved) */
export async function getReviews() {
  const res = await apiRequest("/api/reviews");
  if (res.ok && Array.isArray(res.reviews)) {
    return res.reviews;
  }
  return [];
}

/** Mengambil maksimal 3 review unggulan untuk beranda */
export async function getFeaturedReviews(limit = 3) {
  const res = await apiRequest("/api/reviews/featured");
  if (res.ok && Array.isArray(res.reviews)) {
    return res.reviews.slice(0, limit);
  }
  return [];
}

/** Mengambil status review pengguna dari device_id / IP hash */
export async function getMyReview() {
  const res = await apiRequest("/api/reviews/me");
  if (res.ok && res.review) {
    return res.review;
  }
  return null;
}

/** Mengirim review baru */
export async function addReview({ name, rating, comment, website = "" }) {
  return await apiRequest("/api/reviews", {
    method: "POST",
    body: JSON.stringify({ name, rating, comment, website }),
  });
}

/* ==================== ADMIN API HELPERS ==================== */

export async function checkAdminSession() {
  const res = await apiRequest("/api/admin/me");
  return Boolean(res.ok && res.isAdmin);
}

export async function adminLogin(password) {
  return await apiRequest("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export async function adminLogout() {
  return await apiRequest("/api/admin/logout", {
    method: "POST",
  });
}

export async function fetchAdminReviews() {
  const res = await apiRequest("/api/admin/reviews");
  if (res.ok && Array.isArray(res.reviews)) {
    return res.reviews;
  }
  return [];
}

export async function updateReviewStatus(id, action) {
  return await apiRequest("/api/admin/reviews", {
    method: "PATCH",
    body: JSON.stringify({ id, action }),
  });
}

export async function deleteReview(id) {
  return await apiRequest("/api/admin/reviews", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
