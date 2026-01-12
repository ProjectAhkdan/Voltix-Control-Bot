import { Context, NextFunction } from 'grammy';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { BOT_CONFIG } from '../../config/bot';
import { logger } from '../../utils/logger';

// Since this is a serverless function, in-memory rate limiting per instance might be limited.
// Ideally usage of Redis or similar is better, but for admin bot with limited users, 
// basic memory or just reliance on Telegram's own limits + throttling is often enough.
// We will use grammY's transformer throttler for outgoing requests.

export const setupThrottler = (bot: any) => {
  const throttler = apiThrottler();
  bot.api.config.use(throttler);
};

// Simple in-memory rate limiter for incoming updates (per instance)
const requestCounts = new Map<number, { count: number; expires: number }>();

export const rateLimit = async (ctx: Context, next: NextFunction) => {
  if (!ctx.from?.id) return next();

  const userId = ctx.from.id;
  const now = Date.now();
  const record = requestCounts.get(userId);

  if (record && now < record.expires) {
    record.count++;
    if (record.count > BOT_CONFIG.RATE_LIMIT.MAX_REQUESTS) {
      logger.warn(`Rate limit exceeded for user ${userId}`);
      return; // Drop request
    }
  } else {
    requestCounts.set(userId, {
      count: 1,
      expires: now + BOT_CONFIG.RATE_LIMIT.WINDOW,
    });
  }

  await next();
};
