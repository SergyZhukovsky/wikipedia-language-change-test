import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { UserProfileTab } from './user-profile-tab.page';
import { config } from '../config';

export class SettingsPage extends BasePage {
  private readonly userProfileTabButton: Locator;

  readonly userProfile: UserProfileTab;

  constructor(page: Page) {
    super(page);
    this.userProfileTabButton = page.locator('.oo-ui-tabOptionWidget').first();
    this.userProfile = new UserProfileTab(page);
  }

  get url(): RegExp {
    return new RegExp(config.pages.preferences);
  }

  async goToUserProfileTab() {
    await this.userProfileTabButton.click();
    await this.waitForPageLoad();
    await expect(this.userProfileTabButton).toHaveAttribute('aria-selected', 'true');
  }
}
