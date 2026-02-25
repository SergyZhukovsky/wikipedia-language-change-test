import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

if (!process.env.WIKI_USERNAME || !process.env.WIKI_PASSWORD) {
  throw new Error('WIKI_USERNAME and WIKI_PASSWORD environment variables must be set');
}

export const config = {
  baseURL: process.env.BASE_URL || 'https://en.wikipedia.org',
  apiPath: process.env.API_PATH || '/w/api.php',
  credentials: {
    username: process.env.WIKI_USERNAME,
    password: process.env.WIKI_PASSWORD,
  },
  pages: {
    mainPage: '/wiki/Main_Page',
    preferences: '/wiki/Special:Preferences',
  },
};