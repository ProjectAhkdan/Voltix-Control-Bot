import { InlineKeyboard } from 'grammy';

export const konfirmasiAksi = (action: string, id: string) => new InlineKeyboard()
  .text('✅ Ya, Yakin', `confirm_${action}_${id}`)
  .text('❌ Batal', `cancel_${action}_${id}`);
