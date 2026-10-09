import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeafIcon from "../components/icons/LeafIcon";
import StarRating from "../components/Testimonials/StarRating";
import {
  checkAdminSession,
  adminLogin,
  adminLogout,
  fetchAdminReviews,
  updateReviewStatus,
  deleteReview,
} from "../lib/reviewStore";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'approved' | 'featured'
  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Periksa status login sesi admin saat mount
  useEffect(() => {
    async function verifyAuth() {
      setCheckingAuth(true);
      const authenticated = await checkAdminSession();
      setIsAdmin(authenticated);
      setCheckingAuth(false);
      if (authenticated) {
        loadAdminReviews();
      }
    }
    verifyAuth();
  }, []);

  const loadAdminReviews = async () => {
    setLoadingReviews(true);
    setActionError("");
    const list = await fetchAdminReviews();
    setReviews(list);
    setLoadingReviews(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setLoginError("Masukkan password admin.");
      return;
    }
    setLoggingIn(true);
    setLoginError("");
    const res = await adminLogin(password);
    setLoggingIn(false);
    if (!res.ok) {
      setLoginError(res.error || "Password admin salah.");
      return;
    }
    setIsAdmin(true);
    setPassword("");
    loadAdminReviews();
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAdmin(false);
    setReviews([]);
  };

  const handleAction = async (id, action) => {
    setProcessingId(id);
    setActionError("");
    const res = await updateReviewStatus(id, action);
    setProcessingId(null);
    if (!res.ok) {
      setActionError(res.error);
      return;
    }
    loadAdminReviews();
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus review dari "${name}"?`)) {
      return;
    }
    setProcessingId(id);
    setActionError("");
    const res = await deleteReview(id);
    setProcessingId(null);
    if (!res.ok) {
      setActionError(res.error);
      return;
    }
    loadAdminReviews();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0F1412] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#1F4336] border-t-white rounded-full animate-spin" />
          <p className="text-sm font-medium text-white/70">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // ==================== TAMPILAN LOGIN ADMIN ====================
  if (!isAdmin) {
    return (
      <div className="min-h-screen w-full bg-[#0F1412] text-white flex flex-col justify-between relative overflow-hidden select-none">
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#1F4336]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#6E8FB3]/10 blur-3xl" />

        <header className="p-6 sm:p-10 flex items-center justify-between z-10">
          <Link to="/" className="flex items-center gap-2.5 group text-white">
            <LeafIcon className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300 text-[#2E6653]" />
            <span className="tracking-[0.25em] text-base font-bold">ORASTRIX ADMIN</span>
          </Link>
          <Link
            to="/"
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 z-10">
          <div className="w-full max-w-md rounded-3xl bg-[#161C19] border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center text-center gap-2 mb-8">
              <span className="p-3 rounded-2xl bg-[#1F4336]/30 text-[#4ADE80] border border-[#1F4336]/50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight">Login Dashboard Admin</h1>
              <p className="text-xs text-white/60">
                Masukkan password admin untuk mengelola review Orastrix.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Password Admin
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin..."
                  autoFocus
                  disabled={loggingIn}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/20 transition"
                />
              </div>

              {loginError && (
                <p className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 font-medium">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full rounded-xl bg-[#1F4336] hover:bg-[#285747] text-white font-bold py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {loggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <span>Masuk ke Admin</span>
                )}
              </button>
            </form>
          </div>
        </main>

        <footer className="p-6 text-center text-xs text-white/40">
          Orastrix Administrative Panel © {new Date().getFullYear()}
        </footer>
      </div>
    );
  }

  // ==================== TAMPILAN DASHBOARD ADMIN ====================
  const featuredCount = reviews.filter((r) => r.featured && r.approved).length;
  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;

  const filteredReviews = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    if (filter === "featured") return r.featured;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0F1412] text-white flex flex-col">
      {/* Header Admin */}
      <header className="border-b border-white/10 bg-[#161C19]/80 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group text-white">
            <LeafIcon className="w-5 h-5 text-[#4ADE80]" />
            <span className="font-extrabold tracking-wider text-base">ORASTRIX</span>
          </Link>
          <span className="text-white/30">|</span>
          <span className="text-xs font-bold bg-[#1F4336] text-[#4ADE80] px-2.5 py-1 rounded-full uppercase tracking-wider">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/review"
            className="text-xs text-white/70 hover:text-white transition hidden sm:inline-block"
          >
            Lihat Halaman Review ↗
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3.5 py-1.5 text-xs font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-8">
        {/* Ringkasan Statistik */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-[#161C19] border border-white/10 p-5 flex flex-col gap-1">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Total Review</span>
            <span className="text-3xl font-black">{reviews.length}</span>
          </div>
          <div className="rounded-2xl bg-[#161C19] border border-yellow-500/20 p-5 flex flex-col gap-1">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Pending Approval</span>
            <span className="text-3xl font-black text-yellow-400">{pendingCount}</span>
          </div>
          <div className="rounded-2xl bg-[#161C19] border border-green-500/20 p-5 flex flex-col gap-1">
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Disetujui</span>
            <span className="text-3xl font-black text-green-400">{approvedCount}</span>
          </div>
          <div className="rounded-2xl bg-[#161C19] border border-blue-500/20 p-5 flex flex-col gap-1">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Featured (Beranda)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-blue-400">{featuredCount}</span>
              <span className="text-xs text-white/40">/ 3 maks</span>
            </div>
          </div>
        </div>

        {/* Action error message */}
        {actionError && (
          <div className="rounded-xl bg-red-500/15 border border-red-500/30 p-4 text-xs font-medium text-red-300 flex items-center justify-between">
            <span>⚠️ {actionError}</span>
            <button onClick={() => setActionError("")} className="text-white/60 hover:text-white">✕</button>
          </div>
        )}

        {/* Tab & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {[
              { id: "all", label: `Semua (${reviews.length})` },
              { id: "pending", label: `Pending (${pendingCount})` },
              { id: "approved", label: `Approved (${approvedCount})` },
              { id: "featured", label: `Featured (${featuredCount}/3)` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filter === tab.id
                    ? "bg-[#1F4336] text-[#4ADE80] border border-[#2E6653]"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={loadAdminReviews}
            disabled={loadingReviews}
            className="text-xs font-semibold text-white/60 hover:text-white flex items-center gap-1.5 transition"
          >
            <span>🔄 Refresh Data</span>
          </button>
        </div>

        {/* Review Table / Cards List */}
        {loadingReviews ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-[#1F4336] border-t-[#4ADE80] rounded-full animate-spin" />
            <p className="text-xs text-white/50">Memuat review database...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-16 rounded-2xl bg-[#161C19] border border-white/5 text-center text-white/40 text-sm">
            Tidak ada review dalam kategori ini.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredReviews.map((r) => {
              const isProcessing = processingId === r.id;
              return (
                <div
                  key={r.id}
                  className={`rounded-2xl bg-[#161C19] border p-5 sm:p-6 transition flex flex-col sm:flex-row items-start justify-between gap-5 ${
                    !r.approved
                      ? "border-yellow-500/30 bg-yellow-500/5"
                      : r.featured
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex-1 flex flex-col gap-2.5">
                    {/* Status Badges + Date */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {!r.approved ? (
                        <span className="bg-yellow-500/20 text-yellow-300 font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/30">
                          ⏳ Pending Approval
                        </span>
                      ) : (
                        <span className="bg-green-500/20 text-green-400 font-bold px-2.5 py-0.5 rounded-full border border-green-500/30">
                          ✓ Disetujui
                        </span>
                      )}

                      {r.featured && (
                        <span className="bg-blue-500/20 text-blue-300 font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30">
                          ★ Featured di Beranda
                        </span>
                      )}

                      <span className="text-white/40 ml-auto sm:ml-0">
                        {new Date(r.createdAt).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    {/* Name + Star Rating */}
                    <div className="flex items-center gap-3">
                      <h3 className="font-extrabold text-base text-white">{r.name}</h3>
                      <StarRating value={r.rating} size="w-4 h-4" />
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-white/80 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                      "{r.comment}"
                    </p>
                  </div>

                  {/* Actions Column */}
                  <div className="w-full sm:w-auto flex sm:flex-col items-center justify-end gap-2 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                    {!r.approved ? (
                      <button
                        disabled={isProcessing}
                        onClick={() => handleAction(r.id, "approve")}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition disabled:opacity-50"
                      >
                        Setujui (Approve)
                      </button>
                    ) : (
                      <button
                        disabled={isProcessing}
                        onClick={() => handleAction(r.id, "unapprove")}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300 border border-yellow-500/30 text-xs font-bold transition disabled:opacity-50"
                      >
                        Batalkan Approve
                      </button>
                    )}

                    {r.approved && (
                      r.featured ? (
                        <button
                          disabled={isProcessing}
                          onClick={() => handleAction(r.id, "unfeature")}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 text-xs font-bold transition disabled:opacity-50"
                        >
                          Hapus Featured
                        </button>
                      ) : (
                        <button
                          disabled={isProcessing || featuredCount >= 3}
                          onClick={() => handleAction(r.id, "feature")}
                          title={featuredCount >= 3 ? "Maksimal 3 review featured" : ""}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition disabled:opacity-40"
                        >
                          ★ Jadikan Featured
                        </button>
                      )
                    )}

                    <button
                      disabled={isProcessing}
                      onClick={() => handleDelete(r.id, r.name)}
                      className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 text-xs font-bold transition disabled:opacity-50"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
