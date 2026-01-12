import { Bot } from 'grammy';
import { startHandler } from '../command/start';
import { cekTransaksiHandler } from '../command/cekTransaksi';
import { tambahProdukHandler } from '../command/tambahProduk';
import { editProdukHandler } from '../command/editProduk';
import { hapusProdukHandler } from '../command/hapusProduk';
import { laporanHandler } from '../command/laporan';
import { callbackHandler } from './callbackHandler';

export const registerHandlers = (bot: Bot) => {
  // Commands
  bot.command('start', startHandler);
  bot.command('cektransaksi', cekTransaksiHandler);
  bot.command('addproduk', tambahProdukHandler);
  bot.command('editproduk', editProdukHandler);
  bot.command('hapusproduk', hapusProdukHandler);
  bot.command('laporan', laporanHandler);

  // Callbacks
  bot.on('callback_query:data', callbackHandler);
};
