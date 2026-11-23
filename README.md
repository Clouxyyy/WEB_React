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

### 1. Backend (express_product_api)

Clone dan jalankan service backend (repo terpisah: [express_product_api](https://github.com/Clouxyyy/express_product_api), Tugas 2):

```bash
git clone https://github.com/Clouxyyy/express_product_api.git
cd express_product_api
npm ci

# siapkan database SQLite
echo 'DATABASE_URL="file:./dev.db"' > .env
npx prisma migrate deploy
npx prisma generate
npx prisma db seed        # mengisi 2 produk awal (opsional)

npm start                 # server aktif di http://localhost:3000
```

Endpoint yang dipakai frontend:

| Method | Path | Fungsi |
|--------|------|--------|
| GET | `/products` | daftar produk (array langsung) |
| GET | `/products/:id` | satu produk |
| POST | `/products` | tambah produk |
| PUT | `/products/:id` | update produk |
| DELETE | `/products/:id` | hapus produk |

> Catatan: pencarian `?q=` tidak didukung backend, jadi filter nama dilakukan di sisi frontend.

### 2. Frontend

```bash
# di folder WEB_React
npm ci
cp .env.example .env.local    # VITE_API_BASE_URL=/api
npm run dev                   # buka http://localhost:5173
```

Saat development, request ke `/api/*` diteruskan **proxy Vite** ke `http://localhost:3000` (prefix `/api` dilepas), sehingga tidak butuh CORS di backend. Jika backend sudah memasang middleware `cors`, `VITE_API_BASE_URL` juga bisa diisi langsung `http://localhost:3000/products`.

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
