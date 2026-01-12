import { supabase } from './supabaseClient';
import { Transaksi, StatusTransaksi } from '../types/transaksi';
import { logger } from '../utils/logger';

export const transaksiDB = {
  async getPending() {
    const { data, error } = await supabase
      .from('transaksi')
      .select('*')
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Transaksi[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('transaksi')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Transaksi;
  },

  async updateStatus(id: string, status: StatusTransaksi) {
    const { data, error } = await supabase
      .from('transaksi')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error(`Failed to update transaction ${id}`, error);
      throw error;
    }
    return data as Transaksi;
  },

  async getReport(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('transaksi')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    
    if (error) throw error;
    return data as Transaksi[];
  }
};
