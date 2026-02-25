import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const config = {
  baseURL: process.env.BASE_URL || 'https://en.wikipedia.org',
  apiPath: process.env.API_PATH || '/w/api.php',
  credentials: {
    username: process.env.WIKI_USERNAME!,
    password: process.env.WIKI_PASSWORD!,
  },
  pages: {
    mainPage: '/wiki/Main_Page',
    preferences: '/wiki/Special:Preferences#mw-prefsection-rendering',
  },
};