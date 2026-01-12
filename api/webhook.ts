import { webhookCallback } from 'grammy';
import { bot } from '../src/bot';

// Vercel Serverless Function
export default webhookCallback(bot, 'https');
