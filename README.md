# Orastrix Landing Page

Project React (Vite) untuk showcase produk Orastrix — tablet larut mulut
dari kitosan limbah cangkang udang.

## Struktur Folder

```
orastrix-project/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/                      # aset statis (favicon, dll)
└── src/
    ├── main.jsx                 # entry point React
    ├── App.jsx                  # routing (React Router)
    ├── data/
    │   └── products.js          # sumber data 3 varian produk
    ├── hooks/
    │   └── useActivePanel.js    # logic panel aktif (dipakai ProductShowcase)
    ├── styles/
    │   └── index.css            # Tailwind directives + global style
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── icons/
    │   │   └── LeafIcon.jsx
    │   └── ProductShowcase/
    │       ├── index.jsx        # wrapper: panel-panel + tombol Jelajahi
    │       └── Panel.jsx        # satu panel produk (interaksi expand)
    ├── pages/
    │   ├── Home.jsx             # landing page utama (sesuai desain referensi)
    │   ├── About.jsx            # kerangka — isi konten brand story
    │   ├── Product.jsx          # kerangka — detail semua varian
    │   └── Contact.jsx          # kerangka — form/info kontak
    └── assets/
        └── products/            # taruh lemon-mint.png, berry.png, fresh-mint.png di sini
```

## Menjalankan Project

```bash
npm install
npm run dev
```

Lalu buka `http://localhost:5173`.

## Yang Perlu Disesuaikan

1. **Gambar produk** — taruh 3 file di `src/assets/products/`
   (lihat README di folder tersebut).
2. **Tombol Buy Now** — saat ini hanya `console.log` di `pages/Home.jsx`
   (`handleBuy`). Sambungkan ke logic cart/checkout kalau sudah ada.
3. **Halaman About / Product / Contact** — masih kerangka kosong dengan
   komentar `TODO`, tinggal isi konten sesuai kebutuhan tim.
4. **Single-page vs multi-page** — saat ini sudah di-routing terpisah
   per halaman (`/about`, `/product`, `/contact`) pakai React Router.
   Kalau tim lebih suka semua jadi satu halaman panjang dengan
   scroll-anchor (`#about`, `#product`, dst, seperti navbar-nya),
   tinggal pindahkan isi tiap `pages/*.jsx` jadi `<section>` di dalam
   `Home.jsx`, dan `App.jsx` bisa disederhanakan langsung me-render
   `<Home />` tanpa `<Routes>`.

## Styling

Pakai Tailwind CSS. Warna 3 varian produk didefinisikan di dua tempat
yang saling terhubung:
- `src/data/products.js` (dipakai langsung sebagai inline style)
- `tailwind.config.js` → `theme.extend.colors.orastrix` (kalau mau
  dipakai sebagai utility class seperti `bg-orastrix-blue`)
