import { Context } from 'grammy';
import { produkDB } from '../../database/produk';
import { safeReply } from '../../utils/response';
import { logger } from '../../utils/logger';

// Note: Conversation (interactive flow) is needed for "Add Product" properly.
// For this step, I'll implement a skeleton that would be triggered by conversation or arguments.
// Simplifying to argument-based for strict initial implementation or ready for conversation.
// "Format: /addproduk [code] [game] [nama] [harga]" (Basic version)

export const tambahProdukHandler = async (ctx: Context) => {
  const args = ctx.match as string;
  if (!args) {
    return await safeReply(ctx, '⚠️ Format: `/addproduk [game_code] [nama_produk] [harga]`\nContoh: `/addproduk ml Diamonds_100 15000`');
  }

  const [game_code, ...rest] = args.split(' ');
  const harga = parseInt(rest.pop() || '0');
  const nama_produk = rest.join(' ');

  if (!game_code || !nama_produk || !harga) {
     return await safeReply(ctx, '⚠️ Format salah. Pastikan harga adalah angka di akhir.');
  }

  try {
    const produk = await produkDB.create({
      game_code,
      nama_produk,
      harga,
      aktif: true
    });
    
    await safeReply(ctx, `✅ Produk berhasil ditambah!\nID: ${produk.id}\n${produk.nama_produk} - ${produk.game_code}`);
    logger.info(`Admin ${ctx.from?.id} created product ${produk.id}`);
  } catch (error) {
    logger.error('Failed to add product', error);
    await safeReply(ctx, '❌ Gagal menambah produk. Cek log.');
  }
};
