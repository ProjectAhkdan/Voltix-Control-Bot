import { Context } from 'grammy';
import { safeReply } from '../../utils/response';
import { produkDB } from '../../database/produk';

// /hapusproduk [id]
export const hapusProdukHandler = async (ctx: Context) => {
  const args = ctx.match as string;
  if (!args) {
    return await safeReply(ctx, '⚠️ Format: `/hapusproduk [id]`');
  }

  const id = parseInt(args);
  if (!id) {
    return await safeReply(ctx, '⚠️ ID harus angka valid.');
  }

  try {
    await produkDB.delete(id);
    await safeReply(ctx, `✅ Produk ID ${id} BERHASIL DIHAPUS.`);
  } catch (error) {
    await safeReply(ctx, '❌ Gagal hapus produk.');
  }
};
