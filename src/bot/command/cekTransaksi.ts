import { Context } from 'grammy';
import { transaksiDB } from '../../database/transaksi';
import { safeReply } from '../../utils/response';
import { formatDate } from '../../utils/formatter';

export const cekTransaksiHandler = async (ctx: Context) => {
  try {
    const list = await transaksiDB.getPending();
    
    if (list.length === 0) {
      return await safeReply(ctx, '✅ Tidak ada transaksi pending.');
    }

    let message = `📋 <b>Daftar Transaksi Pending (${list.length})</b>\n\n`;
    
    // Limit to 10 to avoid too long message
    const preview = list.slice(0, 10);
    
    preview.forEach((trx, i) => {
      message += `${i + 1}. <b>${trx.produk_code}</b>\n`;
      message += `   Game: ${trx.game_code}\n`;
      message += `   Tanggal: ${formatDate(trx.created_at)}\n`;
      message += `   ID: <code>${trx.id}</code>\n\n`;
    });

    if (list.length > 10) {
      message += `... dan ${list.length - 10} lainnya.`;
    }

    await safeReply(ctx, message);
  } catch (error) {
    throw error;
  }
};
