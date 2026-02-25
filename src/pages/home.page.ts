import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../config';

export class HomePage extends BasePage {
  private readonly userDropdownCheckbox: Locator;
  private readonly userLink: Locator;
  private readonly searchInput: Locator;
  private readonly mainContent: Locator;
  private readonly logo: Locator;
  private readonly userMenuPreferences: Locator;
  private readonly preferencesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.userDropdownCheckbox = page.locator('#vector-user-links-dropdown-checkbox');
    this.userLink = page.locator('#p-vector-user-menu-userpage');
    this.searchInput = page.locator('#searchInput');
    this.mainContent = page.locator('#mw-content-text');
    this.logo = page.locator('.mw-logo');
    this.userMenuPreferences = page.locator('#p-vector-user-menu-preferences');
    this.preferencesLink = page.locator('#pt-preferences a');
  }

  get url(): RegExp {
    return new RegExp(config.pages.mainPage);
  }

  async navigate() {
    await this.page.goto(config.pages.mainPage);
    await this.waitForPageLoad();
  }

  async verifyPageElements() {
    await Promise.all([
      expect(this.mainContent).toBeVisible(),
      expect(this.searchInput).toBeVisible(),
      expect(this.logo).toBeVisible(),
    ]);
  }

  async getLoggedInUsername(): Promise<string> {
    return (await this.userLink.innerText()).trim();
  }

  async getInterfaceLanguage(): Promise<string> {
    return await this.userMenuPreferences.getAttribute('lang') ?? '';
  }

  async goToSettings() {
    await this.userDropdownCheckbox.check({ force: true });
    await this.preferencesLink.click();
    await this.waitForPageLoad();
  }
}
