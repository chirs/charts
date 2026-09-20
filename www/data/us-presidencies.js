// US presidencies by party, 1901-present.
//
// Source: inauguration dates, and for mid-term successions the date the
// successor took the oath. Spans start the day the president took office.

export default {
  slug: "us-presidencies",
  title: "US Presidencies by Party",
  description:
    "Every administration since 1901, colored by the president's party. " +
    "Spans that start off-cycle mark a death or resignation in office.",
  source: "https://www.senate.gov/reference/",
  end: "2029-01-20",

  spans: [
    { start: "1901-09-14", color: "#E01B4C", label: "T. Roosevelt (R)" },
    { start: "1909-03-04", color: "#E01B4C", label: "Taft (R)" },
    { start: "1913-03-04", color: "#2359FA", label: "Wilson (D)" },
    { start: "1921-03-04", color: "#E01B4C", label: "Harding (R)" },
    { start: "1923-08-02", color: "#E01B4C", label: "Coolidge (R)" },
    { start: "1929-03-04", color: "#E01B4C", label: "Hoover (R)" },
    { start: "1933-03-04", color: "#2359FA", label: "F. Roosevelt (D)" },
    { start: "1945-04-12", color: "#2359FA", label: "Truman (D)" },
    { start: "1953-01-20", color: "#E01B4C", label: "Eisenhower (R)" },
    { start: "1961-01-20", color: "#2359FA", label: "Kennedy (D)" },
    { start: "1963-11-22", color: "#2359FA", label: "L. Johnson (D)" },
    { start: "1969-01-20", color: "#E01B4C", label: "Nixon (R)" },
    { start: "1974-08-09", color: "#E01B4C", label: "Ford (R)" },
    { start: "1977-01-20", color: "#2359FA", label: "Carter (D)" },
    { start: "1981-01-20", color: "#E01B4C", label: "Reagan (R)" },
    { start: "1989-01-20", color: "#E01B4C", label: "G.H.W. Bush (R)" },
    { start: "1993-01-20", color: "#2359FA", label: "Clinton (D)" },
    { start: "2001-01-20", color: "#E01B4C", label: "G.W. Bush (R)" },
    { start: "2009-01-20", color: "#2359FA", label: "Obama (D)" },
    { start: "2017-01-20", color: "#E01B4C", label: "Trump (R)" },
    { start: "2021-01-20", color: "#2359FA", label: "Biden (D)" },
    { start: "2025-01-20", color: "#E01B4C", label: "Trump (R)" },
  ],

  layers: [
    {
      name: "transitions",
      events: [
        { date: "1901-09-14", label: "McKinley assassinated" },
        { date: "1923-08-02", label: "Harding dies in office" },
        { date: "1945-04-12", label: "F. Roosevelt dies in office" },
        { date: "1963-11-22", label: "Kennedy assassinated" },
        { date: "1974-08-09", label: "Nixon resigns" },
      ],
    },
  ],
}
