import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { setTimeout as pause } from 'node:timers/promises';

const server=spawn('python3',['-m','http.server','8877','--bind','127.0.0.1'],{stdio:'ignore'});
let browser;
try{
 await pause(1300);
 browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('http://127.0.0.1:8877',{waitUntil:'networkidle',timeout:60000});
 assert.equal(response?.status(),200);
 await page.locator('#scene canvas').waitFor({timeout:45000});
 await page.waitForFunction(()=>document.querySelector('#loader')?.classList.contains('done'),{timeout:45000});
 const canvas=await page.locator('#scene canvas').boundingBox();
 assert.ok(canvas?.width>100&&canvas?.height>100,'3D renderer not initialized');
 await page.getByRole('button',{name:'Fiancata'}).click();
 await page.getByRole('button',{name:'Remi'}).click();
 assert.equal(await page.locator('#oars').getAttribute('aria-pressed'),'false');
 await page.getByRole('button',{name:'Remi'}).click();
 await page.getByRole('button',{name:'Dettagli'}).click();
 assert.equal(await page.locator('#labels').getAttribute('aria-pressed'),'true');
 mkdirSync('artifacts',{recursive:true});
 await page.screenshot({path:'artifacts/desktop.png',animations:'disabled'});
 await page.setViewportSize({width:390,height:844});
 await page.reload({waitUntil:'networkidle',timeout:60000});
 await page.locator('#scene canvas').waitFor({timeout:45000});
 await page.screenshot({path:'artifacts/mobile.png',animations:'disabled'});
 assert.deepEqual(errors,[],'Browser JavaScript errors');
 console.log('3D viewer: desktop and mobile smoke tests passed; screenshots saved.');
}finally{
 if(browser)await browser.close();
 server.kill();
}
