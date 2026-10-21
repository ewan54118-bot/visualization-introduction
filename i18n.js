/* Local, authored localization. Domain identifiers, code identifiers and user
 * writing stay untouched; visible text and accessibility labels are localized.
 * The source/output cache makes switching reversible without rebuilding demos.
 */
window.I18n=(()=>{
 const exact=new Map(),patterns=[],missing=new Set(),cache=new WeakMap(),attrs=new WeakMap();
 let language='zh';try{const s=JSON.parse(localStorage.getItem('vis-lab-learning-v1')||'{}');language=s.language==='en'?'en':'zh';}catch{}
 let fragments=[],dirty=true,observer;
 const han=/[\u3400-\u9fff]/;
 function add(zh,en){if(typeof zh==='string'&&typeof en==='string'&&zh!==en){exact.set(zh,en);dirty=true;}}
 function pairs(list){for(const [zh,en] of list)add(zh,en);}
 function register(obj){if(!obj||typeof obj!=='object')return;if(typeof obj.zh==='string'&&typeof obj.en==='string'){add(obj.zh,obj.en);return;}for(const value of Object.values(obj))if(value&&typeof value==='object')register(value);}
 function pattern(regex,en){patterns.push([regex,en]);}
 function english(source,depth=0){
  if(typeof source!=='string'||!han.test(source)||depth>5)return source;
  if(exact.has(source))return exact.get(source);
  const trim=source.trim();if(exact.has(trim))return source.replace(trim,exact.get(trim));
  for(const [re,replacement] of patterns){re.lastIndex=0;const m=re.exec(source);if(m&&m[0]===source)return typeof replacement==='function'?replacement(m):replacement.replace(/\$(\d+)/g,(_,n)=>english(m[Number(n)],depth+1));}
  if(dirty){fragments=Array.from(exact).filter(([s])=>s.length>1&&han.test(s)).sort((a,b)=>b[0].length-a[0].length);dirty=false;}
  let output=source;for(const [zh,en] of fragments)if(output.includes(zh))output=output.split(zh).join(en);
  output=output.replace(/([\d.]+)\s*分/g,'$1 points').replace(/(\d+)\s*天/g,'$1 days').replace(/(\d+)\s*月/g,'$1 months').replace(/(\d+)\s*条记录/g,'$1 records').replace(/(\d+)\s*条/g,'$1 records').replace(/(\d+)\s*次/g,'$1 visits').replace(/(\d+)\s*人/g,'$1 people').replace(/(\d+)\s*分/g,'$1 points');
  output=output.replace(/完成\s*(\d+)\s*节/g,'$1 lessons learned').replace(/(^|[\s：:·→])([是否无])(?=$|[\s·，])/g,(_,prefix,word)=>prefix+({是:'Yes',否:'No',无:'None'}[word])).replace(/，/g,', ').replace(/：/g,': ').replace(/；/g,'; ');
  if(han.test(output))missing.add(source);
  return output;
 }
 const protectedNode=el=>el?.closest('script,style,textarea,input,[data-user-content],[data-i18n-preserve],.note-card>p');
 function textNode(node){if(!node.parentElement||protectedNode(node.parentElement))return;const old=cache.get(node);const source=old&&node.nodeValue===old.output?old.source:node.nodeValue;const output=language==='en'?english(source):source;if(node.nodeValue!==output)node.nodeValue=output;cache.set(node,{source,output});}
 function apply(root=document.body){if(!root)return;const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walk.nextNode())textNode(node);if(root.nodeType===Node.TEXT_NODE)textNode(root);const els=root.nodeType===1?[root,...root.querySelectorAll('[title],[aria-label],[placeholder],[data-demo-tip]')]:[];for(const el of els){if(el.closest('[data-user-content]'))continue;let records=attrs.get(el);if(!records){records={};attrs.set(el,records);}for(const name of ['title','aria-label','placeholder','data-demo-tip']){if(!el.hasAttribute(name))continue;const value=el.getAttribute(name),old=records[name],source=old&&old.output===value?old.source:value,output=language==='en'?english(source):source;if(value!==output)el.setAttribute(name,output);records[name]={source,output};}}
 }
 function observe(){observer?.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder','data-demo-tip']});}
 function refresh(root=document.body){observer?.disconnect();apply(root);document.documentElement.lang=language==='en'?'en':'zh-CN';const title=document.querySelector('title');if(title)textNode(title.firstChild);document.querySelectorAll('[data-lang-option]').forEach(el=>{const active=el.dataset.langOption===language;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});observe();}
 function metadata(){const el=document.querySelector('meta[name="description"]');if(!el)return;const value=el.content,old=attrs.get(el)?.content,source=old&&old.output===value?old.source:value,output=language==='en'?english(source):source;el.content=output;attrs.set(el,{content:{source,output}});}
 function setLanguage(value){language=value==='en'?'en':'zh';missing.clear();refresh();metadata();document.dispatchEvent(new CustomEvent('languagechange',{detail:language}));}
 function start(){observer=new MutationObserver(records=>{observer.disconnect();const roots=new Set();for(const record of records){const root=record.type==='characterData'?record.target.parentElement:record.target;if(root&&document.body.contains(root))roots.add(root);}for(const root of roots)apply(root);observe();});refresh();metadata();}
 return {get language(){return language;},get locale(){return language==='en'?'en-US':'zh-CN';},english,t:s=>language==='en'?english(s):s,add,pairs,pattern,register,refresh,setLanguage,start,missing,sourceAttribute:(el,name)=>attrs.get(el)?.[name]?.source||el.getAttribute(name)};
})();
