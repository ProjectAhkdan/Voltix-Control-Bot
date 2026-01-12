import { supabase } from './supabaseClient';
import { LogAktivitas } from '../types/logAktivitas';
import { logger } from '../utils/logger';

export const logAktivitasDB = {
  async log(adminId: number, aksi: string, detail: string) {
    const { error } = await supabase
      .from('log_aktivitas')
      .insert({
        admin_id: adminId,
        aksi,
        detail,
        waktu: new Date().toISOString()
      });

    if (error) {
      logger.error('Failed to create activity log', error);
      // Don't throw, just log error to avoid breaking main flow
    }
  },

  async getRecent(limit = 50) {
    const { data, error } = await supabase
      .from('log_aktivitas')
      .select('*')
      .order('waktu', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as LogAktivitas[];
  }
};
