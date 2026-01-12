import { InlineKeyboard } from 'grammy';

export const actionTransaksi = (trxId: string) => new InlineKeyboard()
  .text('✅ Proses', `trx_process_${trxId}`)
  .text('❌ Tolak', `trx_reject_${trxId}`)
  .row()
  .text('🔙 Kembali', 'menu_transaksi');
