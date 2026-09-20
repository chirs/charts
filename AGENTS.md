# AGENTS.md

Static site served from `www/`. Vanilla JS ES modules, 2D canvas, no build
step, no dependencies. Deployed to charts.edgemon.org by the homelab
playbooks, which clone the repo and serve `www/` as the document root.

## Development

- Run locally: `python3 -m http.server -d www`
- Tests: `npm test` (Node's built-in runner). `www/tests/timeline.test.js`
  covers the geometry; `www/tests/data.test.js` validates every dataset.
  Rendering is not tested.

## Architecture

- `www/js/timeline.js` — everything above `draw()` is pure: it turns a chart
  definition into coordinates and never touches a canvas. `draw()` is the only
  function that does, which is what keeps the rest testable under node. Do not
  reach for a canvas above that line.
- `www/js/routing.js` — pure: which chart a fragment selects and what sits
  either side of it. No DOM, so it is tested directly.
- `www/js/gallery.js` — all the DOM: nav, one chart's section, pager. Owns the
  layer toggle state.
- `www/js/main.js` — entry point. The only place that touches `location`;
  re-renders on `hashchange`.
- `www/data/*.js` — one chart per file, default-exporting the chart object.
  `www/data/index.js` is the collection; a chart is not live until it is
  imported there, and its order there is the order of the nav and of
  prev/next.

## Color

Charts are categorical (each span carries a `color`) or sequential (the chart
carries a two-stop `ramp` and each span a numeric `value`, interpolated across
the range present). `colorFor` resolves either into the color `spanRects`
reports, so nothing downstream needs to know which kind it is.

Never hardcode a text color over a span. A sequential ramp runs from
near-white to near-black, so span labels and year ticks both pick contrast
from the color actually underneath them — that is what `isDark` is for, and
dropping it makes the dark end of a ramp unreadable.

## Spans cannot overlap

The model is a strict step function: one span at a time, each running to the
start of the next. Anything with concurrent states — overlapping space
programs, simultaneous wars as durations rather than start dates — needs
stacked tracks, which the renderer does not have. See `ROADMAP.md` before
promising such a chart.

## The date rule

Every date is an ISO string, and `parseDate` in `timeline.js` is the only
place one becomes a `Date`.

This is not styling. The original 2011 version of this code wrote dates
1-indexed (`new Date(2001, 9, 11)` for September 11) and passed them to a
0-indexed constructor, so the entire collection rendered a month late and
`new Date(2003, 12, 13)` silently overflowed into January 2004. The
round-trip assertion in `data.test.js` — parse the string, format it back,
require it to match — is what catches that class of bug. Do not weaken it.

## Data provenance

Dates were written by a model from memory of the cited sources, not
transcribed from them line by line. The presidency and terror-level dates were
checked individually and are solid. The NBER recession dates are well known
and spot-check well, but have not been diffed against the committee's table.
Treat any single value as approximate until you have checked it, and add a
`source` to every new chart.

Two judgment calls are recorded in the files themselves: the terror-level
spans after 2006-08-13 track the aviation sector rather than the national
level, and the Liberia event date replaces an original that could not be
sourced. Both are open items in `ROADMAP.md`.

## Conventions

- Single quotes, `const`, arrow functions for small helpers.
- Spans are half-open: each runs until the next one starts, and the last runs
  to the chart's `end`. Never paint a span to the canvas edge and rely on a
  later one covering it — that was the original bug and the tests assert
  against it.
