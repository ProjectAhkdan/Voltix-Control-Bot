import { Context, NextFunction } from 'grammy';
import { logger } from '../../utils/logger';

export const loggerMiddleware = async (ctx: Context, next: NextFunction) => {
  const start = Date.now();
  const userId = ctx.from?.id;
  const username = ctx.from?.username || 'unknown';
  // Retrieve update type safely
  const type = Object.keys(ctx.update).find(k => k !== 'update_id') || 'unknown';
  
  // Log incoming update
  logger.info(`Incoming update [${type}] from ${userId} (@${username})`);

  try {
    await next();
  } catch (err) {
    logger.error(`Error processing update from ${userId}`, err);
    throw err; // Re-throw for error handler
  } finally {
    const ms = Date.now() - start;
    logger.debug(`Processed update in ${ms}ms`);
  }
};
