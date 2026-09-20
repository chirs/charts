# ROADMAP.md — Development Roadmap

Open work only; completed items are removed as they land (see git history).

---

## Charts

- [ ] Add more datasets — the collection is the point, and three is thin.
- [ ] Diff the NBER recession dates against the committee's published table.
      They were written from memory and spot-check well, but have not been
      verified line by line.
- [ ] Source the Liberian Civil War event properly. The original data dated it
      2003-09-11, which matches nothing; it is currently 2003-08-11 (arrival of
      US forces in Monrovia) and should be confirmed or replaced.
- [ ] Decide whether the terror-level spans after 2006-08-13 should track the
      aviation sector (currently High, as the original data had it) or the
      national level (Elevated). The file documents the choice; the chart does
      not surface it.

## Rendering

- [ ] Event labels collide when two events fall within a few days of each
      other. The vertical stagger separates them but the text still overlaps.
- [ ] Span labels are dropped when the span is too narrow for the text, so most
      presidencies go unlabeled. Needs a legend or hover readout.
- [ ] The canvas is a fixed 1200px and CSS-scales on narrow screens, which
      blurs the text. Redraw at the container width instead.
- [ ] Charts sharing a time axis (presidencies and recessions) are drawn
      independently, so they only line up by coincidence of their ranges.
      Worth an explicit shared-axis mode if a third one joins them.

## Deferred

- Extracting `www/js/timeline.js` as a standalone library. It is already
  separated from the gallery and the geometry is pure, so this is cheap to do
  later. No reason to do it before a second consumer exists.
