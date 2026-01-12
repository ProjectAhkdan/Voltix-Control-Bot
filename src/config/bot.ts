export const BOT_CONFIG = {
  RATE_LIMIT: {
    MAX_REQUESTS: 20, // max requests per user
    WINDOW: 1000, // 1 second
  },
  MESSAGES: {
    WELCOME: 'Halo Admin! Silakan gunakan menu di bawah untuk mengelola transaksi.',
    UNAUTHORIZED: '⛔ Akses Ditolak. Anda bukan admin terdaftar.',
    ERROR: 'Terjadi kesalahan sistem. Admin lain telah dinotifikasi.',
    MAINTENANCE: 'Bot sedang dalam perbaikan.',
  },
  MENUS: {
    MAIN: '📋 Menu Utama Admin',
    TRANSAKSI: '💰 Manajemen Transaksi',
    PRODUK: '📦 Manajemen Produk',
  },
};
