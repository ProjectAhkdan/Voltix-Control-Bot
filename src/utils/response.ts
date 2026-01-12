import { Context } from 'grammy';
import { logger } from './logger';

export const safeReply = async (ctx: Context, text: string) => {
  try {
    await ctx.reply(text, { parse_mode: 'HTML' });
  } catch (error) {
    logger.error('Failed to send message', error);
  }
};
