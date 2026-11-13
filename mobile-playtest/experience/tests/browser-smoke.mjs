import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { fixtureGlb } from './fixture-glb.mjs';
const fixture=process.argv.includes('--fixture');
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
  const page=await browser.newPage({viewport:{width:1280,height:800}}),errors=[];
  page.setDefaultTimeout(30000);
  page.on('pageerror',e=>{errors.push(e.message);console.error(e.message);});
  page.on('console',m=>{if(m.type()==='error')console.error(m.text());});
  // Same pinned engine as production, locally served for reproducible CDN-independent tests.
  await page.route('https://cdn.jsdelivr.net/npm/playcanvas@2.24.0/+esm',route=>route.fulfill({path:fileURLToPath(new URL('../node_modules/playcanvas/build/playcanvas.dbg.mjs',import.meta.url)),contentType:'text/javascript'}));
  if(fixture)await page.route('**/assets/elder.glb',route=>route.fulfill({body:fixtureGlb(),contentType:'model/gltf-binary'}));
  console.log('Loading '+(fixture?'synthetic fixture':'original asset'));
  await page.goto((process.env.PITHOUSE_URL||'http://localhost:8000/experience/')+'?diagnostics'+(fixture&&!process.argv.includes('--with-splat')?'&splat=off':''));
  await page.waitForFunction(()=>!document.querySelector('#start-button').disabled||!document.querySelector('#fatal').hidden,null,{timeout:120000});
  assert.equal(await page.locator('#fatal').isVisible(),false,await page.locator('#fatal').textContent());
  console.log('Starting experience');
  await page.locator('#start-button').click();
  async function mode(expected) {
    console.log('Expecting '+expected);
    await page.waitForFunction(value=>window.pithouseDebug.snapshot().animation===value && window.pithouseDebug.snapshot().activeState===value,expected,{timeout:30000});
    const data=await page.evaluate(()=>window.pithouseDebug.snapshot());
    assert.ok(Number.isFinite(data.animationTime));
    for(const mesh of data.meshes){
      assert.equal(mesh.depthWrite,true);assert.equal(mesh.alphaTest,.1);assert.equal(mesh.cull,true);
      assert.ok([...mesh.center,...mesh.halfExtents].every(Number.isFinite));
    }
  }
  await mode('Idle');
  // Move the actual first-person camera into interaction range; interact via UI.
  await page.evaluate(async()=>{
    const pc=await import('playcanvas');const camera=pc.Application.getApplication().root.findByName('First person camera');
    const scene=await (await fetch('./data/pithouse-scene.json')).json();
    const [x,y,z]=scene.characters.find(n=>n.id==='elder').position;
    camera.setPosition(x,y+1.65,z-1.9);camera.lookAt(x,y+1.2,z);
  });
  await page.keyboard.press('KeyE');
  await mode('Talk');
  await page.keyboard.press('Enter');
  await page.getByRole('button',{name:/How did people keep warm/}).dispatchEvent('click');
  await mode('Talk');await page.keyboard.press('Enter');
  await page.getByRole('button',{name:/Tell me more about warmth/}).dispatchEvent('click');
  await mode('FireWork');await page.keyboard.press('Escape');await mode('Idle');
  await page.waitForTimeout(800);
  // Inspect a genuine legacy annotation after Working; stale topic must not leak.
  await page.evaluate(async()=>{
    const pc=await import('playcanvas');const camera=pc.Application.getApplication().root.findByName('First person camera');
    const settings=await (await fetch('../settings.json')).json(),p=settings.annotations[0].position;
    camera.setPosition(p[0],p[1],p[2]-1);camera.lookAt(...p);
  });
  await page.keyboard.press('KeyE');
  assert.equal(await page.locator('#dialogue').isVisible(),true);
  assert.notEqual(await page.locator('#speaker').textContent(),'Elder');
  await mode('Idle');
  await page.keyboard.press('Escape');await mode('Idle');
  assert.deepEqual(errors,[]);
  console.log(fixture?'PASS: synthetic fixture integration only; original Elder visual acceptance NOT tested.':'PASS: original asset browser smoke; visual/physical acceptance still requires camera comparisons.');
} finally {await browser.close();}
