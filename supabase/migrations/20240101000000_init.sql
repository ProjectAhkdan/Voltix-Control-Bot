-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE NOT NULL,
    username TEXT,
    role TEXT CHECK (role IN ('customer', 'admin')) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Produk Table
CREATE TABLE IF NOT EXISTS produk (
    id SERIAL PRIMARY KEY,
    game_code TEXT NOT NULL,
    nama_produk TEXT NOT NULL,
    harga BIGINT NOT NULL,
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Transaksi Table
CREATE TABLE IF NOT EXISTS transaksi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id BIGINT REFERENCES users(telegram_id), -- Linking to telegram_id for easier lookup or id?
    -- Note: user_id in Types code was number, but here we might want to link to internal ID or telegram_id.
    -- Bot logic uses telegram_id mostly. Let's refer to telegram_id as foreign key if unique.
    -- However, best practice is internal ID. But for bot simplicity, let's keep it loose or match logic.
    -- Code: user_id: number.
    game_code TEXT NOT NULL,
    produk_code TEXT NOT NULL,
    data_akun_game JSONB DEFAULT '{}'::jsonb,
    status TEXT CHECK (status IN ('PENDING', 'DIPROSES', 'SELESAI', 'GAGAL')) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Log Aktivitas Table
CREATE TABLE IF NOT EXISTS log_aktivitas (
    id SERIAL PRIMARY KEY,
    admin_id BIGINT NOT NULL,
    aksi TEXT NOT NULL,
    detail TEXT,
    waktu TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_transaksi_status ON transaksi(status);
CREATE INDEX IF NOT EXISTS idx_transaksi_user_id ON transaksi(user_id);
CREATE INDEX IF NOT EXISTS idx_produk_game_code ON produk(game_code);
