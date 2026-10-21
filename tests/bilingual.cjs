const {chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
(async()=>{
 const model={window:{}};vm.runInNewContext(fs.readFileSync('lesson-details.js','utf8'),model);
 assert.equal(Object.keys(model.window.LESSON_DETAILS).length,27);
 for(const [key,d] of Object.entries(model.window.LESSON_DETAILS)){for(const field of ['mechanism','derivation','formula','example','boundary','challenge']){assert.ok(d[field].zh.length>20,key+' '+field+' zh');assert.ok(d[field].en.length>40,key+' '+field+' en');}}
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const p=await browser.newPage({viewport:{width:1440,height:1050},reducedMotion:'reduce',acceptDownloads:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));const base=process.env.TEST_URL||'http://127.0.0.1:8096/';
  await p.goto(base+'#course/4/2/read');await p.locator('[data-demo-param=value]').fill('60');await p.locator('[data-demo-action=snapshot]').click();
  await p.locator('[data-demo-param=value]').fill('72');assert.ok(await p.locator('.learn-comparison>div').count()>0);
  await p.locator('[data-lang-option=en]').click();assert.equal(await p.locator('html').getAttribute('lang'),'en');
  assert.equal(await p.locator('[data-demo-param=value]').inputValue(),'72');assert.equal(await p.locator('.learn-snapshot:not([hidden])').count(),1);
  assert.match(await p.locator('#reading-mechanism h2').innerText(),/Core concepts/);
  assert.match(await p.locator('.learn-feedback').innerText(),/How theory explains/);
  await p.locator('.learn-data>summary').click();assert.ok(await p.locator('.learn-data table tbody tr').count()>0);
  const csvPromise=p.waitForEvent('download');await p.locator('[data-demo-action=export-data]').click();assert.match((await csvPromise).suggestedFilename(),/details\.csv$/);
  await p.locator('[data-lang-option=zh]').click();assert.match(await p.locator('.learn-feedback').innerText(),/理论如何解释/);assert.equal(await p.locator('[data-demo-param=value]').inputValue(),'72');
  await p.goto(base+'#course/4/2/note');const writing='我的原文：don’t translate user writing. <script>bad()</script>';await p.locator('#lesson-note').fill(writing);await p.locator('[data-lang-option=en]').click();assert.equal(await p.locator('#lesson-note').inputValue(),writing);
  await p.reload();assert.equal(await p.locator('html').getAttribute('lang'),'en');assert.equal(await p.locator('#lesson-note').inputValue(),writing);
  await p.goto(base+'#course/4/2/read');await p.locator('[data-demo-action=record]').click();await p.goto(base+'#course/4/2/note');assert.match(await p.locator('#lesson-note').inputValue(),/Interactive observation/);
  await p.goto(base+'#home');await p.locator('[data-action=search]').click();await p.locator('#global-search').fill('measurement');assert.ok(await p.locator('.search-result').count()>0);await p.keyboard.press('Escape');
  await p.goto(base+'#courses');await p.locator('[data-action=bookmark][data-id="2"]').click();await p.locator('[data-action=course-filter][data-value=saved]').click();assert.equal(await p.locator('.course-card').count(),1);
  await p.goto(base+'#course/1/0/read');await p.locator('[data-action=complete]').click();assert.match(await p.locator('[data-action=complete]').innerText(),/Learned/);
  for(const width of [320,390,768,1024,1440]){await p.setViewportSize({width,height:950});for(const route of ['home','courses','course/1/0/read','course/3/2/read','course/4/2/read','course/5/1/read','resources','glossary','notes','path']){await p.goto(base+'#'+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'English overflow '+width+' '+route);}}
  await p.setViewportSize({width:1440,height:1050});await p.goto(base+'#course/4/2/read');await p.screenshot({path:'test-results/bilingual-lesson-en.png',fullPage:true});
  await p.locator('[data-lang-option=zh]').click();await p.screenshot({path:'test-results/bilingual-lesson-zh.png',fullPage:true});
  await p.setViewportSize({width:390,height:844});await p.locator('[data-lang-option=en]').click();await p.waitForTimeout(220);await p.screenshot({path:'test-results/bilingual-mobile-en.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: 27 detailed bilingual lessons; language persistence and reversibility; parameter/snapshot/note preservation; bilingual search; live tables and CSV; five responsive widths.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
