export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const cookieHeader = `orastrix_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  res.setHeader("Set-Cookie", cookieHeader);
  return res.status(200).json({ ok: true, message: "Logout berhasil" });
}
