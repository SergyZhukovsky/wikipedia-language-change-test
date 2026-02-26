import { type Page, type Locator, expect } from '@playwright/test';

export class UserProfileTab {
  private readonly languageSelect: Locator;
  private readonly saveButton: Locator;
  private readonly successNotification: Locator;

  constructor(private page: Page) {
    this.languageSelect = page.locator('#mw-input-wplanguage select[name="wplanguage"]');
    this.saveButton = page.locator('#prefcontrol');
    this.successNotification = page.locator('.mw-notification-type-info .mw-notification-content');
  }

  async getCurrentLanguage(): Promise<string> {
    return await this.languageSelect.inputValue();
  }

  async getAvailableLanguages(): Promise<string[]> {
    return await this.languageSelect.locator('option').evaluateAll(
      options => options.map(o => o.getAttribute('value') ?? '').filter(Boolean),
    );
  }

  async setLanguage(code: string) {
    await this.languageSelect.selectOption(code, { force: true });
  }

  async save() {
    await this.saveButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.successNotification, 'Success notification should appear after saving').toBeVisible();
  }
}