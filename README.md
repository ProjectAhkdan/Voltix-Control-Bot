# Telegram Bot Admin - Game Top Up System

Bot Khusus Admin untuk memproses transaksi top up game, mengelola produk, dan melihat laporan.

## 🚀 Fitur

- **Manajemen Transaksi**: Cek transaksi pending, ubah status (Diproses/Selesai/Gagal).
- **Manajemen Produk**: Tambah, Edit, Hapus produk game.
- **Notifikasi Otomatis**: Update status langsung dikirim ke customer.
- **Laporan**: Ringkasan transaksi harian/bulanan.
- **Security**: Validasi admin, Webhook Secret, Rate Limiting.

## 🛠️ Setup

1. **Clone Repository**
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Konfigurasi Environment**
   Buat file `.env` berdasarkan `env.example` (atau lihat `src/config/env.ts`):
   ```
   BOT_TOKEN=your_bot_token
   TELEGRAM_SECRET_TOKEN=random_string
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ADMIN_IDS=["123456789"]
   WEBHOOK_URL=https://your-domain.com/api/webhook
   ```
4. **Jalankan Development**
   ```bash
   npm run dev
   ```
   Atau dengan Docker:
   ```bash
   docker-compose up --build
   ```

## 📚 Struktur Project

- `src/bot`: Core logika bot (handlers, commands, keyboards).
- `src/database`: Koneksi & helper Supabase.
- `src/data`: File data produk statis (sebagai seed atau fallback).
- `src/service`: Layanan eksternal (Notifikasi).

## 🔒 Keamanan

- Webhook diverifikasi dengan `TELEGRAM_SECRET_TOKEN`.
- Hanya `ADMIN_IDS` yang bisa mengakses bot.
- Semua aksi admin dicatat di tabel `log_aktivitas`.

## 📦 Deployment

Project ini siap deploy ke **Vercel** atau **Railway**.
Pastikan Environment Variables diset di dashboard provider hosting.

## 📝 Menambah Admin

Tambahkan Admin ID ke array `ADMIN_IDS` di `.env`.
Contoh: `ADMIN_IDS=["12345678", "98765432"]`
