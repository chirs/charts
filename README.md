# [charts](https://charts.edgemon.org)

Historical data drawn as colored spans over time, with events marked on top.
Vanilla JavaScript, 2D canvas, no dependencies.

Four charts so far:

- **Terror alert levels** — the color-coded Homeland Security Advisory System
  from its creation in March 2002 to its retirement in April 2011, with
  contemporaneous events, military operations, and film releases as toggleable
  layers over the same background.
- **US presidencies by party** — every administration since 1901, colored by
  party, with deaths and resignations in office marked.
- **US recessions** — NBER-dated contractions since 1929, on a time axis that
  lines up with the presidencies chart.
- **Federal minimum wage** — the legislated rate since 1938, colored on a
  sequential ramp rather than categorically, so the flat stretch since July
  2009 reads as one band.

One chart at a time; the fragment selects it
([`#us-recessions`](https://charts.edgemon.org/#us-recessions)), and the nav
and pager both link by slug.

## Adding a chart

Add a file to `www/data/`, then import it in `www/data/index.js`.

```js
export default {
  slug: 'example',
  title: 'An Example',
  description: 'What the chart shows.',
  source: 'https://where-the-data-came-from',
  end: '2026-01-01',

  // Each span runs until the next one starts. The last runs to `end`.
  spans: [
    { start: '2001-09-01', color: '#EFEFEF', label: 'Before' },
    { start: '2002-03-12', color: '#FFFC52', label: 'After' },
  ],

  // Optional. Each layer gets a toggle above the chart.
  layers: [
    { name: 'events', events: [{ date: '2001-09-11', label: 'Something' }] },
  ],
}
```

Two optional fields cover the cases the shape above does not:

- **`start`** widens the range past the first span, for a chart whose events
  begin before its first span does — the minimum wage was signed into law four
  months before the first rate took effect.
- **`ramp: ['#light', '#dark']`** switches a chart from categorical to
  sequential. Spans then carry a numeric `value` instead of a `color`, and the
  color is interpolated across the range of values present. Text contrast is
  picked per span, so labels stay readable at both ends of the ramp.

Dates are ISO strings throughout. `www/tests/data.test.js` checks that every
one is a real date, that spans are sorted, and that events fall inside the
chart's range — see the date rule in `AGENTS.md` for why that last check
earns its keep.

## Development

```
python3 -m http.server -d www    # http://localhost:8000
npm test
```

## Deployment

Served at [charts.edgemon.org](https://charts.edgemon.org) from `www/` by the
homelab playbooks. `make deploy HOST=abby`, or `./deploy.py charts.edgemon.org`
for this site alone.
