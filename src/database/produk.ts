import { supabase } from './supabaseClient';
import { Produk, ProdukInput } from '../types/produk';
import { logger } from '../utils/logger';

export const produkDB = {
  async getAll() {
    const { data, error } = await supabase
      .from('produk')
      .select('*')
      .order('game_code', { ascending: true });

    if (error) throw error;
    return data as Produk[];
  },

  async getByGame(gameCode: string) {
    const { data, error } = await supabase
      .from('produk')
      .select('*')
      .eq('game_code', gameCode)
      .order('harga', { ascending: true });

    if (error) throw error;
    return data as Produk[];
  },

  async create(produk: ProdukInput) {
    const { data, error } = await supabase
      .from('produk')
      .insert(produk)
      .select()
      .single();

    if (error) {
      logger.error('Failed to create product', error);
      throw error;
    }
    return data as Produk;
  },

  async update(id: number, updates: Partial<ProdukInput>) {
    const { data, error } = await supabase
      .from('produk')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Produk;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('produk')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
