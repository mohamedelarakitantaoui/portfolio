import fs from 'node:fs';
import {chromium} from 'playwright';
import {AxeBuilder} from '@axe-core/playwright';
const b=await chromium.launch({channel:'chrome'});const out=[];
for(const [w,h] of [[1920,1080],[1536,730],[1024,768],[768,1024],[390,844],[320,700]]) for(const route of ['/','/fr']) {
const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});const page=await ctx.newPage();await page.goto('http://127.0.0.1:4348'+route+'?effects=off',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
const r=await page.evaluate(()=>{const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right};};return {overflow:document.documentElement.scrollWidth>innerWidth,copy:box('.hero__copy'),portrait:box('.hero__portrait'),hud:box('.hero__hud')};});
const ax=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();out.push({route,w,h,...r,axe:ax.violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>v.id)});
await page.screenshot({path:`qa/out/v5-final/hero-layout/${route==='/'?'home':'fr'}_${w}_static.png`});await ctx.close();
}await b.close();fs.writeFileSync('qa/out/hero-responsive.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out));
