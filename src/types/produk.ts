export interface Produk {
  id: number;
  game_code: string;
  nama_produk: string;
  harga: number;
  aktif: boolean;
  created_at: string;
}

export interface ProdukInput {
  game_code: string;
  nama_produk: string;
  harga: number;
  aktif?: boolean;
}
