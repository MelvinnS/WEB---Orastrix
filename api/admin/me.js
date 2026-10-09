import { isAdminAuthenticated } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const authenticated = isAdminAuthenticated(req);
  return res.status(200).json({ ok: true, isAdmin: authenticated });
}
