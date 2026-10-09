import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeafIcon from "../components/icons/LeafIcon";
import StarRating from "../components/Testimonials/StarRating";
import ReviewCard from "../components/Testimonials/ReviewCard";
import { addReview, getMyReview, getReviews } from "../lib/reviewStore";
import useSmoothScroll from "../hooks/useSmoothScroll";

const LABELS = ["", "Kurang", "Cukup", "Bagus", "Sangat bagus", "Luar biasa"];

export default function Review() {
  // Aktifkan smooth inertial scrolling (Lenis) persis seperti di halaman Home
  useSmoothScroll();

  const [reviews, setReviews] = useState([]);
  const [mine, setMine] = useState(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [justSent, setJustSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const heroTrackRef = useRef(null);

  // Scroll progress untuk efek stacked card
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const dimOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]);

  const refresh = async () => {
    setLoading(true);
    try {
      const [all, userReview] = await Promise.all([getReviews(), getMyReview()]);
      setReviews(all);
      setMine(userReview);
    } catch (err) {
      console.error("Gagal memuat data review:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    refresh();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim().replace(/\s+/g, " ");
    const cleanComment = comment.trim();

    if (cleanName.length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Pilih jumlah bintang terlebih dahulu (1 - 5 bintang).");
      return;
    }
    if (cleanComment.length < 10) {
      setError("Komentar minimal 10 karakter.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addReview({ name: cleanName, rating, comment: cleanComment });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setJustSent(true);
      await refresh();
    } catch (err) {
      setError("Gagal mengirim review. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const average = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const inputCls =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-black/35 shadow-sm transition focus:border-[#1F4336]/50 focus:outline-none focus:ring-4 focus:ring-[#1F4336]/10";

  return (
    <div className="relative w-full bg-[#F8FAF7] text-[#1F2937] min-h-screen">
      <Navbar theme="light" activeHref="" />

      {/* TRACK SCROLL STACK CARD: Header & Form sticky diam */}
      <div ref={heroTrackRef} className="relative w-full min-h-[170vh]">
        <div className="sticky top-0 min-h-screen w-full overflow-hidden z-10 flex flex-col justify-start">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#1F4336]/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#6E8FB3]/5 blur-3xl" />

          <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 pt-24 sm:pt-28 pb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F4336] hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Kembali ke beranda
            </Link>

            {/* Header */}
            <div className="mt-4 sm:mt-6 flex flex-col gap-2.5">
              <span className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4336]/10 text-[#1F4336] text-xs font-bold tracking-[0.25em] uppercase border border-[#1F4336]/15 shadow-sm">
                <LeafIcon className="w-3.5 h-3.5" />
                REVIEW
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
                Bagikan{" "}
                <span className="relative inline-block text-[#1F4336]">
                  pengalamanmu
                  <span className="absolute left-0 right-0 -bottom-1 h-2 bg-[#1F4336]/20 rounded-full -z-10" />
                </span>
              </h1>
              <p className="max-w-xl text-xs sm:text-sm text-[#6B7280]">
                Ceritakan bagaimana Orastrix menemani harimu. Setiap orang hanya dapat memberikan satu review.
              </p>
            </div>

            {/* Form / status sudah review */}
            <section className="mt-6 sm:mt-8 grid gap-5 md:grid-cols-5">
              <div className="md:col-span-3 rounded-3xl bg-white p-5 sm:p-7 border border-black/5 shadow-[0_8px_30px_rgba(17,24,39,0.08)]">
                {mine ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 py-6 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4336]/10 text-[#1F4336]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#111827]">
                      {justSent ? "Terima kasih atas review-mu!" : "Kamu sudah memberikan review"}
                    </h2>
                    <p className="max-w-sm text-xs sm:text-sm text-[#6B7280]">
                      Review-mu sudah langsung diterbitkan dan dapat dilihat pada daftar review di bawah.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    {/* Honeypot hidden input */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden pointer-events-none"
                    />

                    <div>
                      <label htmlFor="rv-name" className="mb-1.5 block text-xs sm:text-sm font-bold text-[#111827]">
                        Nama
                      </label>
                      <input
                        id="rv-name"
                        type="text"
                        value={name}
                        maxLength={40}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama kamu"
                        autoComplete="name"
                        disabled={submitting}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <span className="mb-1.5 block text-xs sm:text-sm font-bold text-[#111827]">Bintang</span>
                      <div className="flex items-center gap-3">
                        <StarRating value={rating} onChange={setRating} size="w-7 h-7" />
                        <span className="text-xs sm:text-sm font-semibold text-[#1F4336]">{LABELS[rating]}</span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rv-comment" className="mb-1.5 block text-xs sm:text-sm font-bold text-[#111827]">
                        Komentar
                      </label>
                      <textarea
                        id="rv-comment"
                        value={comment}
                        maxLength={300}
                        rows={3}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Ceritakan pengalamanmu memakai Orastrix..."
                        disabled={submitting}
                        className={`${inputCls} resize-none`}
                      />
                      <p className="mt-1 text-right text-[11px] text-black/40">{comment.length}/300</p>
                    </div>

                    {error && (
                      <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700 border border-red-100">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="self-start rounded-full bg-[#1F4336] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#1F4336]/25 transition-all duration-200 hover:bg-[#173326] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <span>Kirim Review</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Ringkasan rating */}
              <aside className="md:col-span-2 rounded-3xl bg-[#121417] p-5 sm:p-7 text-white border border-white/5 shadow-2xl flex flex-col justify-center gap-2.5">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                  Rata-rata rating
                </p>
                <p className="text-5xl sm:text-6xl font-extrabold tracking-tight">{average}</p>
                <StarRating value={Math.round(Number(average))} size="w-5 h-5" />
                <p className="text-xs sm:text-sm text-white/60">dari {reviews.length} review</p>
              </aside>
            </section>
          </div>

          {/* Dim overlay halus saat discroll */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </div>
      </div>

      {/* SECTION 2: STACKED CARD NAIK DARI BAWAH (Daftar semua review) */}
      <section
        id="reviews-list"
        className="relative z-20 w-full min-h-screen -mt-[70vh] bg-[#F8FAF7] shadow-[0_-30px_90px_rgba(0,0,0,0.35)] pt-16 sm:pt-20 pb-20"
      >
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827]">
              Review dari pelanggan
            </h2>
            <span className="text-xs font-bold bg-[#1F4336]/10 text-[#1F4336] px-3 py-1 rounded-full border border-[#1F4336]/15">
              {reviews.length} Total Ulasan
            </span>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 border-3 border-[#1F4336]/30 border-t-[#1F4336] rounded-full animate-spin" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center border border-black/5 text-[#6B7280]">
              Belum ada review. Jadilah yang pertama memberikan review di atas!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} highlight={mine?.id === r.id} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-20 bg-[#F8FAF7]">
        <Footer />
      </div>
    </div>
  );
}
