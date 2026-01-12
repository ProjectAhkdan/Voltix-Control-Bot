import { InlineKeyboard } from 'grammy';
import { BOT_CONFIG } from '../../config/bot';

export const menuAdmin = new InlineKeyboard()
  .text(BOT_CONFIG.MENUS.TRANSAKSI, 'menu_transaksi')
  .text(BOT_CONFIG.MENUS.PRODUK, 'menu_produk')
  .row()
  .text('📊 Laporan', 'menu_laporan')
  .text('❌ Tutup', 'tutup_menu');
