import assert from 'node:assert';
import { test } from 'node:test';
import { slugFromHash, chartFor, neighbors } from '../js/routing.js';

const charts = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }];

test('slugFromHash strips the leading hash', () => {
  assert.equal(slugFromHash('#us-recessions'), 'us-recessions');
  assert.equal(slugFromHash(''), '');
  assert.equal(slugFromHash(undefined), '');
});

test('chartFor selects by slug', () => {
  assert.equal(chartFor(charts, '#b').slug, 'b');
});

test('chartFor falls back to the first chart', () => {
  assert.equal(chartFor(charts, '').slug, 'a');
  assert.equal(chartFor(charts, '#deleted-chart').slug, 'a', 'a stale link should still land somewhere');
});

test('neighbors wrap at both ends', () => {
  assert.equal(neighbors(charts, 'b').prev.slug, 'a');
  assert.equal(neighbors(charts, 'b').next.slug, 'c');
  assert.equal(neighbors(charts, 'a').prev.slug, 'c');
  assert.equal(neighbors(charts, 'c').next.slug, 'a');
});

test('a single-chart collection is its own neighbor', () => {
  const one = [{ slug: 'only' }];
  assert.equal(neighbors(one, 'only').prev.slug, 'only');
  assert.equal(neighbors(one, 'only').next.slug, 'only');
});
