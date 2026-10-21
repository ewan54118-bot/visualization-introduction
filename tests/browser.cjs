/* Optional browser verification: npm install --no-save playwright, then node tests/browser.cjs.
 * Uses an already installed Chrome; override CHROME_PATH when needed.
 * Start python -m http.server 8080 first. No test dependency is shipped with the site.
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context = await browser.newContext({viewport:{width:1440,height:1050},acceptDownloads:true});
  const page = await context.newPage();
  const errors=[],badResponses=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)badResponses.push(`${r.status()} ${r.url()}`);});
  const base=process.env.TEST_URL||'http://127.0.0.1:8080/';
  const go=async hash=>{await page.goto(base+hash);await page.waitForTimeout(80);};
  fs.mkdirSync('test-results',{recursive:true});
  await go('');
  await page.screenshot({path:'test-results/desktop-home.png',fullPage:true});
  assert.equal(await page.locator('.course-card').count(),6);
  assert.equal(await page.locator('.stat').count(),4);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'desktop overflow');
  await page.locator('[data-action=search]').click();
  await page.locator('#global-search').fill('Data Join');
  assert.ok(await page.locator('.search-result').count()>0);
  await page.keyboard.press('Escape');
  await go('#courses');
  await page.locator('[data-action=bookmark][data-id="3"]').click();
  await page.locator('[data-action=course-filter][data-value=saved]').click();
  assert.equal(await page.locator('.course-card').count(),1);
  await go('#course/1/0/read');
  await page.locator('[data-action=complete]').click();
  assert.match(await page.locator('[data-action=complete]').innerText(),/已完成/);
  await page.reload();
  assert.match(await page.locator('[data-action=complete]').innerText(),/已完成/);
  await go('#course/1/0/quiz');
  await page.locator('[data-action=answer][data-answer="1"]').click();
  assert.match(await page.locator('.quiz-feedback').innerText(),/回答正确/);
  await go('#course/1/0/note');
  const note='测试笔记：<script>window.bad=true</script>\n颜色不能成为唯一编码。';
  await page.locator('#lesson-note').fill(note);
  await page.reload();
  assert.equal(await page.locator('#lesson-note').inputValue(),note);
  await go('#notes');
  assert.match(await page.locator('.note-card p').innerText(),/颜色不能成为唯一编码/);
  assert.equal(await page.evaluate(()=>window.bad),undefined);
  const mdPromise=page.waitForEvent('download');
  await page.locator('[data-action=export-notes]').click();
  assert.match((await mdPromise).suggestedFilename(),/\.md$/);
  await page.locator('[data-action=delete-note]').click();
  await page.locator('#undo-delete').click();
  assert.equal(await page.locator('.note-card').count(),1);
  await go('#home');
  assert.equal(await page.locator('[data-nav=lab],a[href^="#lab"]').count(),0);
  assert.ok(!(await page.locator('#main').innerText()).includes('交互实验室'));
  await go('#course/1/2/read');
  await page.locator('[data-demo-param=chart]').selectOption('line');
  await page.locator('[data-demo-param=sort]').check();
  await page.locator('[data-action=verify-concept]').first().click();
  assert.equal(await page.locator('.learn-focus:not([hidden])').count(),1);
  const svgPromise=page.waitForEvent('download');
  await page.locator('[data-demo-action=export]').click();
  assert.match((await svgPromise).suggestedFilename(),/\.svg$/);
  await go('#resources');
  const csvPromise=page.waitForEvent('download');
  await page.locator('[data-action=download-data]').click();
  assert.match((await csvPromise).suggestedFilename(),/\.csv$/);
  for(const [c,count] of [[1,5],[2,4],[3,8],[4,5],[5,5]])for(let i=0;i<count;i++)for(const tab of ['read','code','quiz','note']){
    await go(`#course/${c}/${i}/${tab}`);
    assert.equal(await page.locator('#lesson-panel').count(),1,`${c}/${i}/${tab}`);
  }
  for(const p of ['resources','path','glossary','about','bad-route','course/99/0/read'])await go('#'+p);
  await go('#course/3/2/read');
  await page.locator('[role=tab]').first().focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(100);
  assert.match(page.url(),/\/code$/);
  await page.locator('[data-action=theme]').click();
  assert.equal(await page.locator('body.dark').count(),1);
  await page.waitForTimeout(250);
  await page.screenshot({path:'test-results/dark-lesson.png',fullPage:true});
  await page.locator('[data-action=theme]').click();
  await page.setViewportSize({width:390,height:844});
  for(const p of ['home','courses','course/1/2/read','course/3/1/read','course/5/0/read','course/3/2/read','notes','resources','path']){
    await go('#'+p);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'mobile overflow '+p);
  }
  await go('#home');
  await page.screenshot({path:'test-results/mobile-home.png',fullPage:true});
  await page.locator('[data-action=menu]').click();
  assert.equal(await page.locator('.sidebar.open').count(),1);
  await page.locator('.sidebar [data-nav=courses]').click();
  assert.equal(await page.locator('.sidebar.open').count(),0);
  assert.deepEqual(errors,[],'browser exceptions');
  assert.deepEqual(badResponses,[],'failed HTTP responses');
  console.log('PASS: 27 lessons × 4 tabs; integrated theory interactions; no standalone lab; search, bookmarks, quiz, persistent progress/notes, exports, undo, keyboard, theme, mobile layout, console/network.');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
