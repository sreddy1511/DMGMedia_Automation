import { test } from '@playwright/test';
import { NewScientistHomePage } from '../src/pages/NewScientistHomePage.js';

/**
 * Suite: Validates Dark/Light mode persistence on New Scientist homepage
 * Environment: Desktop Chrome emulation, UK region, initial Dark mode
 */
test.describe('@appearance @desktop UK – NewScientist dark mode persistence', () => {
  test('Dark -> Light toggle persists via localStorage', async ({ page }, testInfo) => {
    // Add metadata annotations for Allure reporting
    testInfo.annotations.push({ type: 'owner', description: 'qa-team' });
    testInfo.annotations.push({ type: 'severity', description: 'major' });

    const home = new NewScientistHomePage(page);

    // Step 1: Navigate to homepage
    await test.step('1) Navigate to homepage (desktop, dark mode)', async () => {
      await home.openHome();
    });

    // Step 2: Verify <html> has "Dark" class initially
    await test.step('2) <html> has class "Dark" after load', async () => {
      await home.expectHtmlHasClass('Dark');
    });

    // Step 3: Verify localStorage key for dark mode preference
    await test.step('3) localStorage key colourSchemeAppearance = "Dark"', async () => {
      await home.expectLocalStorageAppearance('Dark');
    });

    // Step 4: Accept cookie consent modal
    await test.step('4) Dismiss consent "Got It"', async () => {
      await home.clickGotItConsent();
    });

    // Step 5: Toggle the appearance setting to Light
    await test.step('5) Toggle Appearance to Light', async () => {
      await home.forceThemeToLight();
    });

    // Step 6: Verify <html> switched to Light and removed Dark
    await test.step('6) <html> has "Light" and no "Dark"', async () => {
      await home.expectHtmlHasClass('Light');
      await home.expectHtmlNotHaveClass('Dark');
    });

    // Step 7: Verify localStorage updated to Light preference
    await test.step('7) localStorage colourSchemeAppearance updated to "Light"', async () => {
      await home.expectLocalStorageAppearance('Light');
    });

    // Step 8: Refresh and ensure the Light theme persists
    await test.step('8) Refresh & verify Light class persists after load', async () => {
      await page.reload({ waitUntil: 'load' });
      await home.expectHtmlHasClass('Light');
    });
  });
});