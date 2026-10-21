const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});try{const p=await b.newPage({viewport:{width:1440,height:1050},reducedMotion:'reduce'}),errors=[],found=new Set();p.on('pageerror',e=>errors.push(e.message));const url=process.env.TEST_URL||'http://127.0.0.1:8096/';await p.goto(url);await p.locator('[data-lang-option=en]').click();
 const collect=async()=>{await p.waitForTimeout(15);const items=await p.evaluate(()=>{const all=[],walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(/[\u3400-\u9fff]/.test(n.nodeValue)&&!n.parentElement.closest('script,style,textarea,noscript,[data-i18n-preserve],[data-user-content],.note-card>p'))all.push(n.nodeValue.trim());}for(const el of document.querySelectorAll('[aria-label],[placeholder],[data-demo-tip]'))for(const a of ['aria-label','placeholder','data-demo-tip'])if(/[\u3400-\u9fff]/.test(el.getAttribute(a)||'')&&!el.closest('[data-user-content]'))all.push(el.getAttribute(a));return all;});items.forEach(v=>found.add(v));};
 for(const page of ['home','courses','notes','resources','path','glossary','about','bad-route']){await p.goto(url+'#'+page);await collect();}
 for(const [c,count] of [[1,5],[2,4],[3,8],[4,5],[5,5]])for(let i=0;i<count;i++){
   await p.goto(url+`#course/${c}/${i}/read`);await collect();
   for(let j=0;j<3;j++){await p.locator('[data-action=verify-concept]').nth(j).click();await collect();}
   await p.locator('[data-demo-action=snapshot]').click();await collect();
   const controls=await p.locator('[data-demo-param]').all();
   for(const control of controls){if(await control.isDisabled())continue;const tag=await control.evaluate(e=>e.tagName),type=await control.getAttribute('type');if(tag==='SELECT'){const values=await control.locator('option').evaluateAll(es=>es.map(e=>e.value));for(const value of values){await control.selectOption(value);await collect();}}else if(type==='checkbox'){await control.setChecked(!(await control.isChecked()));await collect();}else if(type==='range'){await control.fill(await control.getAttribute('max'));await collect();}}
   for(const tab of ['code','quiz','note']){await p.goto(url+`#course/${c}/${i}/${tab}`);await collect();if(tab==='quiz'){await p.locator('[data-action=answer]').first().click();await collect();}}
 }
 await p.locator('[data-action=search]').click();await collect();await p.locator('#global-search').fill('zzzzzz');await collect();
 fs.writeFileSync('test-results/i18n-missing.json',JSON.stringify([...found],null,2));console.log(JSON.stringify({untranslated:found.size,errors}));if(found.size||errors.length)process.exitCode=1;
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
