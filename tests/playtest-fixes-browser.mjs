import {chromium} from '../mobile-playtest/experience/node_modules/playwright/index.mjs';
import {installOfflineSite} from './offline-site.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
  const page=await browser.newPage({viewport:{width:844,height:390},hasTouch:true,isMobile:true}),errors=[];
  await installOfflineSite(page);page.setDefaultTimeout(45000);page.setDefaultNavigationTimeout(180000);
  page.on('pageerror',e=>{errors.push(e.message);console.error(e.message);});
  await page.addInitScript(()=>{
    window.spoken=[];
    speechSynthesis.speak=u=>window.spoken.push({text:u.text,rate:u.rate,pitch:u.pitch,lang:u.lang});
    speechSynthesis.cancel=()=>{};
  });
  const goto=async query=>{
    await page.goto('http://127.0.0.1:8170/mobile-playtest/experience/?diagnostics'+query);
    await page.locator('#start-button:enabled').click({timeout:180000});
  };
  async function jump(){
    const y=await page.evaluate(()=>pithouseDebug.snapshot().camera[1]);
    await page.locator('#mobile-jump').tap();
    await page.waitForFunction(y=>pithouseDebug.snapshot().camera[1]>y+.15,y);
    await page.waitForFunction(()=>pithouseDebug.snapshot().grounded);
    assert.ok(Math.abs((await page.evaluate(()=>pithouseDebug.snapshot().camera[1]))-y)<.15);
  }
  async function menu(){
    await page.locator('#settings-button').tap();
    for(const id of ['settings-resume','settings-voice','settings-help','settings-reset'])assert.equal(await page.locator('#'+id).isVisible(),true);
    const css=await page.locator('#settings-reset').evaluate(e=>({font:getComputedStyle(e).fontSize,height:e.getBoundingClientRect().height}));
    assert.equal(css.font,'16px');assert.ok(css.height>=44);
  }
  console.log('Interior landscape jump, shared settings and voice');
  await goto('');await jump();await menu();await page.locator('#settings-voice').tap();await page.locator('#settings-resume').tap();
  await page.evaluate(()=>pithouseDebug.setPose([.8,1.65,.5],[.8,1.2,2.4]));
  await page.keyboard.press('KeyE');await page.keyboard.press('Enter');
  await page.waitForFunction(()=>spoken.some(s=>s.text.length>30));
  const interiorFont=await page.locator('#dialogue-text').evaluate(e=>getComputedStyle(e).fontSize);
  await page.waitForFunction(()=>!pithouseDebug.snapshot().shotMoving);
  await page.screenshot({path:'test-results/fixed-interior-landscape.jpg',timeout:90000});
  console.log('Exterior eye-to-eye scale at the original shoreline position, jump and narration');
  await goto('&scene=fraser');await jump();
  await page.evaluate(()=>pithouseDebug.setPose([-6,9.455,21],[-6,9.455,23]));
  const exterior=await page.evaluate(()=>pithouseDebug.snapshot());
  assert.ok(Math.abs(exterior.elderEyes-exterior.camera[1])<.15,JSON.stringify(exterior));
  await page.getByRole('button',{name:/✦ Elder/}).tap();await page.keyboard.press('Enter');
  await page.waitForFunction(()=>spoken.some(s=>s.text.includes('dipnet fishing')));
  assert.equal(await page.locator('#dialogue-text').evaluate(e=>getComputedStyle(e).fontSize),interiorFont);
  await page.waitForFunction(()=>!pithouseDebug.snapshot().shotMoving);
  const face=await page.evaluate(async()=>{const pc=await import('playcanvas'),app=pc.Application.getApplication(),head=app.root.findByName('mixamorig:Head'),camera=app.root.findByName('First person camera');return camera.camera.worldToScreen(head.getPosition()).x;});
  assert.ok(face>(await page.locator('#dialogue').boundingBox()).x+440&&face<824,'Elder face must remain beside the dialogue panel');
  await page.screenshot({path:'test-results/fixed-river-elder-landscape.jpg',timeout:90000});
  await menu();await page.locator('#settings-reset').tap({noWaitAfter:true});
  await page.waitForURL('http://127.0.0.1:8170/mobile-playtest/experience/');
  await page.locator('#start-button:enabled').waitFor({timeout:180000});
  assert.equal(await page.locator('#welcome').isVisible(),true);
  console.log('Fishing landscape briefing, shared voice, reachable fish and full journey reset');
  await page.goto('http://127.0.0.1:8170/fishing/');
  await page.waitForFunction(()=>window.fishingGame,null,{timeout:180000});
  await page.evaluate(()=>{const g=fishingGame,e=g.level.elder;g.camera.setPosition(e[0],e[1]+1.65,e[2]+1);g.interact();});
  assert.equal(await page.locator('#modal p').first().evaluate(e=>getComputedStyle(e).fontSize),interiorFont);
  assert.equal(await page.locator('#modal h1').evaluate(e=>getComputedStyle(e).fontSize),'28px');
  await page.waitForFunction(()=>spoken.some(s=>s.text.includes('Listen to the river')));
  await page.waitForFunction(()=>fishingGame.dialoguePan?.time>=1);
  await page.screenshot({path:'test-results/fixed-fishing-briefing-landscape.jpg',timeout:90000});
  await page.getByRole('button',{name:'Continue',exact:true}).tap();
  await page.waitForFunction(()=>spoken.some(s=>s.text.includes('Choose your catch')));
  await page.getByRole('button',{name:'Continue',exact:true}).tap();
  await page.waitForFunction(()=>spoken.some(s=>s.text.includes('A patient scoop')));
  await page.getByRole('button',{name:'Begin the harvest',exact:true}).tap();
  const fish=await page.evaluate(()=>fishingGame.spawn.fish.map(f=>({rest:f.rest,goal:f.restGoal,position:[f.position.x,f.position.z]})));
  assert.equal(fish.length,5);for(const f of fish){assert.ok(f.rest>=5);assert.ok(Math.hypot(f.position[0]-f.goal.anchor.x,f.position[1]-f.goal.anchor.z)<2.5);}
  await menu();assert.equal(await page.locator('#settings-voice').textContent(),'Voice: On');
  await page.screenshot({path:'test-results/fixed-settings-landscape.jpg',timeout:90000});
  await page.evaluate(()=>{sessionStorage.setItem('pithouse-fishing-trip',JSON.stringify({inventory:[{id:'stone'}]}));});
  await page.locator('#settings-reset').tap({noWaitAfter:true});
  await page.waitForURL('http://127.0.0.1:8170/mobile-playtest/experience/');
  await page.locator('#start-button:enabled').waitFor({timeout:180000});
  assert.equal(await page.evaluate(()=>sessionStorage.getItem('pithouse-fishing-trip')),null);
  assert.equal(await page.evaluate(()=>sessionStorage.getItem('pithouse-ladder-trip')),null);
  assert.deepEqual(errors,[]);
  console.log('PASS: mobile landscape eye level, jumps in both scenes, consistent text/menu sizing, shared narration, reachable nearby fish and reset from fishing/exterior.');
}finally{await browser.close();}
