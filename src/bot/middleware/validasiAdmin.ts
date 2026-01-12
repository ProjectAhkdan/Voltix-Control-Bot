import { Context, NextFunction } from 'grammy';
import { env } from '../../config/env';
import { BOT_CONFIG } from '../../config/bot';
import { logger } from '../../utils/logger';

export const validasiAdmin = async (ctx: Context, next: NextFunction) => {
  const userId = ctx.from?.id;

  if (!userId) {
    return; // Ignore updates without user ID
  }

  // Check if user is in ADMIN_IDS list
  const isAdmin = env.ADMIN_IDS.includes(String(userId));

  if (!isAdmin) {
    logger.warn(`Unauthorized access attempt from ${userId} (@${ctx.from?.username})`);
    // Optionally reply, but for security sometimes silent is better. 
    // Requirement says "Bot hanya bisa diakses oleh ADMIN_ID", so we block.
    // If it's a private chat, we might tell them off.
    if (ctx.chat?.type === 'private') {
      await ctx.reply(BOT_CONFIG.MESSAGES.UNAUTHORIZED);
    }
    return;
  }

  await next();
};
