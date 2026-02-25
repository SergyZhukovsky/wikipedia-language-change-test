import { test, expect } from '../fixture/fixture';
import { getRandomElement } from '../common/utils';
import { config } from '../config';


test.describe('Wikipedia Language Change', () => {
  let originalLanguage: string;

  test.beforeEach(async ({ authService, homePage }) => {
    await test.step('Login', async () => {
      await authService.login(config.credentials.username, config.credentials.password);
    });

    await test.step('Verify login success', async () => {
      await homePage.verifyUrl();
      await homePage.verifyPageElements();
      const username = await homePage.getLoggedInUsername();
      expect(username).toBe(config.credentials.username);
    });
  });

  test.afterEach(async ({ homePage, settingsPage }) => {
    if (!originalLanguage) return;

    await test.step('Restore original language', async () => {
      await homePage.navigate();
      await homePage.goToSettings();
      await settingsPage.goToAppearanceTab();

      const currentLanguage = await settingsPage.preferences.getCurrentLanguage();
      if (currentLanguage !== originalLanguage) {
        await settingsPage.preferences.setLanguage(originalLanguage);
        await settingsPage.preferences.save();
      }
    });
  });

  test('should change interface language and verify it applies', async ({
    homePage,
    settingsPage,
  }) => {
    let targetLanguage: string;

    await test.step('Navigate to Settings', async () => {
      await homePage.goToSettings();
      await settingsPage.verifyUrl();
    });

    await test.step('Go to Appearance tab', async () => {
      await settingsPage.goToAppearanceTab();
    });

    await test.step('Store current language and pick random different one', async () => {
      originalLanguage = await settingsPage.preferences.getCurrentLanguage();
      expect(originalLanguage).toBeTruthy();
      const availableLanguages = await settingsPage.preferences.getAvailableLanguages();
      expect(availableLanguages.length).toBeGreaterThan(1);
      targetLanguage = getRandomElement(availableLanguages, originalLanguage);
    });

    await test.step('Change language', async () => {
      await settingsPage.preferences.setLanguage(targetLanguage);
      await settingsPage.preferences.save();
      const currentLanguage = await settingsPage.preferences.getCurrentLanguage();
      expect(currentLanguage).toBe(targetLanguage);
    });

    await test.step('Verify language applied on Home Page', async () => {
      await homePage.navigate();
      await homePage.verifyUrl();
      await homePage.verifyPageElements();
      const interfaceLanguage = await homePage.getInterfaceLanguage();
      expect(interfaceLanguage).toBe(targetLanguage);
    });
  });
});