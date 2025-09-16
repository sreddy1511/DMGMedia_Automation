import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class NewScientistHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.appearanceToggle = this.page.locator('#appearance-toggle');
  }

  async openHome() {
    await this.open('https://www.newscientist.com/');
  }

  async clickGotItConsent() {
    const gotIt = this.page.locator(
      '#onetrust-accept-btn-handler, button:has-text("Got It"), button:has-text("Got it")'
    );
    await gotIt.first().click();
    await this.assertModalGone();
  }

  async forceThemeToLight() {
    await this.appearanceToggle.click();
  }

  async expectHtmlHasClass(expected) {
    const html = this.page.locator('html');
    await expect(html).toHaveClass(new RegExp(`\\b${expected}\\b`));
  }

  async expectHtmlNotHaveClass(notExpected) {
    const html = this.page.locator('html');
    await expect(html).not.toHaveClass(new RegExp(`\\b${notExpected}\\b`));
  }

  async expectLocalStorageAppearance(value) {
    const actual = await this.page.evaluate(() => localStorage.getItem('colourSchemeAppearance'));
    expect(actual).toBe(value);
  }
}
