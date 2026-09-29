import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const routes = ['index.html', 'services.html', 'projects.html', 'about.html', 'contact.html'];

test('all public routes are generated with core metadata', () => {
  for (const route of routes) {
    const path = `dist/${route}`;
    assert.ok(existsSync(path), `${route} was not generated`);
    const html = readFileSync(path, 'utf8');
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route} must have one H1`);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<link rel="canonical"/);
    assert.doesNotMatch(html, /2340000000000/);
  }
});

test('shared contact data and accessible navigation are present', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /2347030209730/);
  assert.match(html, /\/images\/logo-mark\.png/);
  assert.doesNotMatch(html, /logo\.jpg/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(html, /aria-expanded="false"/);
});

test('contact form supports native submission and accessible status', () => {
  const html = readFileSync('dist/contact.html', 'utf8');
  assert.match(html, /action="https:\/\/formsubmit\.co\/emmnezwatersolution@gmail\.com"/);
  assert.match(html, /name="_honey"/);
  assert.match(html, /role="status"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /title="Map showing the Emmnez Water head office"/);
});

test('fonts and motion enhancement are locally bundled', () => {
  const css = readFileSync('dist/_astro/' + readFileSync('dist/index.html', 'utf8').match(/_astro\/([^"']+\.css)/)[1], 'utf8');
  assert.doesNotMatch(css, /fonts\.googleapis\.com/);
  assert.match(css, /prefers-reduced-motion/);
});
