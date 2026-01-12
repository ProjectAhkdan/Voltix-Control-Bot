import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1),
  TELEGRAM_SECRET_TOKEN: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  ADMIN_IDS: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) throw new Error('ADMIN_IDS must be an array');
      return parsed.map(String);
    } catch {
      // Fallback for comma-separated string
      return val.split(',').map((id) => id.trim());
    }
  }),
  WEBHOOK_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export const env = envSchema.parse(process.env);
