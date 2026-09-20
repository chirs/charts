// Validates every chart in the collection.

import assert from 'node:assert';
import { test } from 'node:test';
import { charts } from '../data/index.js';
import { parseDate, bounds } from '../js/timeline.js';

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const HEX = /^#[0-9A-Fa-f]{6}$/;

const format = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((n, i) => (i ? String(n).padStart(2, '0') : n))
    .join('-');

// A date that does not survive the round trip has overflowed — which is
// exactly what the original data did to new Date(2003, 12, 13).
function assertRealDate(iso, where) {
  assert.match(iso, ISO, `${where}: not an ISO date`);
  assert.equal(format(parseDate(iso)), iso, `${where}: ${iso} is not a real date`);
}

test('the collection is not empty', () => {
  assert.ok(charts.length > 0);
  assert.equal(new Set(charts.map((c) => c.slug)).size, charts.length, 'slugs must be unique');
});

for (const chart of charts) {
  test(`${chart.slug} is well formed`, () => {
    assert.ok(chart.slug && chart.title, 'needs a slug and title');
    assertRealDate(chart.end, `${chart.slug} end`);

    // Categorical charts colour each span directly; sequential charts carry a
    // two-stop ramp and give each span a numeric value instead.
    if (chart.ramp) {
      assert.equal(chart.ramp.length, 2, `${chart.slug}: a ramp is two stops`);
      chart.ramp.forEach((stop, i) => assert.match(stop, HEX, `${chart.slug} ramp stop ${i}: bad color`));
    }

    chart.spans.forEach((span, i) => {
      assertRealDate(span.start, `${chart.slug} span ${i}`);
      if (chart.ramp) {
        assert.equal(typeof span.value, 'number', `${chart.slug} span ${i}: needs a numeric value`);
        assert.ok(Number.isFinite(span.value), `${chart.slug} span ${i}: value is not finite`);
      } else {
        assert.match(span.color, HEX, `${chart.slug} span ${i}: bad color`);
      }
    });

    for (const layer of chart.layers || []) {
      assert.ok(layer.name, `${chart.slug}: layer needs a name`);
      layer.events.forEach((event, i) => {
        assertRealDate(event.date, `${chart.slug}/${layer.name} event ${i}`);
        assert.ok(event.label, `${chart.slug}/${layer.name} event ${i}: needs a label`);
      });
    }
  });

  test(`${chart.slug} spans are sorted and inside the chart range`, () => {
    const starts = chart.spans.map((s) => parseDate(s.start));
    for (let i = 1; i < starts.length; i++) {
      assert.ok(starts[i] > starts[i - 1], `${chart.slug}: span ${i} is out of order`);
    }
    assert.ok(starts.at(-1) < parseDate(chart.end));
  });

  test(`${chart.slug} events fall inside the chart range`, () => {
    const { start, end } = bounds(chart);
    for (const layer of chart.layers || []) {
      for (const event of layer.events) {
        const date = parseDate(event.date);
        assert.ok(date >= start && date <= end, `${chart.slug}: "${event.label}" is off the chart`);
      }
    }
  });
}
