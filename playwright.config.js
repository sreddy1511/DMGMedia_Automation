import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 900000,
  expect: { timeout: 100000 },
  reporter: [
    ['line'],
    ['allure-playwright']
  ],
  use: {
    actionTimeout: 15000,
    navigationTimeout: 30000,
    timezoneId: 'Europe/London',
    locale: 'en-GB',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'mobile-chrome-uk',
      use: {
        ...devices['Pixel 7'],
        userAgent: devices['Pixel 7'].userAgent?.replace('Mobile', 'Mobile Chrome'),
        colorScheme: 'light'
      },
      testMatch: /politics\.ga\.spec\.js/
    },
    {
      name: 'desktop-chrome-uk-dark',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark'
      },
      testMatch: /newscientist\.darkmode\.spec\.js/
    }
  ]
});
