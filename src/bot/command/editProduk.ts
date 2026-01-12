import { Context } from 'grammy';
import { safeReply } from '../../utils/response';
import { produkDB } from '../../database/produk';

// MVP: Edit Price only via command
// /editproduk [id] [new_price]
export const editProdukHandler = async (ctx: Context) => {
  const args = ctx.match as string;
  if (!args) {
    return await safeReply(ctx, '⚠️ Format: `/editproduk [id] [harga_baru]`');
  }

  const [idStr, hargaStr] = args.split(' ');
  const id = parseInt(idStr);
  const harga = parseInt(hargaStr);

  if (!id || !harga) {
    return await safeReply(ctx, '⚠️ ID dan Harga harus angka valid.');
  }

  try {
    const updated = await produkDB.update(id, { harga });
    await safeReply(ctx, `✅ Produk UPDATED!\n${updated.nama_produk} -> ${updated.harga}`);
  } catch (error) {
    await safeReply(ctx, '❌ Gagal update produk.');
  }
};
