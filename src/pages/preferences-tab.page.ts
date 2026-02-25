import { type Page, type Locator } from '@playwright/test';

export class PreferencesComponent {
  private readonly languageSelect: Locator;
  private readonly saveButton: Locator;

  constructor(private page: Page) {
    this.languageSelect = page.locator('select[name="wplanguage"]');
    this.saveButton = page.locator('#prefcontrol');
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
    await this.languageSelect.selectOption(code);
  }

  async save() {
    await this.saveButton.click({ force: true });
    await this.page.waitForLoadState('networkidle');
  }
}
