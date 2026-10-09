import { createAdminToken } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { password } = req.body || {};
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.SESSION_SECRET;

    if (!adminPassword || !sessionSecret) {
      return res.status(500).json({
        ok: false,
        error: "Konfigurasi server ADMIN_PASSWORD atau SESSION_SECRET belum diset.",
      });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ ok: false, error: "Password admin salah." });
    }

    const token = createAdminToken(sessionSecret);
    const cookieHeader = `orastrix_admin_session=${encodeURIComponent(
      token
    )}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;

    res.setHeader("Set-Cookie", cookieHeader);
    return res.status(200).json({ ok: true, message: "Login berhasil" });
  } catch (err) {
    console.error("API /api/admin/login error:", err);
    return res.status(500).json({ ok: false, error: "Terjadi kesalahan server internal." });
  }
}
