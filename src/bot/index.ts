import { Bot } from 'grammy';
import { logger } from '../utils/logger';
import { env } from '../config/env';
import { validasiAdmin } from './middleware/validasiAdmin';
import { rateLimit, setupThrottler } from './middleware/rateLimit';
import { loggerMiddleware } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

// Initialize bot
export const bot = new Bot(env.BOT_TOKEN);

// Setup Throttler (outgoing)
setupThrottler(bot);

// Middleware Registration (Order matters!)
bot.use(loggerMiddleware); // Log first
bot.use(rateLimit);        // Check limits
bot.use(validasiAdmin);    // Auth check

// Error Handler
bot.catch(errorHandler);

// Commands will be registered in setupWebhook or a separate loader
// We'll export a function to register commands to avoid circular deps if needed
import { registerHandlers } from './handler/commandHandler';

export const registerCommands = async () => {
  registerHandlers(bot);
  logger.info('Commands and handlers registered');
};
