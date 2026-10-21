/* Run with the site's local HTTP server, Playwright and installed Chrome.
 * TEST_URL overrides http://127.0.0.1:8094/.
 */
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

async function main(){
  // Check computations independently of the DOM (not only whether an SVG exists).
  const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('theory-connections.js','utf8'),sandbox);
  vm.runInNewContext(fs.readFileSync('learning-demos.js','utf8'),sandbox);
  const {algorithms:a,renderers:r,specs}=sandbox.window.LearningDemos;
  assert.equal(specs.length,27);assert.equal(Object.keys(sandbox.window.THEORY_CONNECTIONS).length,27);assert.equal(Object.values(sandbox.window.THEORY_CONNECTIONS).reduce((n,a)=>n+a.length,0),81);
  assert.equal(new Set(specs.map(s=>s.key)).size,27);
  assert.ok(a.labRGB(100,0,0).every(v=>Math.abs(v-1)<.001),'Lab white conversion');
  assert.ok(a.labRGB(0,0,0).every(v=>Math.abs(v)<.001),'Lab black conversion');
  assert.equal(a.inGamut(a.labRGB(60,200,200)),false,'gamut detection');
  assert.ok(Math.abs(a.luminance([1,1,1])-1)<.00001);
  assert.equal(a.luminance([0,0,0]),0);
  const low=a.march(30,30),high=a.march(30,80),none=a.march(30,200);
  assert.equal(none.length,0,'no contour above field maximum');
  for(const segments of [low,high]){
    assert.ok(segments.length>0);
    for(const segment of segments)for(const [x,y] of segment)assert.ok(x>=0&&x<=1&&y>=0&&y<=1);
  }
  const base=r.axis({baseline:0,scale:'linear'}),truncated=r.axis({baseline:70,scale:'linear'});
  assert.equal(base.metrics[1].value,'1.13');
  assert.equal(truncated.metrics[1].value,'2');
  const daily=r.time({window:1,start:0,end:83,cursor:45}),weekly=r.time({window:7,start:0,end:83,cursor:45});
  assert.equal(daily.metrics[2].value,'84');
  assert.equal(weekly.metrics[2].value,'12');
  const expected=JSON.parse(JSON.stringify(r.aspect({height:560}).metrics));
  assert.equal(expected[1].value,'45°','banking button must actually produce 45 degrees');

  const b=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try{
    const p=await b.newPage({viewport:{width:1440,height:1050},acceptDownloads:true,reducedMotion:'reduce'});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    const url=process.env.TEST_URL||'http://127.0.0.1:8094/';
    const go=async key=>{const [c,i]=key.split('-');await p.goto(url+`#course/${c}/${i}/read`);await p.locator('.learn-plot svg').waitFor();};
    fs.mkdirSync('test-results',{recursive:true});
    for(const s of specs){
      await go(s.key);
      assert.equal(await p.locator('.learn-demo').count(),1,s.key);
      for(let j=0;j<3;j++){await p.locator('[data-action=verify-concept]').nth(j).click();assert.equal(await p.locator('.learn-focus:not([hidden])').count(),1);assert.equal(await p.locator('.learn-plot svg').evaluate(el=>/NaN|undefined|Infinity/.test(el.outerHTML)),false,'concept '+s.key+'-'+j);}
      await p.locator('[data-demo-action=preset]').click();
      const bad=await p.locator('.learn-plot svg').evaluate(el=>/NaN|undefined|Infinity/.test(el.outerHTML));
      assert.equal(bad,false,'invalid geometry '+s.key);
      await p.locator('[data-demo-action=snapshot]').click();
      assert.equal(await p.locator('.learn-snapshot:not([hidden]) svg').count(),1);
      await p.locator('[data-demo-action=reset]').click();
      for(const control of s.controls){
        const el=p.locator(`[data-demo-param="${control.name}"]`);
        if(await el.isDisabled())continue;
        if(control.type==='range')await el.fill(String(control.max));
        if(control.type==='select')await el.selectOption(String(control.options.at(-1)[0]));
        if(control.type==='checkbox')await el.setChecked(!s.defaults[control.name]);
      }
      assert.equal(await p.locator('.learn-plot svg').evaluate(el=>/NaN|undefined|Infinity/.test(el.outerHTML)),false,'control limits '+s.key);
    }
    console.log('PASS: 27 integrated lessons, 81 theory-linked scenarios, task presets, control limits and snapshots.');
    await go('1-4');
    await p.locator('[data-demo-action=reset]').click();
    await p.locator('[data-demo-action=step]').click();
    assert.match(await p.locator('.learn-feedback').innerText(),/1 个 Enter、2 个 Update、1 个 Exit/);
    await p.locator('[data-demo-param=key]').selectOption('index');
    assert.match(await p.locator('.learn-feedback').innerText(),/0 个 Enter、3 个 Update、0 个 Exit/);
    await p.locator('[data-demo-action=play]').click();
    assert.equal(await p.locator('[data-demo-action=play]').getAttribute('aria-pressed'),'true');
    await p.locator('[data-demo-action=play]').click();
    assert.equal(await p.locator('[data-demo-action=play]').getAttribute('aria-pressed'),'false');
    await go('2-2');
    const node=p.locator('[data-node="信息学院"]');
    const before=await p.locator('.demo-tree-node').count();
    await node.click();
    assert.ok(await p.locator('.demo-tree-node').count()<before);
    await go('2-3');
    await p.locator('[data-demo-action=reset]').click();
    await p.locator('[data-demo-action=fire-event]').click();
    assert.match(await p.locator('.learn-feedback').innerText(),/父级捕获、目标与父级冒泡/);
    await p.locator('[data-demo-param=stop]').check();
    await p.locator('[data-demo-action=fire-event]').click();
    assert.match(await p.locator('.learn-feedback').innerText(),/父级委托监听未执行/);
    assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('vis-lab-learning-v1')).experiments['2-3'].trace),['父级捕获','目标']);
    await go('4-2');await p.locator('[data-demo-action=reset]').click();
    await p.locator('[data-demo-drag="2"]').focus();
    await p.keyboard.press('ArrowUp');
    assert.equal(await p.locator('[data-demo-drag="2"]').getAttribute('aria-valuenow'),'39');
    const point=await p.locator('[data-demo-drag="2"]').boundingBox();
    await p.mouse.move(point.x+point.width/2,point.y+point.height/2);
    await p.mouse.down();await p.mouse.move(point.x+point.width/2,point.y-35,{steps:5});await p.mouse.up();
    const value=await p.locator('[data-demo-drag="2"]').getAttribute('aria-valuenow');
    assert.ok(Number(value)>39,'point dragging changes observation');
    await p.reload();
    assert.equal(await p.locator('[data-demo-drag="2"]').getAttribute('aria-valuenow'),value,'experiment state persists');
    await p.locator('[data-demo-action=record]').click();
    await p.goto(url+'#course/4/2/note');
    assert.match(await p.locator('#lesson-note').inputValue(),/交互观察/);
    await go('5-1');
    await p.locator('[data-demo-brush]').scrollIntoViewIfNeeded();
    const brush=await p.locator('[data-demo-brush]').boundingBox();
    await p.mouse.move(brush.x+brush.width*.35,brush.y+brush.height/2);
    await p.mouse.down();await p.mouse.move(brush.x+brush.width*.65,brush.y+brush.height/2,{steps:8});await p.mouse.up();
    assert.ok(Number(await p.locator('[data-demo-param=start]').inputValue())>0);
    assert.ok(Number(await p.locator('[data-demo-param=end]').inputValue())<83);
    await go('5-2');await p.locator('[data-demo-action=reset]').click();await p.locator('[data-demo-day="12"]').click();
    assert.equal(await p.locator('[data-demo-param=selected]').inputValue(),'12');
    await go('4-4');await p.locator('[data-demo-action=preset]').click();
    await p.locator('.learn-demo').screenshot({path:'test-results/embedded-contours.png'});
    await p.locator('[data-action=theme]').click();await p.waitForTimeout(200);
    await p.locator('.learn-demo').screenshot({path:'test-results/embedded-dark.png'});
    await p.locator('[data-action=theme]').click();
    await go('4-2');await p.screenshot({path:'test-results/interactive-lesson-desktop.png',fullPage:true});
    for(const width of [320,390,768,1024]){
      await p.setViewportSize({width,height:900});
      for(const key of ['1-4','2-2','3-2','4-2','4-4','5-1','5-3','5-4']){
        await go(key);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'overflow '+width+' '+key);
      }
    }
    await p.setViewportSize({width:390,height:844});await go('3-2');await p.waitForTimeout(250);
    await p.screenshot({path:'test-results/interactive-lesson-mobile.png',fullPage:true});
    await p.goto(url+'#home');assert.equal(await p.locator('[data-nav=lab],a[href^="#lab"]').count(),0);
    await p.goto(url+'#lab/encoding');await p.waitForURL('**/#course/1/2/read');await p.locator('.learn-demo').waitFor();
    assert.deepEqual(errors,[],'browser exceptions');
    console.log('PASS: 27 embedded demos, task presets, all control limits, A/B snapshots, actual event propagation, tree folding, drag/keyboard, brush, persistent parameters, observation notes, dark/mobile layouts; numerical checks for Lab, contours, axis and aggregation.');
  }finally{await b.close();}
}
main().catch(e=>{console.error(e);process.exit(1);});
