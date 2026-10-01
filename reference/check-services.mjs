import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

// Dev server chalayein. Browser ko public Cloudinary images access karni hongi.
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = 'http://localhost:3000';
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.service-card').count(), 6);
  for (let i = 0; i < 3; i++)
    await page.getByRole('button', { name: 'Load More', exact: true }).click();
  assert.equal(await page.locator('.service-card').count(), 19);
  assert.equal(
    await page.getByRole('button', { name: 'Load More', exact: true }).count(),
    0,
  );

  // Lazy images ko viewport mein la kar actual successful load verify karein.
  for (const card of await page.locator('.service-card').all()) {
    await card.scrollIntoViewIfNeeded();
    const image = card.locator('img');
    if (await image.count())
      await image.evaluate(
        (img) =>
          new Promise((resolve, reject) => {
            if (img.complete)
              return img.naturalWidth
                ? resolve()
                : reject(new Error('Broken image: ' + img.src));
            img.onload = resolve;
            img.onerror = () => reject(new Error('Broken image: ' + img.src));
          }),
      );
  }
  assert.equal(await page.locator('.service-image-fallback').count(), 0);
  assert.equal(await page.locator('.service-card .documentation-art').count(), 1);
  const urls = await page
    .locator('.service-card')
    .evaluateAll((cards) => cards.map((card) => card.href));
  for (const url of urls) {
    const response = await page.request.get(url);
    assert.equal(response.status(), 200, url);
    const html = await response.text();
    assert.ok(html.includes('masonry-gallery'), url);
  }
  assert.equal(
    (await page.request.get(base + '/services/unknown-service')).status(),
    404,
  );

  for (const [name, count] of [
    ['Branding', 4],
    ['Marketing Design', 6],
    ['Editorial Design', 3],
    ['Packaging & Print', 4],
    ['Web Design', 1],
    ['Illustrations', 1],
  ]) {
    await page.getByRole('button', { name, exact: true }).click();
    assert.equal(await page.locator('.service-card').count(), count, name);
  }
  await page.getByRole('button', { name: 'All Categories', exact: true }).click();
  assert.equal(await page.locator('.service-card').count(), 6);
  await page.locator('#projects').screenshot({ path: 'reference/services-desktop.png' });
  await page.getByRole('link', { name: 'Explore Logo Design', exact: true }).click();
  await page.waitForURL('**/services/logo-design');
  await page.getByRole('heading', { name: 'Logo Design.' }).waitFor();
  assert.ok((await page.title()).includes('Logo Design'));
  await page
    .locator('.gallery-tile img')
    .first()
    .evaluate((img) => img.decode());
  await page.screenshot({ path: 'reference/service-logo-desktop.png', fullPage: true });
  await page.getByRole('link', { name: 'Back to all services', exact: true }).click();
  await page.waitForURL('**/#projects');
  assert.deepEqual(errors, []);
  console.log(
    'PASS: all 18 Cloudinary images, 19 service pages, 6 filters, pagination, navigation, 404, no runtime errors',
  );
  await page.close();

  for (const width of [390, 768, 320]) {
    const mobile = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    await mobile.goto(base, { waitUntil: 'networkidle' });
    await mobile.getByRole('button', { name: 'Editorial Design', exact: true }).click();
    assert.equal(await mobile.locator('.service-card').count(), 3);
    assert.equal(
      await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await mobile
      .locator('#projects')
      .screenshot({ path: `reference/services-${width}.png` });
    await mobile
      .getByRole('link', { name: 'Explore Documentation', exact: true })
      .click();
    await mobile.waitForURL('**/services/documentation');
    assert.equal(await mobile.locator('.documentation-art').count(), 1);
    assert.equal(await mobile.locator('.gallery-tile').count(), 9);
    assert.equal(await mobile.locator('.gallery-preview-note').count(), 1);
    assert.equal(
      await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await mobile.screenshot({
      path: `reference/documentation-${width}.png`,
      fullPage: true,
    });
    if (width <= 700) {
      await mobile.getByRole('button', { name: 'Open menu' }).click();
      assert.equal(
        await mobile
          .getByRole('navigation')
          .getByRole('link', { name: 'Projects' })
          .getAttribute('href'),
        '/#projects',
      );
    }
    await mobile.close();
    console.log(
      `PASS ${width}px: responsive listing, documentation placeholder, menu links`,
    );
  }
} finally {
  await browser.close();
}
