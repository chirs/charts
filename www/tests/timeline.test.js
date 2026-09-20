import assert from 'node:assert';
import { test } from 'node:test';
import { parseDate, scale, spanRects, eventPoints, yearTicks } from '../js/timeline.js';

const chart = {
  end: '2010-01-01',
  spans: [
    { start: '2000-01-01', color: '#FFFFFF', label: 'first' },
    { start: '2005-01-01', color: '#000000', label: 'second' },
  ],
};

test('parseDate reads months 1-indexed', () => {
  const date = parseDate('2001-09-11');
  assert.equal(date.getFullYear(), 2001);
  assert.equal(date.getMonth(), 8);
  assert.equal(date.getDate(), 11);
});

test('scale maps the range onto the width and clamps outside it', () => {
  const toX = scale(chart, 1000);
  assert.equal(toX(parseDate('2000-01-01')), 0);
  assert.equal(toX(parseDate('2010-01-01')), 1000);
  assert.equal(toX(parseDate('1990-01-01')), 0);
  assert.equal(toX(parseDate('2020-01-01')), 1000);
});

test('span rects tile the width with no gaps or overlap', () => {
  const rects = spanRects(chart, 1000);
  assert.equal(rects[0].x, 0);
  assert.equal(rects.at(-1).x + rects.at(-1).w, 1000);
  for (let i = 1; i < rects.length; i++) {
    assert.equal(rects[i].x, rects[i - 1].x + rects[i - 1].w);
  }
});

test('unsorted spans produce the same rects as sorted ones', () => {
  const shuffled = { end: chart.end, spans: chart.spans.slice().reverse() };
  assert.deepEqual(spanRects(shuffled, 1000), spanRects(chart, 1000));
});

test('a span never paints past the start of the next one', () => {
  const rects = spanRects(chart, 1000);
  assert.ok(rects[0].w < 1000, 'first span should stop at the second, not fill the canvas');
});

test('event points step down and wrap when out of room', () => {
  const toX = scale(chart, 1000);
  const events = Array.from({ length: 12 }, (_, i) => ({ date: '2001-01-01', label: `e${i}` }));
  const points = eventPoints(events, toX, 240);
  assert.ok(points[1].y > points[0].y);
  assert.ok(points.some((p, i) => i > 0 && p.y < points[i - 1].y), 'should wrap back to the top');
  assert.ok(points.every((p) => p.y < 240));
});

test('year ticks stay readable and ascend', () => {
  const ticks = yearTicks({ end: '2026-01-01', spans: [{ start: '1901-01-01' }] }, 1000);
  assert.ok(ticks.length > 1 && ticks.length <= 14);
  for (let i = 1; i < ticks.length; i++) {
    assert.ok(ticks[i].year > ticks[i - 1].year);
    assert.ok(ticks[i].x >= ticks[i - 1].x);
  }
});

test('year ticks outside the chart range are dropped, not clamped to the edge', () => {
  // Chart starts in September, so the January tick for its first year is not
  // on the chart and must not be drawn at x = 0.
  const partial = { end: '2011-12-31', spans: [{ start: '2001-09-01' }] };
  const ticks = yearTicks(partial, 1000);
  assert.ok(!ticks.some((t) => t.year === 2001), '2001 is before the chart starts');
  assert.equal(ticks[0].year, 2002);
  assert.ok(ticks.every((t) => t.x > 0));
});
