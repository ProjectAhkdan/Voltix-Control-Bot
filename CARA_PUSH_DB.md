# Panduan Push Database ke Supabase

Berikut langkah untuk push struktur database yang sudah saya buatkan di `supabase/migrations/20240101000000_init.sql`.

## Cara 1: Menggunakan npx (Tanpa Install Supabase CLI Global)

1. **Login ke Supabase**
   ```bash
   npx supabase login
   ```
2. **Link Project**
   Dapatkan Project ID dari URL Dashboard Supabase anda (misal: `https://xyz.supabase.co`, ID-nya `xyz`).
   ```bash
   npx supabase link --project-ref project_id_anda
   ```
   Masukan password user databases jika diminta.

3. **Push Database**
   ```bash
   npx supabase db push
   ```

## Cara 2: Manual (Copy Paste Query)

Jika `npx` terlalu ribet, anda bisa copy paste manual query SQL.
1. Buka file `supabase/migrations/20240101000000_init.sql`.
2. Copy semua isinya.
3. Buka Dashboard Supabase -> SQL Editor.
4. Paste dan klik **RUN**.

---

Setelah database ter-push, bot siap dijalankan!
