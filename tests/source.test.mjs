import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('minimal galley replacement and interactive controls',()=>{
 assert.match(html,/<html lang="it">/);
 assert.match(html,/galleon\.glb/);
 assert.match(html,/GLTFLoader/);
 assert.match(html,/OrbitControls/);
 assert.match(html,/id="reset"/);
 assert.match(html,/CC BY 4\.0/);
 assert.doesNotMatch(html,/makeHull\(\)|makeRowingDeck\(\)|24 coppie di remi/);
 assert.doesNotMatch(html,/id="views"|id="sails"|id="oars"|id="rotate"|id="labels"/);
});
test('inline ES module is syntactically valid',()=>{
 const match=html.match(/<script type="module">([\s\S]*?)<\/script>/);
 assert.ok(match,'missing inline module');
 const dir=mkdtempSync(join(tmpdir(),'galleon-test-'));
 try{
  const file=join(dir,'viewer.mjs');writeFileSync(file,match[1]);
  const res=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  assert.equal(res.status,0,res.stderr);
 }finally{rmSync(dir,{recursive:true,force:true})}
});
