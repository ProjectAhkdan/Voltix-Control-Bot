import { supabase } from './supabaseClient';
import { User } from '../types/user';
import { logger } from '../utils/logger';

export const userDB = {
  async getByTelegramId(telegramId: number) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
      logger.error(`Error fetching user ${telegramId}`, error);
      throw error;
    }
    return data as User | null;
  },

  async isAdmin(telegramId: number): Promise<boolean> {
    const user = await this.getByTelegramId(telegramId);
    return user?.role === 'admin';
  }
};
