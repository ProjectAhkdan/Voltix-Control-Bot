import { Bot, webhookCallback } from 'grammy';
import { createServer } from 'http';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { validasiAdmin } from './middleware/validasiAdmin';
import { rateLimit, setupThrottler } from './middleware/rateLimit';
import { loggerMiddleware } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { registerHandlers } from './handler/commandHandler';

// --- INITIALIZATION ---
export const bot = new Bot(env.BOT_TOKEN);

// Setup Throttler
setupThrottler(bot);

// Middleware
bot.use(loggerMiddleware);
bot.use(rateLimit);
bot.use(validasiAdmin);

// Error Handler
bot.catch(errorHandler);

// --- COMMANDS ---
const initCommands = async () => {
  registerHandlers(bot);
  logger.info('Commands and handlers registered');
};

// --- RUNNER ---
const run = async () => {
  await initCommands();

  // If WEBHOOK_URL is defined, use Webhook mode (Production/Railway)
  // Otherwise use Long Polling (Local Dev)
  if (env.WEBHOOK_URL && env.NODE_ENV === 'production') {
    const port = process.env.PORT || 3000;
    
    // Setup Webhook automatically on start
    try {
      await bot.api.setWebhook(`${env.WEBHOOK_URL}`, {
        secret_token: env.TELEGRAM_SECRET_TOKEN,
        drop_pending_updates: true,
      });
      logger.info(`Webhook set to: ${env.WEBHOOK_URL}`);
    } catch (e) {
      logger.error('Failed to set webhook', e);
    }

    // Start HTTP Server for Railway/Vercel/DigitalOcean
    const server = createServer(webhookCallback(bot, 'http', {
      secretToken: env.TELEGRAM_SECRET_TOKEN,
    }));

    server.listen(port, () => {
      logger.info(`Bot running on Webhook mode. Listening on port ${port}`);
    });
  } else {
    // Long Polling
    logger.info('Bot running on Long Polling mode...');
    // Clear webhook just in case
    await bot.api.deleteWebhook();
    bot.start();
  }
};

// Execute if run directly
if (require.main === module) {
  run();
}

export { run };
