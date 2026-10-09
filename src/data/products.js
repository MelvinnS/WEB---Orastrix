import lemonMintImg from "../assets/products/lemon-mint.png";
import berryImg from "../assets/products/berry.png";
import freshMintImg from "../assets/products/fresh-mint.png";

/**
 * Data produk Orastrix — satu sumber kebenaran yang dipakai oleh
 * ProductShowcase (landing page) maupun halaman Product nanti.
 *
 * Menggunakan import Vite langsung agar di-bundle ke /assets/ saat build production,
 * dengan fallback ke public static path.
 */

export const PRODUCTS = [
  {
    id: "lemon-mint",
    name: "Lemon Mint",
    tagline: "LEMON\nMINT",
    price: "Rp 20.000",
    description:
      "Segar citrus dengan sentuhan mint klasik. Pilihan favorit untuk aktivitas padat sepanjang hari.",
    bg: "#6E8FB3",
    textColor: "#FFFFFF",
    image: lemonMintImg || "/products/lemon-mint.png",
  },
  {
    id: "berry",
    name: "Berry",
    tagline: "BERRY",
    price: "Rp 20.000",
    description:
      "Rasa berry manis-asam yang lembut, menyegarkan napas tanpa rasa menyengat.",
    bg: "#7A2142",
    textColor: "#FFFFFF",
    image: berryImg || "/products/berry.png",
  },
  {
    id: "fresh-mint",
    name: "Fresh Mint",
    tagline: "FRESH\nMINT",
    price: "Rp 20.000",
    description:
      "Mint murni yang tajam dan tahan lama, untuk kesegaran maksimal kapan saja.",
    bg: "#1F4336",
    textColor: "#FFFFFF",
    image: freshMintImg || "/products/fresh-mint.png",
  },
];
