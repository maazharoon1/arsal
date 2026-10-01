import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = 'http://localhost:3000';
try {
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    assert.equal(
      await page.evaluate(() =>
        performance
          .getEntriesByType('resource')
          .some(
            (r) =>
              r.name.includes('fonts.googleapis') || r.name.includes('fonts.gstatic'),
          ),
      ),
      false,
    );
    await page.screenshot({ path: `reference/polished-home-${width}.png` });
    if (width <= 700) {
      assert.equal(
        await page.locator('.home-about .profile-snapshot').isVisible(),
        false,
      );
      assert.ok((await page.locator('.home-about').boundingBox()).height < 650);
      const steps = page.locator('.design-process-step');
      const lastY = await steps
        .last()
        .evaluate((el) => el.getBoundingClientRect().top + scrollY);
      await page.evaluate(
        (y) => scrollTo({ top: y - 70 + 100, behavior: 'instant' }),
        lastY,
      );
      await page.waitForFunction(
        () =>
          Math.abs(
            document
              .querySelector('.design-process-step:last-child')
              .getBoundingClientRect().top - 70,
          ) < 1,
      );
      const tops = await steps.evaluateAll((els) =>
        els.map((el) => Math.round(el.getBoundingClientRect().top)),
      );
      assert.deepEqual(tops, [34, 46, 58, 70]);
      await page.screenshot({ path: `reference/polished-stack-${width}.png` });
    } else {
      assert.equal(
        await page
          .locator('.design-process-step')
          .first()
          .evaluate((el) => getComputedStyle(el).position),
        'static',
      );
    }
    await page.getByRole('link', { name: 'Read my full story' }).click();
    await page.waitForURL('**/about');
    await page.getByRole('heading', { level: 1 }).waitFor();
    assert.equal(await page.locator('.about-page-story p').count(), 3);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await page.locator('.about-page-story').scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      document.querySelector('.about-page-story').classList.contains('is-visible'),
    );
    assert.ok(
      parseFloat(
        await page
          .locator('.about-page-story p')
          .first()
          .evaluate((el) => getComputedStyle(el).fontSize),
      ) >= 18,
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(
      await page
        .locator('.about-page-story')
        .evaluate((el) => getComputedStyle(el).transitionDuration),
      '0s',
    );
    assert.deepEqual(errors, []);
    await page.close();
    console.log(
      `PASS ${width}px: fonts local, mobile About compact, stacking preserved, About route/reveals, reduced motion, no overflow/errors`,
    );
  }
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  for (const path of ['/', '/about']) {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    const hidden = await page
      .locator('.reveal')
      .evaluateAll(
        (els) =>
          els.filter(
            (el) =>
              getComputedStyle(el).display !== 'none' &&
              getComputedStyle(el).opacity === '0',
          ).length,
      );
    assert.equal(hidden, 0);
  }
  await page.close();
  console.log('PASS: homepage/About content remains visible with JavaScript disabled');
} finally {
  await browser.close();
}
