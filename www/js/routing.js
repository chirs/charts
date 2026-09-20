// Which chart the URL fragment selects, and what sits either side of it.
// Pure — no DOM, so main.js is the only place that touches location.

export const slugFromHash = (hash) => String(hash || '').replace(/^#/, '');

// An empty or unrecognized fragment falls back to the first chart rather than
// rendering nothing, so a stale link still lands somewhere.
export function chartFor(charts, hash) {
  const slug = slugFromHash(hash);
  return charts.find((chart) => chart.slug === slug) || charts[0];
}

// Wraps, so the collection is a loop rather than a line with dead ends.
export function neighbors(charts, slug) {
  const i = charts.findIndex((chart) => chart.slug === slug);
  if (i === -1) return { prev: charts.at(-1), next: charts[0] };
  return {
    prev: charts[(i - 1 + charts.length) % charts.length],
    next: charts[(i + 1) % charts.length],
  };
}
