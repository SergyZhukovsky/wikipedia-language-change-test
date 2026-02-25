import { test as base, expect } from '@playwright/test';
import { AuthService } from '../api/auth.service';
import { HomePage } from '../pages/home.page';
import { SettingsPage } from '../pages/settings.page';

type TestFixtures = {
  authService: AuthService;
  homePage: HomePage;
  settingsPage: SettingsPage;
};

export const test = base.extend<TestFixtures>({
  authService: async ({ page }, use) => use(new AuthService(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  settingsPage: async ({ page }, use) => use(new SettingsPage(page)),
});

export { expect } from '@playwright/test';