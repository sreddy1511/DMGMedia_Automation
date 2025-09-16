import { test } from '@playwright/test';
import { PoliticsPage } from '../src/pages/PoliticsPage.js';
import { GA } from '../src/utils/ga.js';

/**
 * Suite: Validates Google Analytics behaviour on iNews Politics page
 * Environment: Mobile Chrome emulation, UK region
 */
test.describe('@ga @mobile UK – iNews Politics GA validation', () => {
  test('Validate GA collect params before/after consent', async ({ page }, testInfo) => {
    // Add metadata annotations for Allure reporting
    testInfo.annotations.push({ type: 'owner', description: 'qa-team' });
    testInfo.annotations.push({ type: 'severity', description: 'critical' });

    const politics = new PoliticsPage(page);

    // Step 1: Navigate to the iNews Politics category page
    await test.step('1) Navigate to /news/politics (mobile, UK settings)', async () => {
      await politics.openPage();
    });

    // Step 2: Listen for the GA "page_view" request and check expected query parameters
    await test.step('2) Capture GA page_view and assert query params', async () => {
      const params = await GA.waitForEvent(page, 'page_view');
      GA.expectParamEq(params, 'ep.sub_channel_1', 'news/politics');
      GA.expectParamEq(params, 'gcs', 'G101');
      GA.expectParamEq(params, 'npa', '1');
    });

    // Step 3: Accept the cookie consent modal
    await test.step('3) Accept consent modal', async () => {
      await politics.acceptOneTrustIfPresent();
    });

    // Step 4: Confirm modal is removed from the DOM
    await test.step('4) Confirm modal removed from DOM', async () => {
      await politics.assertModalGone();
    });

    // Step 5: Listen for GA "user_engagement" event after consent and validate query parameters
    await test.step('5) Capture GA user_engagement and assert params', async () => {
      const params = await GA.waitForEvent(page, 'user_engagement');
      GA.expectParamEq(params, 'gcs', 'G111');
      GA.expectNpaZeroOrAbsent(params);
    });
  });
});