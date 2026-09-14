/* eslint-disable @typescript-eslint/no-require-imports */
// Run against `next start`; external traffic is blocked, including ASP clicks.
// PLAYWRIGHT_MODULE may point to an existing Playwright installation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.LP_TEST_ORIGIN || 'http://127.0.0.1:8790';
const route = '/lp/ai-skill-academy-free-seminar';
const output = process.env.LP_TEST_OUTPUT || path.join(process.cwd(), 'output/lp-check');
const ids = ['cta-1', 'cta-2', 'cta-3', 'sticky'];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true });
  try {
    const context = await browser.newContext();
    await context.route('**/*', r => {
      const url = new URL(r.request().url());
      return url.origin === origin && !url.pathname.startsWith('/_vercel/') ? r.continue() : r.abort();
    });
    let page;
    const errors = [];
    for (const width of [320, 375, 414, 767, 768, 1024, 1280]) {
      if (page) await page.close();
      page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      await page.setViewportSize({ width, height: 824 });
      const response = await page.goto(origin + route);
      assert.equal(response.status(), 200);
      const raw = await response.text();
      assert(raw.includes('AIのこと、') && raw.includes('何に使うかは、見てから考えても大丈夫'), 'SSR content');
      await page.waitForFunction(() => window.dataLayer?.some(e => e.event === 'page_view'));
      for (const image of await page.locator('[data-lp] img:not([aria-hidden])').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(async i => {
          await Promise.race([i.decode(), new Promise((_, reject) => setTimeout(() => reject(new Error('Image did not load: ' + i.outerHTML)), 15000))]);
        });
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(150);
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      assert.equal(await page.locator('header').count(), 1);
      assert.equal(await page.locator('footer').count(), 1);
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.body-cta').count(), 3);
      assert.equal(await page.locator('dialog, .image-open, .annotation-label, .review-tools').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
      assert.equal(await page.locator('#B03 a:not(.body-cta), #B05 a, #B08 a').count(), 0);
      assert.equal(await page.locator('#B02 .participation-note br').count(), 1);
      assert.equal(await page.locator('#B07 .details').innerText(), '最新の日程と参加手順は、申込ページ・届いたメールから確認できます。');
      for (let i = 1; i <= 10; i++) assert.equal(await page.locator('#B' + String(i).padStart(2, '0')).count(), 1);
      for (const id of ids) {
        const button = page.locator('#' + id);
        assert.match(await button.getAttribute('href'), /^https:\/\/h\.accesstrade\.net\/sp\/cc\?rk=0100q2kh00ouwh$/);
        assert.match(await button.getAttribute('rel'), /sponsored/);
        assert.equal(await button.getAttribute('target'), '_blank');
      }
      assert.equal(await page.locator('img[src*="accesstrade"]').count(), 1);
      assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'), /\/IMG-02.png$/);
      assert.equal(await page.locator('meta[property="og:image:width"]').getAttribute('content'), '1536');
      assert.equal(await page.locator('meta[property="og:image:height"]').getAttribute('content'), '1024');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.toolarc.jp' + route);
      {
        // Absent robots meta is indexable; do not call getAttribute on a missing locator (Playwright waits/timeouts).
        const robotsContents = await page.locator('meta[name="robots"]').evaluateAll((els) =>
          els.map((el) => el.getAttribute('content')),
        );
        assert.ok(
          robotsContents.every((content) => content == null || !/noindex/i.test(content)),
          `expected indexable robots, got ${JSON.stringify(robotsContents)}`,
        );
      }
      assert.doesNotMatch(await page.locator('meta[name="viewport"]').getAttribute('content'), /user-scalable=no|maximum-scale=1/);
      assert.equal(await page.title(), 'はじめてのAI、無料セミナーをのぞいてみませんか｜スマホから参加OK');
      assert(await page.locator('.sticky').isHidden());
      if (width === 375 || width === 1280) {
        await page.screenshot({ path: path.join(output, `lp-${width}.png`), fullPage: true });
        for (const block of ['B02', 'B03', 'B05', 'B07']) await page.locator('#' + block).screenshot({path:path.join(output, `${block}-${width}.png`)});
      }
      await page.locator('#B04').scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      assert.equal(await page.locator('.sticky').isVisible(), width < 768);
      for (const id of ['cta-1', 'cta-2', 'cta-3']) {
        await page.locator('#' + id).scrollIntoViewIfNeeded();
        await page.waitForTimeout(120);
        assert(await page.locator('.sticky').isHidden(), `sticky duplicates ${id}`);
      }
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      assert(await page.locator('.sticky').isHidden(), 'footer overlap');
      console.log(`PASS ${width}px: content, layout, links, metadata, sticky visibility`);
    }

    await page.setViewportSize({ width: 375, height: 824 });
    await page.goto(origin + route);
    await page.waitForFunction(() => window.dataLayer?.some(e => e.event === 'page_view'));
    // Prevent default navigation before invoking the real React click handler.
    await page.evaluate(() => document.addEventListener('click', e => {
      if (e.target.closest('[data-affiliate-key]')) e.preventDefault();
    }, true));
    for (const id of ids) {
      if (id === 'sticky') await page.locator('#B04').scrollIntoViewIfNeeded();
      else await page.locator('#' + id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(180);
      await page.locator('#' + id).click();
      await page.keyboard.press('Tab');
      await page.locator('#' + id).focus();
      const focus = await page.locator('#' + id).evaluate(e => ({ active: document.activeElement === e, outline: getComputedStyle(e).outlineStyle }));
      assert(focus.active && focus.outline !== 'none', 'visible keyboard focus');
    }
    await page.locator('#B04').scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const events = await page.evaluate(() => window.dataLayer);
    for (const id of ids) {
      assert.equal(events.filter(e => e.event === 'outbound_click' && e.cta_id === id).length, 1, `click ${id}`);
      assert.equal(events.filter(e => e.event === 'lp_cta_impression' && e.cta_id === id).length, 1, `impression ${id}`);
    }
    assert.equal(context.pages().length, 1, 'No affiliate popup requests');
    // Actual Next Link navigation must restore the normal site shell and return cleanly.
    await page.getByRole('link', {name:'運営情報', exact:true}).click();
    await page.waitForURL(origin + '/about');
    assert.equal(await page.locator('[data-lp]').count(), 0);
    assert.equal(await page.locator('header').count(), 1);
    assert.equal(await page.locator('footer').count(), 1);
    await page.goBack();
    await page.waitForURL(origin + route);
    assert.equal(await page.locator('header').count(), 1);
    assert.equal(await page.locator('footer').count(), 1);
    for (const pathname of ['/', '/blog/ai-basics-before-chatgpt-claude-checklist']) {
      assert.equal((await page.goto(origin + pathname)).status(), 200);
      assert.equal(await page.locator('[data-lp]').count(), 0);
      assert.equal(await page.locator('body > header').count(), 1);
      assert.equal(await page.locator('body > footer').count(), 1);
    }
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 824 } });
    await noJs.route('**/*', r => new URL(r.request().url()).origin === origin ? r.continue() : r.abort());
    const staticPage = await noJs.newPage();
    await staticPage.goto(origin + route);
    assert.equal(await staticPage.locator('.body-cta').count(), 3);
    assert.equal(await staticPage.locator('header').count(), 1);
    assert(await staticPage.locator('#B10').isVisible());
    assert(await staticPage.locator('.sticky').isHidden());
    assert.deepEqual(errors, [], 'Browser runtime errors');
    console.log('PASS CTA events (once per placement), keyboard focus, navigation, existing pages, SSR without JavaScript; no external traffic');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
