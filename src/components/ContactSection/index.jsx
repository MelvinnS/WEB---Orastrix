import React, { useState } from "react";
import { CONTACT_CONFIG } from "../../data/contact";

const TOPIC_OPTIONS = [
  "Pertanyaan produk",
  "Pemesanan",
  "Layanan jasa Website",
  "Lainnya",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    topic: TOPIC_OPTIONS[0],
    message: "",
    _gotcha: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const waEncodedMsg = encodeURIComponent(
    CONTACT_CONFIG.whatsappDefaultMessage || "Halo Orastrix!"
  );
  const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${waEncodedMsg}`;
  const igUrl =
    CONTACT_CONFIG.instagramUrl ||
    `https://instagram.com/${CONTACT_CONFIG.el_falskie}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot check
    if (formData._gotcha) {
      setSuccess(true);
      return;
    }

    // Client-side validations
    const cleanName = formData.name.trim();
    const cleanContact = formData.contact.trim();
    const cleanMsg = formData.message.trim();

    if (cleanName.length < 2) {
      setErrorMessage("Mohon masukkan nama Anda (minimal 2 karakter).");
      return;
    }

    if (cleanContact.length < 4) {
      setErrorMessage("Mohon masukkan email atau nomor WhatsApp yang valid.");
      return;
    }

    if (cleanMsg.length < 5) {
      setErrorMessage("Mohon tuliskan pesan Anda (minimal 5 karakter).");
      return;
    }

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (!formspreeId || formspreeId === "ganti_dengan_formspree_form_id_kamu") {
      setErrorMessage(
        "Formspree ID belum dikonfigurasi di environment (VITE_FORMSPREE_ID). Anda tetap bisa menghubungi kami langsung melalui tombol WhatsApp atau Instagram di atas."
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          contact: cleanContact,
          topic: formData.topic,
          message: cleanMsg,
          _gotcha: formData._gotcha,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          contact: "",
          topic: TOPIC_OPTIONS[0],
          message: "",
          _gotcha: "",
        });
      } else {
        setErrorMessage(
          data.error ||
            "Maaf, gagal mengirim pesan saat ini. Silakan coba kembali atau hubungi kami langsung via WhatsApp."
        );
      }
    } catch (err) {
      setErrorMessage(
        "Terjadi gangguan koneksi jaringan. Silakan periksa koneksi Anda atau hubungi kami via WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Box Kartu Putih & Hitam (Neo-minimalist style sesuai referensi foto) */}
      <div className="w-full bg-white border-2 border-black rounded-3xl p-6 sm:p-10 md:p-12 shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] transition-all">
        {/* Header Judul & Kalimat Singkat */}
        <div className="text-center flex flex-col items-center gap-2.5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight">
            Yuk, Ngobrol Bareng Kami
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-lg leading-relaxed">
            Punya pertanyaan seputar produk, pemesanan, atau ingin bekerja sama?
            Kami siap mendengarkan.
          </p>

          {/* Tombol Cepat: WhatsApp & Instagram */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3">
            {/* Tombol WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black bg-white text-black text-xs sm:text-sm font-bold shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.769.832 2.789.833 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.819-5.765-5.819zm3.385 8.213c-.14.394-.817.751-1.127.799-.307.049-.694.074-1.12-.063-.261-.084-.597-.199-1.03-.388-1.821-.796-3.007-2.658-3.099-2.779-.091-.122-.743-.988-.743-1.884 0-.897.471-1.338.638-1.52.167-.183.366-.228.487-.228.122 0 .244.002.35.007.112.005.263-.042.411.314.152.366.519 1.265.565 1.357.046.091.076.198.015.32-.061.122-.091.198-.182.305-.091.107-.194.239-.276.321-.092.091-.188.19-.081.374.107.183.475.784 1.021 1.269.704.627 1.297.82 1.48.912.183.091.29.076.397-.046.107-.122.457-.533.579-.716.122-.183.244-.153.411-.091.167.061 1.066.502 1.249.594.183.091.305.137.35.213.045.076.045.441-.095.835z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Tombol Instagram */}
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black bg-white text-black text-xs sm:text-sm font-bold shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Garis Pemisah Minimalis */}
        <div className="relative my-8 sm:my-10 flex items-center justify-center">
          <div className="w-full border-t border-black/15" />
          <span className="absolute bg-white px-4 text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            atau kirim pesan
          </span>
        </div>

        {/* State Sukses */}
        {success ? (
          <div className="rounded-2xl border-2 border-black bg-neutral-50 p-6 sm:p-8 text-center flex flex-col items-center gap-3">
            <span className="w-12 h-12 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-black">
              Pesan terkirim, kami balas maksimal 1x24 jam
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
              Terima kasih telah menghubungi Orastrix. Tim kami akan segera
              merespons melalui kontak yang kamu cantumkan.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-2 text-xs font-bold text-black underline hover:text-neutral-600"
            >
              Kirim pesan lain
            </button>
          </div>
        ) : (
          /* Formulir Kontak */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
            {/* Honeypot field (anti-spam bot) */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field: Nama */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs sm:text-sm font-bold text-black mb-1.5"
                >
                  Nama
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama kamu"
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition disabled:opacity-50"
                />
              </div>

              {/* Field: Email atau WhatsApp */}
              <div>
                <label
                  htmlFor="contact-info"
                  className="block text-xs sm:text-sm font-bold text-black mb-1.5"
                >
                  Email atau No. WhatsApp
                </label>
                <input
                  id="contact-info"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="contoh@email.com / 0812xxxx"
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition disabled:opacity-50"
                />
              </div>
            </div>

            {/* Field: Topik */}
            <div>
              <label
                htmlFor="contact-topic"
                className="block text-xs sm:text-sm font-bold text-black mb-1.5"
              >
                Topik
              </label>
              <div className="relative">
                <select
                  id="contact-topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black text-xs sm:text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/20 transition appearance-none cursor-pointer disabled:opacity-50"
                >
                  {TOPIC_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field: Pesan */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-bold text-black"
                >
                  Pesan
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {formData.message.length}/500
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pertanyaan atau kebutuhanmu di sini..."
                disabled={submitting}
                className="w-full px-4 py-3 rounded-xl border-2 border-black text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition resize-none disabled:opacity-50"
              />
            </div>

            {/* Pesan Error Ramah */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-xl border-2 border-black bg-neutral-100 text-xs text-black font-medium leading-relaxed"
              >
                {errorMessage}
              </div>
            )}

            {/* Tombol Kirim Form */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-black bg-black text-white font-bold text-xs sm:text-sm shadow-[4px_4px_0px_#000] hover:bg-neutral-800 transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Pesan</span>
                )}
              </button>

              {/* Kalimat kecil proteksi data */}
              <p className="text-[11px] text-neutral-500 text-center sm:text-right">
                * Data hanya dipakai untuk membalas pesan.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
