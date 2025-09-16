import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url, { waitUntil: 'load' });
  }

  async acceptOneTrustIfPresent() {
    const accept = this.page.locator(
      '#onetrust-accept-btn-handler, button:has-text("Accept All"), button:has-text("Accept")'
    );
    if (await accept.first().isVisible()) {
      await accept.first().click();
      await expect(this.page.locator('#onetrust-banner-sdk, #onetrust-consent-sdk')).toBeHidden({
        timeout: 10000
      });
    }
  }

  async assertModalGone() {
    await expect(
      this.page.locator('#onetrust-banner-sdk, #onetrust-consent-sdk, .ot-sdk-container')
    ).toBeHidden({ timeout: 10000 });
  }
}
