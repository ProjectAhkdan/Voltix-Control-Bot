import { BotError, Context } from 'grammy';
import { logger } from '../../utils/logger';
import { BOT_CONFIG } from '../../config/bot';

export const errorHandler = async (err: BotError<Context>) => {
  const ctx = err.ctx;
  logger.error(`Error while handling update ${ctx.update.update_id}:`);
  logger.error(String(err.error));

  try {
    // Only reply if it makes sense (e.g. private chat)
    if (ctx.chat?.type === 'private') {
       await ctx.reply(BOT_CONFIG.MESSAGES.ERROR);
    }
  } catch (e) {
    // Failed to reply, maybe blocked or network issue
    logger.error('Could not send error message to user', e);
  }
};
