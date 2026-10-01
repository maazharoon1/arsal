import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
      hasTouch: true,
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://localhost:3000/services/logo-design', {
      waitUntil: 'networkidle',
    });
    assert.equal(await page.locator('.gallery-tile').count(), 9);
    assert.equal(await page.locator('.gallery-placeholder').count(), 8);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await page.screenshot({
      path: `reference/gallery-page-${width}.png`,
      fullPage: true,
    });
    const tile = page.locator('.gallery-tile').nth(1);
    await tile.click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor();
    assert.ok(
      (await page.locator('.gallery-lightbox-tools').innerText()).includes('2 / 9'),
    );
    await page.getByRole('button', { name: 'Next image', exact: true }).click();
    assert.ok(
      (await page.locator('.gallery-lightbox-tools').innerText()).includes('3 / 9'),
    );
    await page.keyboard.press('ArrowLeft');
    assert.ok(
      (await page.locator('.gallery-lightbox-tools').innerText()).includes('2 / 9'),
    );
    await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
    assert.equal(await page.locator('.gallery-lightbox-viewport.is-zoomed').count(), 1);
    await page.getByRole('button', { name: 'Next image', exact: true }).click();
    assert.equal(await page.locator('.gallery-lightbox-viewport.is-zoomed').count(), 0);
    const viewport = page.locator('.gallery-lightbox-viewport');
    assert.equal(
      await viewport.evaluate((el) => getComputedStyle(el).overflow),
      'hidden',
    );
    await viewport.dblclick();
    assert.equal(await page.locator('.gallery-lightbox-viewport.is-zoomed').count(), 1);
    const box = await viewport.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 60, {
      steps: 5,
    });
    await page.mouse.up();
    assert.ok(
      (await page.locator('.gallery-lightbox-art').getAttribute('style')).includes(
        '50px, 60px',
      ),
    );
    await viewport.dblclick();
    assert.equal(await page.locator('.gallery-lightbox-viewport.is-zoomed').count(), 0);
    // Touch double-tap opens zoom; a compatibility dblclick must not undo it.
    for (let tap = 0; tap < 2; tap++) {
      await page.touchscreen.tap(box.x + 40, box.y + 40);
    }
    assert.equal(await page.locator('.gallery-lightbox-viewport.is-zoomed').count(), 1);
    await viewport.dispatchEvent('dblclick');
    assert.equal(await page.locator('.gallery-lightbox-viewport.is-zoomed').count(), 1);
    await page.getByRole('button', { name: 'Zoom out', exact: true }).click();
    await page.screenshot({ path: `reference/gallery-viewer-${width}.png` });
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.equal(await tile.evaluate((el) => el === document.activeElement), true);
    await page.locator('.gallery-tile').first().click();
    await page.getByRole('button', { name: 'Previous image', exact: true }).click();
    assert.ok(
      (await page.locator('.gallery-lightbox-tools').innerText()).includes('9 / 9'),
    );
    await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
    await page
      .getByRole('navigation', { name: 'Branding services' })
      .getByRole('link', { name: 'Business Cards', exact: true })
      .click();
    await page.waitForURL('**/services/business-cards');
    assert.equal(await page.locator('.gallery-tile').count(), 9);
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.deepEqual(errors, []);
    console.log(
      `PASS ${width}px: gallery, viewer, next/previous, keyboard, zoom reset, focus return, service tabs`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
