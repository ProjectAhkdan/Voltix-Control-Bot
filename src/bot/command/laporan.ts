import { Context } from 'grammy';
import { safeReply } from '../../utils/response';
import { transaksiDB } from '../../database/transaksi';
import { formatRupiah } from '../../utils/formatter';

// /laporan [hari|bulan] (default hari)
export const laporanHandler = async (ctx: Context) => {
  const mode = (ctx.match as string || 'hari').toLowerCase();
  
  const now = new Date();
  let startDate = new Date();
  
  if (mode === 'bulan') {
    startDate.setDate(1); // First day of month
  } else {
    startDate.setHours(0, 0, 0, 0); // Start of today
  }

  try {
    const txs = await transaksiDB.getReport(startDate.toISOString(), now.toISOString());
    const totalTx = txs.length;
    const successTx = txs.filter(t => t.status === 'SELESAI');
    
    // Assuming product data needs to be joined to get actual revenue, 
    // but for now we might count transactions or if price was stored in history.
    // For MVP, we list counts.
    
    let report = `📊 <b>Laporan ${mode === 'bulan' ? 'Bulanan' : 'Harian'}</b>\n`;
    report += `📅 Sejak: ${startDate.toLocaleDateString()}\n\n`;
    report += `Total Transaksi: ${totalTx}\n`;
    report += `✅ Sukses: ${successTx.length}\n`;
    report += `❌ Gagal: ${txs.filter(t => t.status === 'GAGAL').length}\n`;
    report += `⏳ Pending: ${txs.filter(t => t.status === 'PENDING').length}\n`;

    await safeReply(ctx, report);
  } catch (error) {
    await safeReply(ctx, '❌ Gagal ambil laporan.');
  }
};
