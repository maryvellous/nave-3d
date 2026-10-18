import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('valid HTML entry and camera UI',()=>{
 assert.match(html,/<html lang="it">/);
 for(const id of ['scene','loader','sails','oars','rotate','labels','views','fullscreen']){
  assert.match(html,new RegExp('id="'+id+'"'));
 }
 assert.match(html,/OrbitControls/);
 assert.match(html,/24 coppie di remi/);
});
test('inline ES module is syntactically valid',()=>{
 const match=html.match(/<script type="module">([\s\S]*?)<\/script>/);
 assert.ok(match,'missing inline module');
 const dir=mkdtempSync(join(tmpdir(),'galley-test-'));
 try{
  const file=join(dir,'viewer.mjs');writeFileSync(file,match[1]);
  const res=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  assert.equal(res.status,0,res.stderr);
 }finally{rmSync(dir,{recursive:true,force:true})}
});
