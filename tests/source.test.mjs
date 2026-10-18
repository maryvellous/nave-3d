import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('high-detail ship model replaces the small stylized galleon', () => {
 assert.match(html, /<html lang="it">/);
 assert.match(html, /pinnace\.glb/);
 assert.match(html, /GLTFLoader/);
 assert.match(html, /OrbitControls/);
 assert.match(html, /id="reset"/);
 assert.match(html, /Creative Commons Zero/);
 assert.match(html, /function focusPoint/);
 assert.match(html, /function recalculateHome/);
 assert.match(html, /Ship Pinnace/);
 assert.doesNotMatch(html, /broadenHullSilhouette|furnishExistingDeck|galleon\.glb|R-LAB/);
 assert.doesNotMatch(html, /makeHull\(\)|makeRowingDeck\(\)|24 coppie di remi/);
 assert.doesNotMatch(html, /id="views"|id="sails"|id="oars"|id="rotate"|id="labels"/);
});

test('inline ES module has valid JavaScript syntax', () => {
 const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
 assert.ok(match, 'missing inline ES module');
 const dir = mkdtempSync(join(tmpdir(), 'nave-3d-test-'));
 try {
  const file = join(dir, 'viewer.mjs');
  writeFileSync(file, match[1]);
  const res = spawnSync(process.execPath, ['--check', file], { encoding:'utf8' });
  assert.equal(res.status, 0, res.stderr);
 } finally {
  rmSync(dir, { recursive:true, force:true });
 }
});
