import fs from 'node:fs';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
fs.mkdirSync('qa/out/compact-nav',{recursive:true});
const browser=await chromium.launch({channel:'chrome'});const result=[];
for(const [w,lang] of [[1920,'en'],[1024,'fr'],[390,'en'],[320,'fr']]) {
const ctx=await browser.newContext({viewport:{width:w,height:844}});const page=await ctx.newPage();await page.goto('http://127.0.0.1:4352/'+(lang==='fr'?'fr/':''),{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500);
if(w>=1024){await page.locator('.site-nav a').first().hover();await page.waitForTimeout(400);}
await page.screenshot({path:`qa/out/compact-nav/${lang}-${w}.png`});
const axe=await new AxeBuilder({page}).include('#site-header').analyze();result.push({w,lang,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),axe:axe.violations.map(v=>v.id)});await ctx.close();
}
for(const mode of ['normal','off','reduce']) {
const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:mode==='reduce'?'reduce':'no-preference'});const page=await ctx.newPage();await page.goto('http://127.0.0.1:4352/'+(mode==='off'?'?effects=off':''),{waitUntil:'networkidle'});await page.waitForTimeout(500);await page.locator('#site-header .hire').hover();await page.waitForTimeout(400);result.push({mode,buttonTransform:await page.locator('#site-header .hire').evaluate(e=>getComputedStyle(e).transform)});await ctx.close();
}
await browser.close();fs.writeFileSync('qa/out/compact-nav/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
