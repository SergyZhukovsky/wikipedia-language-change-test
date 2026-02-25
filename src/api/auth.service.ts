import { type Page } from '@playwright/test';
import { wikiLogin } from './wiki-auth';
import { config } from '../config';

export class AuthService {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    const cookies = await wikiLogin(username, password);
    if (cookies.length > 0) {
      await this.page.context().addCookies(cookies);
    }
    await this.page.goto(config.pages.mainPage, { waitUntil: 'domcontentloaded' });
  }
}