import { type Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  abstract get url(): string | RegExp;

  async verifyUrl() {
    await expect(this.page).toHaveURL(this.url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}