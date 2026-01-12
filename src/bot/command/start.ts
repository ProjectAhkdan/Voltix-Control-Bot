import { Context } from 'grammy';
import { BOT_CONFIG } from '../../config/bot';
import { menuAdmin } from '../keyboard/menuAdmin';
import { safeReply } from '../../utils/response';

export const startHandler = async (ctx: Context) => {
  await safeReply(ctx, BOT_CONFIG.MESSAGES.WELCOME);
  await ctx.reply('Pilih menu:', { reply_markup: menuAdmin });
};
