// Timeline geometry and canvas drawing.
//
// Everything above draw() is pure: it turns a chart definition into
// coordinates and never touches a canvas. draw() is the only function that
// does, which is what keeps the rest testable under node.

const TICK_STEPS = [1, 2, 5, 10, 25, 50, 100];
const MAX_TICKS = 14;

const EVENT_TOP = 60;
const EVENT_STEP = 28;
const EVENT_BOTTOM_PAD = 48;
const MARKER = 5;

// The one place a date string becomes a Date. The original code wrote dates
// 1-indexed and handed them to a 0-indexed constructor, so every date landed a
// month late; keeping the conversion here means one tested place can get it
// wrong.
export function parseDate(iso) {
  const [year, month, day] = String(iso).split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function sortedSpans(chart) {
  return (chart.spans || []).slice().sort((a, b) => parseDate(a.start) - parseDate(b.start));
}

// A chart normally runs from its first span, but `start` widens it — the
// minimum wage was signed into law four months before the first rate took
// effect, and that event has to have somewhere to sit.
export function bounds(chart) {
  const spans = sortedSpans(chart);
  const start = chart.start ? parseDate(chart.start) : parseDate(spans[0].start);
  return { start, end: parseDate(chart.end) };
}

// Returns date -> x. Dates outside the chart range clamp to its edges.
export function scale(chart, width) {
  const { start, end } = bounds(chart);
  const range = end - start;
  return (date) => Math.round(Math.max(0, Math.min(1, (date - start) / range)) * width);
}

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const toHex = (rgb) => '#' + rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('').toUpperCase();

const mix = (from, to, t) => toHex(channels(from).map((c, i) => c + (channels(to)[i] - c) * t));

// Categorical charts give each span a `color`. Sequential charts give each a
// numeric `value` and the chart a two-stop `ramp`, and the color is
// interpolated across the range of values present.
export function colorFor(chart) {
  if (!chart.ramp) return (span) => span.color;
  const values = chart.spans.map((span) => span.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  // A single distinct value would divide by zero; pin it to the top of the ramp.
  return (span) => (max === min ? chart.ramp[1] : mix(chart.ramp[0], chart.ramp[1], (span.value - min) / (max - min)));
}

// Each span runs to the start of the next one. The original drawRectangle
// filled from each start to the full canvas width and relied on later spans
// painting over it, which broke silently on unsorted input.
export function spanRects(chart, width) {
  const spans = sortedSpans(chart);
  const toX = scale(chart, width);
  const color = colorFor(chart);
  return spans.map((span, i) => {
    const x = toX(parseDate(span.start));
    const next = i + 1 < spans.length ? toX(parseDate(spans[i + 1].start)) : width;
    return { x, w: next - x, color: color(span), label: span.label };
  });
}

// Events are staggered down the canvas in the order given, wrapping back to
// the top when they run out of room.
export function eventPoints(events, toX, height) {
  let y = EVENT_TOP;
  return events.map((event) => {
    if (y > height - EVENT_BOTTOM_PAD) y = EVENT_TOP;
    const point = { x: toX(parseDate(event.date)), y, label: event.label };
    y += EVENT_STEP;
    return point;
  });
}

const tickStep = (years) => TICK_STEPS.find((step) => years / step <= MAX_TICKS) || TICK_STEPS.at(-1);

export function yearTicks(chart, width) {
  const { start, end } = bounds(chart);
  const toX = scale(chart, width);
  const step = tickStep(end.getFullYear() - start.getFullYear());
  const ticks = [];
  for (let year = Math.ceil(start.getFullYear() / step) * step; year <= end.getFullYear(); year += step) {
    const date = new Date(year, 0, 1);
    // scale() clamps, so a tick outside the range would be drawn hard against
    // an edge and read as if it were in range.
    if (date < start || date > end) continue;
    ticks.push({ year, x: toX(date) });
  }
  return ticks;
}

// Height needed to stagger this many events without wrapping.
export function heightFor(eventCount) {
  return Math.max(240, Math.min(720, EVENT_TOP + eventCount * EVENT_STEP + EVENT_BOTTOM_PAD));
}

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 140;
}

export function draw(ctx, chart, events, width, height) {
  const rects = spanRects(chart, width);
  ctx.clearRect(0, 0, width, height);

  for (const rect of rects) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, 0, rect.w, height);
  }

  ctx.font = '11px sans-serif';
  let lastLabel = null;
  for (const rect of rects) {
    if (!rect.label || ctx.measureText(rect.label).width + 8 > rect.w) continue;
    // A run of spans sharing a label (every expansion between recessions)
    // only needs saying once; the color carries the rest.
    if (rect.label === lastLabel) continue;
    lastLabel = rect.label;
    ctx.fillStyle = isDark(rect.color) ? '#FFFFFF' : '#555555';
    ctx.fillText(rect.label, rect.x + 4, height - 26);
  }

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
  for (const tick of yearTicks(chart, width)) {
    ctx.beginPath();
    ctx.moveTo(tick.x + 0.5, 0);
    ctx.lineTo(tick.x + 0.5, height);
    ctx.stroke();
    // The label sits on whatever span it lands on, which on a sequential ramp
    // can be anything from near-white to near-black.
    const under = rects.find((rect) => tick.x >= rect.x && tick.x < rect.x + rect.w);
    ctx.fillStyle = under && isDark(under.color) ? '#FFFFFF' : '#333333';
    ctx.fillText(String(tick.year), tick.x + 3, height - 8);
  }

  ctx.font = 'bold 12px sans-serif';
  for (const point of eventPoints(events, scale(chart, width), height)) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(point.x - MARKER, point.y - MARKER, MARKER * 2, MARKER * 2);

    const textWidth = ctx.measureText(point.label).width;
    let left = point.x + MARKER * 2;
    if (left + textWidth > width) left = point.x - MARKER * 2 - textWidth;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(left - 2, point.y - 8, textWidth + 4, 14);
    ctx.fillStyle = '#000000';
    ctx.fillText(point.label, left, point.y + 3);
  }
}
