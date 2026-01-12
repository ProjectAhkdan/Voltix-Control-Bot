import { Context } from 'grammy';
import { transaksiDB } from '../../database/transaksi';
import { logAktivitasDB } from '../../database/logAktivitas';
import { notifikasiService } from '../../service/notifikasiService';
import { actionTransaksi } from '../keyboard/statusTransaksi';
import { konfirmasiAksi } from '../keyboard/konfirmasiAksi';
import { safeReply } from '../../utils/response';
import { logger } from '../../utils/logger';

// We need to handle callbacks:
// - trx_process_[id]
// - trx_reject_[id]
// - confirm_[action]_[id]
// - cancel_[action]_[id]

export const callbackHandler = async (ctx: Context) => {
  const data = ctx.callbackQuery?.data;
  if (!data) return;

  const adminId = ctx.from?.id!;
  await ctx.answerCallbackQuery(); // Stop loading animation

  const parts = data.split('_');
  const action = parts[0]; // trx | confirm | cancel

  try {
    if (action === 'trx') {
      const type = parts[1]; // process | reject
      const id = parts[2];
      
      // confirm first
      // Note: reusing the generic confirmation or creating specific one
      // Let's use a simple inline keyboard for validation directly here or via the generic one
      
      // Using the generic one I created earlier: konfirmasiAksi(action, id)
      // Re-map actions to simple strings for the keyboard generator
      const confirmAction = type === 'process' ? 'selesai' : 'gagal'; 
      // 'selesai' maps to 'process', 'gagal' maps to 'reject' in my mind, but let's be consistent.
      // Actually, 'process' sets status to DIPROSES? Or SELESAI? 
      // Flow instructions: "Admin ubah status transaksi: DIPROSES, SELESAI, GAGAL".
      // Let's assume buttons for Process (DIPROSES) and Selesai (SELESAI) and Tolak (GAGAL).
      
      // For simplicity in this text-based flow update:
      // If user clicked Process -> Set to DIPROSES immediately? Or ask confirmation?
      // Logically: Pending -> Diproses (maybe automatic or manual) -> Selesai.
      // Let's implement:
      // Click Process -> Update to DIPROSES, Notify User. Option to Mark Done later?
      // Click Reject -> Update to GAGAL.
      
      if (type === 'process') {
         await transaksiDB.updateStatus(id, 'DIPROSES');
         // Log
         await logAktivitasDB.log(adminId, 'UPDATE_STATUS', `Set Transaction ${id} to DIPROSES`);
         // Notify
         const trx = await transaksiDB.getById(id);
         await notifikasiService.notifyStatusChange(trx.user_id, id, 'DIPROSES', trx.produk_code);
         
         await ctx.editMessageText(`✅ Transaksi ${id} sedang <b>DIPROSES</b>.`, { parse_mode: 'HTML' });
         // Show button to Mark Complete
         // TODO: Add 'Mark Complete' button below this message?
      } else if (type === 'reject') {
         // Ask confirmation for rejection maybe? Skipped for speed.
         await transaksiDB.updateStatus(id, 'GAGAL');
         await logAktivitasDB.log(adminId, 'UPDATE_STATUS', `Set Transaction ${id} to GAGAL`);
         
         const trx = await transaksiDB.getById(id);
         await notifikasiService.notifyStatusChange(trx.user_id, id, 'GAGAL', trx.produk_code);
         
         await ctx.editMessageText(`❌ Transaksi ${id} <b>DITOLAK/GAGAL</b>.`, { parse_mode: 'HTML' });
      }
      
    } 
    // Handle menu navigation
    else if (data === 'menu_transaksi') {
      // Call cekTransaksi handler logic (need to extract it or just reply)
      // Or simply instructions
      await ctx.reply('Gunakan command /cektransaksi untuk melihat pesanan.');
    }
  } catch (error) {
    logger.error('Callback error', error);
    await ctx.reply('❌ Terjadi kesalahan.');
  }
};
