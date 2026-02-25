import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { PreferencesComponent } from './preferences-tab.page';

export class SettingsPage extends BasePage {
  private readonly heading: Locator;
  private readonly appearanceTab: Locator;

  readonly preferences: PreferencesComponent;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('#firstHeading');
    this.appearanceTab = page.locator('.oo-ui-tabOptionWidget').first();
    // this.appearanceTab = page.locator('#ooui-php-538').getByText('Profilo utente');
    this.preferences = new PreferencesComponent(page);
  }

  get url(): RegExp {
    return new RegExp('Special:Preferences');
  }

  async getHeadingText(): Promise<string> {
    return (await this.heading.textContent()) ?? '';
  }

  async goToAppearanceTab() {
    await this.appearanceTab.click();
    await this.waitForPageLoad();
  }
}
