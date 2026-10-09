import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LeafIcon from "../icons/LeafIcon";
import ReviewCard, { colorFor } from "./ReviewCard";
import { getFeaturedReviews, getReviews } from "../../lib/reviewStore";

const ease = [0.22, 1, 0.36, 1];

/** Testimoni di beranda: 3 review pilihan admin + tombol ke halaman review. */
export default function TestimonialSection() {
  const [reviews, setReviews] = useState([]);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [shown, all] = await Promise.all([
          getFeaturedReviews(3),
          getReviews(),
        ]);
        if (isMounted) {
          setReviews(shown);
          const ids = new Set(shown.map((r) => r.id));
          setOthers(all.filter((r) => !ids.has(r.id)));
        }
      } catch (err) {
        console.error("Gagal memuat testimoni:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full mt-20 sm:mt-28 md:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease }}
        className="flex flex-col items-center text-center gap-5"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4336]/10 text-[#1F4336] text-xs font-bold tracking-[0.25em] uppercase border border-[#1F4336]/15 shadow-sm">
          <LeafIcon className="w-3.5 h-3.5 text-[#1F4336]" />
          TESTIMONI
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
          Kata Mereka tentang{" "}
          <span className="relative inline-block text-[#1F4336]">
            Orastrix
            <span className="absolute left-0 right-0 -bottom-1 h-2 bg-[#1F4336]/20 rounded-full -z-10" />
          </span>
        </h2>
      </motion.div>

      {loading ? (
        <div className="mt-14 flex justify-center items-center py-12">
          <div className="w-8 h-8 border-3 border-[#1F4336]/30 border-t-[#1F4336] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease, delay: i * 0.13 }}
            >
              <ReviewCard review={review} compact />
            </motion.div>
          ))}
        </div>
      )}

      {!loading && others.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease }}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <Link
            to="/review"
            className="group inline-flex items-center gap-4 focus:outline-none"
            aria-label={`Lihat ${others.length} review lainnya`}
          >
            <span className="flex items-center -space-x-3">
              {others.slice(0, 4).map((r, i) => (
                <span
                  key={r.id}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#121417] text-xs font-bold text-white transition-transform duration-300 ease-out group-hover:translate-x-1"
                  style={{
                    backgroundColor: colorFor(r.name),
                    zIndex: 10 - i,
                    transitionDelay: `${i * 40}ms`,
                  }}
                  aria-hidden="true"
                >
                  {(r.name.trim()[0] || "?").toUpperCase()}
                </span>
              ))}
            </span>

            <span className="relative text-lg sm:text-xl font-extrabold tracking-tight text-[#111827]">
              <span className="text-[#1F4336]">+{others.length}</span> Review Lainnya
              <span className="absolute left-0 -bottom-1 h-[3px] w-full origin-left scale-x-[0.25] rounded-full bg-[#121417] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>

            <span className="text-xl font-black text-[#121417] transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className="mt-8 sm:mt-10 flex justify-center"
      >
        <Link
          to="/review"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#121417] bg-[#1F4336] px-7 py-3 text-sm font-bold text-white shadow-[3px_5px_0_0_#121417] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_7px_0_0_#121417] active:translate-y-1 active:shadow-[1px_1px_0_0_#121417]"
        >
          Tambahkan Review
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
