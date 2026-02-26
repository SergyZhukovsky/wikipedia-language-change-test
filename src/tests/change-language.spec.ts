import { test, expect } from '../fixture/fixture';
import { getRandomElement } from '../common/utils';
import { config } from '../config';


test.describe('Wikipedia Language Change', () => {
  test('should change interface language and verify it applies', async ({
    authService,
    homePage,
    settingsPage,
  }) => {
    let targetLanguage: string;

    await test.step('Login', async () => {
      await authService.login(config.credentials.username, config.credentials.password);
    });

    await test.step('Verify login success', async () => {
      await homePage.verifyUrl();
      await homePage.verifyPageElements();
      expect(await homePage.getLoggedInUsername(), 'Logged in username should match credentials').toBe(config.credentials.username);
    });

    await test.step('Navigate to Settings', async () => {
      await homePage.goToSettings();
      await settingsPage.verifyUrl();
    });

    await test.step('Go to User profile tab', async () => {
      await settingsPage.goToUserProfileTab();
    });

    await test.step('Store current language and pick random different one', async () => {
      const originalLanguage = await settingsPage.userProfile.getCurrentLanguage();
      expect(originalLanguage, 'Current language should not be empty').toBeTruthy();
      const availableLanguages = await settingsPage.userProfile.getAvailableLanguages();
      expect(availableLanguages.length, 'Should have more than one language available').toBeGreaterThan(1);
      targetLanguage = getRandomElement(availableLanguages, originalLanguage);
    });

    await test.step('Change language', async () => {
      await settingsPage.userProfile.setLanguage(targetLanguage);
      await settingsPage.userProfile.save();
      expect(await settingsPage.userProfile.getCurrentLanguage(), 'Language should be saved after clicking Save').toBe(targetLanguage);
    });

    await test.step('Verify language applied on Home Page', async () => {
      await homePage.navigate();
      await homePage.verifyUrl();
      await homePage.verifyPageElements();
      const interfaceLanguage = await homePage.getInterfaceLanguage();
      expect(interfaceLanguage, 'Interface language on Main Page should match selected language').toBe(targetLanguage);
    });
  });
});
