export type StatusTransaksi = 'PENDING' | 'DIPROSES' | 'SELESAI' | 'GAGAL';

export interface Transaksi {
  id: string; // UUID
  user_id: number;
  game_code: string;
  produk_code: string; // Assuming this maps to a product ID or code
  data_akun_game: Record<string, any>;
  status: StatusTransaksi;
  created_at: string;
  updated_at: string;
}
