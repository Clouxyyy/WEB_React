# Product Management (React + Vite)

Aplikasi manajemen produk dengan React Router, Tailwind CSS, TypeScript, dan integrasi backend.

## Features

- Daftar produk berbentuk kartu (ID, nama, harga) dari API backend
- Pencarian produk berdasarkan nama
- **Tambah Produk** popup dengan validasi (nama wajib, harga > 0) — tersimpan ke API
- **Edit Produk** popup — tersimpan ke API
- **Hapus Produk** popup dengan konfirmasi — terhapus via API
- Halaman **detail produk** (`/products/:id`)
- Halaman **404** untuk URL yang tidak terdaftar
- Layout responsif (layar kecil sampai desktop)

## Tech Stack

- [React](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- ESLint

## Struktur

Atomic design:

```
src/components/
├── atoms/        # Button, Input
├── molecules/    # Modal, FormField, ProductCard, SearchBar
├── organisms/    # PageHeader, ProductGrid, ProductForm, DeleteConfirm
├── templates/    # PageLayout (navbar + Outlet)
└── pages/        # ProductsPage, ProductDetailPage, NotFoundPage

src/data/product/
├── param/        # parameter request
├── source/       # fetch HTTP
├── model/        # validasi response
└── repository/   # pemetaan payload → model
```

## Cara Menjalankan

### Frontend

1. `npm ci`
2. `cp .env.example .env.local` lalu isi `VITE_API_BASE_URL` (misal `http://localhost:3000/api`)
3. `npm run dev` → buka `http://localhost:5173`

### Backend

Jalankan service backend yang menyediakan endpoint:

| Method | Path | Fungsi |
|--------|------|--------|
| GET | `/products?q=` | daftar produk (array langsung) |
| GET | `/products/:id` | satu produk |
| POST | `/products` | tambah produk |
| PUT | `/products/:id` | update produk |
| DELETE | `/products/:id` | hapus produk |

Backend harus mengizinkan origin frontend (CORS).

## Perintah

| Command | Description |
|---------|-------------|
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | unit test |

## Routes

| URL | Halaman |
|-----|---------|
| `/` | redirect ke `/products` |
| `/products` | daftar produk |
| `/products/:id` | detail produk |
| `*` | 404 |
