import {installOfflineSite} from './offline-site.mjs';
import { chromium } from '../mobile-playtest/experience/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const origin=process.env.PITHOUSE_URL||'http://127.0.0.1:8170/';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
await mkdir('test-results',{recursive:true});
try {
  const page=await browser.newPage({viewport:{width:1100,height:760}}),errors=[],badResponses=[];
  if(process.env.PITHOUSE_OFFLINE)await installOfflineSite(page);
  page.setDefaultTimeout(30000);page.setDefaultNavigationTimeout(180000);
  page.on('pageerror',e=>{errors.push(e.message);console.error('PAGE ERROR',e.message);});
  page.on('console',m=>{if(m.type()==='error')console.error('Browser:',m.text());});
  page.on('response',response=>{if(response.status()>=400){badResponses.push(response.url());console.error('HTTP',response.status(),response.url());}});
  async function ready(){
    await page.waitForFunction(()=>window.pithouseDebug||!document.querySelector('#fatal')?.hidden,null,{timeout:180000});
    assert.equal(await page.locator('#fatal').isVisible(),false,await page.locator('#fatal').textContent());
  }
  async function pose(position,target){await page.evaluate(({position,target})=>pithouseDebug.setPose(position,target),{position,target});}
  async function reveal(){await page.keyboard.press('Enter');await page.waitForTimeout(1100);}
  console.log('Interior startup and elder');
  await page.goto(new URL('experience/?diagnostics',origin).href);
  await ready();await page.locator('#start-button').click();
  assert.equal(await page.locator('#dialogue').isVisible(),false);
  assert.equal(await page.evaluate(()=>pithouseDebug.snapshot().scene),'pithouse');
  await pose([.8,1.65,.5],[.8,1.2,2.4]);await page.keyboard.press('KeyE');
  await page.waitForFunction(()=>pithouseDebug.snapshot().animation==='Talk');
  await reveal();await page.keyboard.press('Escape');await page.waitForTimeout(1000);
  console.log('Collect study stone and cross ladder');
  await pose([-1,1.65,1.5],[-1,.3,2.7]);
  await page.keyboard.press('KeyE');
  await page.getByRole('button',{name:'Take item',exact:true}).click();
  assert.equal(await page.evaluate(()=>pithouseDebug.snapshot().inventory.length),1);
  await pose([-.35,1.7,3.25],[.45,1.65,3.55]);
  await page.keyboard.press('KeyE');
  await page.getByRole('button',{name:'Climb to Fraser River',exact:true}).click({noWaitAfter:true});
  await page.waitForURL(/scene=fraser/);await ready();
  await page.waitForFunction(()=>document.body.classList.contains('started'));
  assert.equal(await page.evaluate(()=>pithouseDebug.snapshot().inventory.length),1);
  assert.equal(await page.getByRole('button',{name:/✦ Elder/}).isVisible(),false);
  console.log('River elder invitation and decline');
  await pose([-6,9.4,21],[-6,8.35,23]);
  assert.equal(await page.locator('#dialogue').isVisible(),false);
  await page.getByRole('button',{name:/✦ Elder/}).click();await reveal();
  assert.match(await page.locator('#dialogue-text').textContent(),/dipnet fishing/);
  await page.screenshot({path:'test-results/river-elder-invitation.jpg',timeout:90000});
  await page.getByRole('button',{name:/Not yet/}).click();
  assert.equal(await page.locator('#dialogue').isVisible(),false);
  await page.waitForTimeout(1000);
  await page.getByRole('button',{name:/✦ Elder/}).click();await reveal();
  await page.getByRole('button',{name:/Yes, teach me/}).click({noWaitAfter:true});
  await page.waitForURL(/\/fishing\//);
  await page.waitForFunction(()=>window.fishingGame,null,{timeout:180000});
  assert.equal(await page.evaluate(()=>fishingGame.state.state),'EXPLORE');
  assert.equal(await page.locator('#modal').isVisible(),false);
  async function brief(){
    await page.evaluate(()=>{const g=fishingGame,e=g.level.elder;g.pointerFallback=true;g.camera.setPosition(e[0],e[1]+1.65,e[2]+1);g.motion.offset=0;g.interact();});
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    await page.getByRole('button',{name:'Begin the harvest',exact:true}).click();
    await page.evaluate(()=>{fishingGame.readyTime=.01;});
    await page.waitForFunction(()=>fishingGame.state.state==='PLAYING',null,{timeout:120000});
  }
  async function endRound(passed){
    // Accelerate the clock; physics/scoring have separate real-controller tests.
    await page.evaluate(passed=>{const g=fishingGame;if(passed){for(let i=0;i<5;i++)g.score.catch({id:'chinook',points:250});}g.state.time=.01;},passed);
    await page.waitForFunction(()=>fishingGame.state.state==='RETURN');
    await page.evaluate(()=>{const g=fishingGame,e=g.level.elder;g.camera.setPosition(e[0],e[1]+1.65,e[2]+1);g.interact();});
    await page.waitForFunction(()=>fishingGame.state.state==='SUMMARY');
    assert.equal(await page.locator('#return-pithouse').isVisible(),true);
    assert.equal(await page.locator('#reset-experience').isVisible(),true);
  }
  console.log('Fishing briefing, completion, and full reset');
  await brief();await endRound(false);
  await page.getByRole('button',{name:'Reset fishing experience',exact:true}).click();
  assert.equal(await page.evaluate(()=>fishingGame.state.state),'EXPLORE');
  assert.equal(await page.evaluate(()=>fishingGame.score.score),0);
  assert.equal(await page.evaluate(()=>fishingGame.state.time),60);
  await brief();await endRound(true);
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'test-results/fishing-summary-portrait.jpg',timeout:90000});
  await page.setViewportSize({width:1100,height:760});
  await page.screenshot({path:'test-results/fishing-summary.jpg',timeout:90000});
  console.log('Return to interior with inventory and elder progress');
  await page.getByRole('button',{name:'Return to the pithouse',exact:true}).click({noWaitAfter:true});
  await page.waitForURL(/\/mobile-playtest\/experience\/$/);
  await page.waitForFunction(()=>document.body.classList.contains('started'),null,{timeout:180000});
  assert.match(await page.locator('#collection').textContent(),/1 item/);
  assert.equal(await page.locator('#dialogue').isVisible(),false);
  await page.screenshot({path:'test-results/returned-interior.jpg',timeout:90000});
  assert.deepEqual(errors,[]);
  assert.deepEqual(badResponses,[]);
  console.log('PASS: interior → ladder → river elder (decline/accept) → fishing → reset → completed round → interior; inventory preserved, no page errors.');
  console.log('Touch portrait summary and reset');
  const mobile=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1});
  if(process.env.PITHOUSE_OFFLINE)await installOfflineSite(mobile);
  mobile.on('pageerror',e=>errors.push(e.message));
  await mobile.goto(new URL('fishing/',origin).href);
  await mobile.waitForFunction(()=>window.fishingGame,null,{timeout:180000});
  await mobile.evaluate(()=>{const g=fishingGame;g.state.set('SUMMARY');g.summaryResult=g.score.result();g.resume();});
  assert.equal(await mobile.locator('body').evaluate(b=>b.classList.contains('touch-mode')),true);
  await mobile.locator('#return-pithouse').scrollIntoViewIfNeeded();
  const box=await mobile.locator('#return-pithouse').boundingBox();
  assert.ok(box.x>=0&&box.x+box.width<=390&&box.y>=0&&box.y+box.height<=844);
  await mobile.screenshot({path:'test-results/fishing-touch-summary.jpg',timeout:90000});
  await mobile.locator('#reset-experience').click();
  assert.equal(await mobile.evaluate(()=>fishingGame.state.state),'EXPLORE');
  await mobile.locator('#settings-button').click();
  assert.equal(await mobile.locator('#settings-return').isVisible(),true);
  assert.deepEqual(errors,[]);
  console.log('PASS: touch portrait results, reset, and pause-menu return option.');
} finally {await browser.close();}
