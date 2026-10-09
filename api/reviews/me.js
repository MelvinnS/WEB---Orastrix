export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  // Multi-review is allowed, so user has no single locked review
  return res.status(200).json({
    ok: true,
    review: null,
  });
}
