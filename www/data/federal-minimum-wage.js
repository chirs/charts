// Federal minimum wage under the Fair Labor Standards Act, 1938-present.
//
// Nominal dollars, not adjusted for inflation — the chart shows the legislated
// rate, so the long flat stretch since 2009 is the point rather than an
// artifact. Spans start on the date each rate took effect.
//
// Rates from 1961 and 1963 applied to workers already covered by the Act;
// newly covered workers phased in on a separate schedule that this chart does
// not track.
//
// Source: https://www.dol.gov/agencies/whd/minimum-wage/history/chart

export default {
  slug: 'federal-minimum-wage',
  title: 'Federal Minimum Wage',
  description:
    'The legislated rate in nominal dollars since the Fair Labor Standards ' +
    'Act. Color runs light to dark with the rate, so the unchanged stretch ' +
    'since July 2009 reads as one flat band.',
  source: 'https://www.dol.gov/agencies/whd/minimum-wage/history/chart',
  // Widened past the first rate so the Act's signing has somewhere to sit.
  start: '1938-06-25',
  end: '2026-09-19',

  // Sequential rather than categorical: color is interpolated from `value`.
  ramp: ['#F7F3E8', '#1B5E3F'],

  spans: [
    { start: '1938-10-24', value: 0.25, label: '$0.25' },
    { start: '1939-10-24', value: 0.3, label: '$0.30' },
    { start: '1945-10-24', value: 0.4, label: '$0.40' },
    { start: '1950-01-25', value: 0.75, label: '$0.75' },
    { start: '1956-03-01', value: 1.0, label: '$1.00' },
    { start: '1961-09-03', value: 1.15, label: '$1.15' },
    { start: '1963-09-03', value: 1.25, label: '$1.25' },
    { start: '1967-02-01', value: 1.4, label: '$1.40' },
    { start: '1968-02-01', value: 1.6, label: '$1.60' },
    { start: '1974-05-01', value: 2.0, label: '$2.00' },
    { start: '1975-01-01', value: 2.1, label: '$2.10' },
    { start: '1976-01-01', value: 2.3, label: '$2.30' },
    { start: '1978-01-01', value: 2.65, label: '$2.65' },
    { start: '1979-01-01', value: 2.9, label: '$2.90' },
    { start: '1980-01-01', value: 3.1, label: '$3.10' },
    { start: '1981-01-01', value: 3.35, label: '$3.35' },
    { start: '1990-04-01', value: 3.8, label: '$3.80' },
    { start: '1991-04-01', value: 4.25, label: '$4.25' },
    { start: '1996-10-01', value: 4.75, label: '$4.75' },
    { start: '1997-09-01', value: 5.15, label: '$5.15' },
    { start: '2007-07-24', value: 5.85, label: '$5.85' },
    { start: '2008-07-24', value: 6.55, label: '$6.55' },
    { start: '2009-07-24', value: 7.25, label: '$7.25' },
  ],

  layers: [
    {
      name: 'legislation',
      events: [
        { date: '1938-06-25', label: 'Fair Labor Standards Act signed' },
        { date: '1961-05-05', label: 'Coverage extended to retail and service' },
        { date: '1966-09-23', label: 'Coverage extended to farm and public workers' },
        { date: '1989-11-17', label: 'Training wage introduced' },
        { date: '2007-05-25', label: 'Last increase enacted (three-step)' },
      ],
    },
  ],
}
