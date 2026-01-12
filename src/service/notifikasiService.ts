import { bot } from '../bot/index';
import { logger } from '../utils/logger';

export const notifikasiService = {
  async send(userId: number, message: string) {
    try {
      await bot.api.sendMessage(userId, message, { parse_mode: 'HTML' });
      logger.info(`Notification sent to ${userId}`);
    } catch (error) {
      logger.error(`Failed to send notification to ${userId}`, error);
      // Don't throw to avoid breaking admin flow
    }
  },

  async notifyStatusChange(userId: number, trxId: string, status: string, produkName: string) {
    let message = '';
    switch (status) {
      case 'DIPROSES':
        message = `⏳ <b>Transaksi Diproses</b>\n\nPesanan <b>${produkName}</b> kamu sedang diproses oleh admin. Mohon tunggu sebentar ya!`;
        break;
      case 'SELESAI':
        message = `✅ <b>Transaksi Sukses!</b>\n\nPesanan <b>${produkName}</b> telah dikirim. Terima kasih sudah order!`;
        break;
      case 'GAGAL':
        message = `❌ <b>Transaksi Gagal</b>\n\nMohon maaf, pesanan <b>${produkName}</b> kamu dibatalkan. Silakan hubungi admin jika ada kendala.`;
        break;
    }

    if (message) {
      await this.send(userId, message);
    }
  }
};
