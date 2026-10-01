import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [320, 390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page
      .locator('.home-about')
      .screenshot({ path: `reference/about-home-${width}.png` });
    console.log('Home', width, await page.locator('.home-about').boundingBox());
    await page.getByRole('link', { name: 'Read my full story' }).click();
    await page.waitForURL('**/about');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `reference/about-page-${width}.png`, fullPage: true });
    console.log(
      'About',
      width,
      'overflow',
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      'errors',
      errors,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
