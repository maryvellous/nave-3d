import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { setTimeout as pause } from 'node:timers/promises';

const server=spawn('python3',['-m','http.server','8877','--bind','127.0.0.1'],{stdio:'ignore'});
let browser;
try{
 await pause(1400);
 browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('http://127.0.0.1:8877',{waitUntil:'domcontentloaded',timeout:45000});
 assert.equal(response?.status(),200);
 await page.locator('#viewport canvas').waitFor({timeout:30000});
 await page.locator('#status').waitFor({state:'detached',timeout:120000});
 await page.locator('#reset').click();
 const canvas=await page.locator('#viewport canvas').boundingBox();
 assert.ok(canvas?.width>100&&canvas?.height>100,'3D viewer did not initialize');
 mkdirSync('artifacts',{recursive:true});
 await page.screenshot({path:'artifacts/desktop.png',animations:'disabled'});
 await page.setViewportSize({width:390,height:844});
 await pause(700);
 await page.screenshot({path:'artifacts/mobile.png',animations:'disabled'});
 assert.deepEqual(errors,[],'browser JavaScript errors');
 console.log('Galleon loaded; desktop and mobile screenshots saved');
}finally{
 if(browser)await browser.close();
 server.kill();
}
