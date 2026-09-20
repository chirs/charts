// US recessions as dated by the NBER Business Cycle Dating Committee.
//
// Each recession span runs from the cycle peak to the trough; the expansion
// spans between them run trough to next peak. The NBER dates cycles by month,
// so every date here is the first of the month.
//
// Source: https://www.nber.org/research/business-cycle-dating

export default {
  slug: "us-recessions",
  title: "US Recessions",
  description:
    "NBER-dated contractions since 1929. Shares a time axis with the " +
    "presidencies chart.",
  source: "https://www.nber.org/research/business-cycle-dating",
  end: "2026-09-01",

  spans: [
    { start: "1929-08-01", color: "#3E4C59", label: "Great Depression" },
    { start: "1933-03-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1937-05-01", color: "#3E4C59", label: "Recession of 1937-38" },
    { start: "1938-06-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1945-02-01", color: "#3E4C59", label: "Recession of 1945" },
    { start: "1945-10-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1948-11-01", color: "#3E4C59", label: "Recession of 1948-49" },
    { start: "1949-10-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1953-07-01", color: "#3E4C59", label: "Recession of 1953-54" },
    { start: "1954-05-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1957-08-01", color: "#3E4C59", label: "Recession of 1957-58" },
    { start: "1958-04-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1960-04-01", color: "#3E4C59", label: "Recession of 1960-61" },
    { start: "1961-02-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1969-12-01", color: "#3E4C59", label: "Recession of 1969-70" },
    { start: "1970-11-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1973-11-01", color: "#3E4C59", label: "Oil crisis recession" },
    { start: "1975-03-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1980-01-01", color: "#3E4C59", label: "Recession of 1980" },
    { start: "1980-07-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1981-07-01", color: "#3E4C59", label: "Recession of 1981-82" },
    { start: "1982-11-01", color: "#EFEFEF", label: "Expansion" },
    { start: "1990-07-01", color: "#3E4C59", label: "Recession of 1990-91" },
    { start: "1991-03-01", color: "#EFEFEF", label: "Expansion" },
    { start: "2001-03-01", color: "#3E4C59", label: "Dot-com recession" },
    { start: "2001-11-01", color: "#EFEFEF", label: "Expansion" },
    { start: "2007-12-01", color: "#3E4C59", label: "Great Recession" },
    { start: "2009-06-01", color: "#EFEFEF", label: "Expansion" },
    { start: "2020-02-01", color: "#3E4C59", label: "COVID-19 recession" },
    { start: "2020-04-01", color: "#EFEFEF", label: "Expansion" },
  ],

  layers: [],
}
