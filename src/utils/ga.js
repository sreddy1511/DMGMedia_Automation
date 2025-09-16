import { expect } from '@playwright/test';

export class GA {
  static isCollect(req) {
    return /^https:\/\/www\.google-analytics\.com\/g\/collect/.test(req.url());
  }

  static getParams(req) {
    const url = new URL(req.url());
    return Object.fromEntries(url.searchParams.entries());
  }

  static async waitForEvent(page, en, timeout = 15000) {
    const req = await page.waitForRequest(
      (r) => GA.isCollect(r) && new URL(r.url()).searchParams.get('en') === en,
      { timeout }
    );
    return GA.getParams(req);
  }

  static expectParamEq(params, key, value) {
    expect(params[key]).toBe(value);
  }

  static expectNpaZeroOrAbsent(params) {
    const npa = params['npa'];
    if (npa !== undefined) {
      expect(npa).toBe('0');
    }
  }
}
