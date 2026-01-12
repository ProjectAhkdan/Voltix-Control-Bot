import { bot, registerCommands } from './index';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const setupWebhook = async () => {
  try {
    // 1. Register Commands
    await registerCommands();

    // 2. Set Webhook
    // Note: In Vercel, we don't necessarily need to run this on every boot, 
    // but for standalone or manual setup, this is useful.
    // For Vercel, we can rely on manual webhook setting or a specific admin command.
    
    // Using secret token for security
    await bot.api.setWebhook(env.WEBHOOK_URL, {
      secret_token: env.TELEGRAM_SECRET_TOKEN,
      drop_pending_updates: true, // Optional: clear old updates on restart
    });

    logger.info(`Webhook set to ${env.WEBHOOK_URL}`);
  } catch (error) {
    logger.error('Failed to setup webhook', error);
    process.exit(1);
  }
};

// Allow direct execution if run via node
if (require.main === module) {
  setupWebhook();
}

export { setupWebhook };
