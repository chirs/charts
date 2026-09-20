// Homeland Security Advisory System, 2002-2011.
//
// Source: DHS advisory-level change announcements; the system was created by
// Homeland Security Presidential Directive 3 (2002-03-12) and replaced by the
// National Terrorism Advisory System (2011-04-27).
//
// Note: from 2006-08-13 the *national* level sat at Elevated while the
// aviation sector stayed at High until the system was retired. The spans below
// track the aviation sector, which is the level that was publicly posted in
// airports and the one most people actually saw.

export default {
  slug: "terror-alert-levels",
  title: "Terror Alert Levels",
  description:
    "The color-coded threat level from its creation after 9/11 to its " +
    "retirement in 2011, with contemporaneous events layered on top.",
  source: "https://www.dhs.gov/homeland-security-advisory-system",
  end: "2011-12-31",

  spans: [
    { start: "2001-09-01", color: "#EFEFEF", label: "No system in effect" },
    { start: "2002-03-12", color: "#FFFC52", label: "Elevated" },
    { start: "2002-09-10", color: "#F59433", label: "High" },
    { start: "2002-09-25", color: "#FFFC52", label: "Elevated" },
    { start: "2003-02-07", color: "#F59433", label: "High" },
    { start: "2003-02-28", color: "#FFFC52", label: "Elevated" },
    { start: "2003-03-17", color: "#F59433", label: "High" },
    { start: "2003-04-17", color: "#FFFC52", label: "Elevated" },
    { start: "2003-05-20", color: "#F59433", label: "High" },
    { start: "2003-05-31", color: "#FFFC52", label: "Elevated" },
    { start: "2004-08-01", color: "#F59433", label: "High" },
    { start: "2004-11-10", color: "#FFFC52", label: "Elevated" },
    { start: "2005-07-07", color: "#F59433", label: "High" },
    { start: "2005-08-12", color: "#FFFC52", label: "Elevated" },
    { start: "2006-08-10", color: "#E01B4C", label: "Severe" },
    { start: "2006-08-13", color: "#F59433", label: "High" },
    { start: "2011-04-27", color: "#EFEFEF", label: "No system in effect" },
  ],

  layers: [
    {
      name: "terror",
      events: [
        { date: "2001-09-11", label: "9/11 attacks" },
        { date: "2001-10-07", label: "War in Afghanistan begins" },
        { date: "2002-03-12", label: "Terror alert levels instituted" },
        { date: "2003-03-20", label: "War in Iraq begins" },
        { date: "2003-12-13", label: "Saddam Hussein captured" },
        { date: "2004-01-16", label: "Abu Ghraib investigation begins" },
        { date: "2004-11-02", label: "George W. Bush re-elected" },
        { date: "2005-07-07", label: "7/7 bombings in London" },
        { date: "2006-03-12", label: "Mahmudiyah killings" },
        { date: "2008-11-04", label: "Barack Obama elected" },
        { date: "2011-04-27", label: "Terror alert levels eliminated" },
        { date: "2011-05-02", label: "Osama bin Laden killed" },
      ],
    },
    {
      name: "wars",
      events: [
        { date: "2001-10-07", label: "Enduring Freedom: Afghanistan" },
        { date: "2002-01-15", label: "Enduring Freedom: Philippines" },
        { date: "2002-10-07", label: "Enduring Freedom: Horn of Africa" },
        { date: "2003-03-20", label: "Iraqi Freedom" },
        // Dated to the arrival of US forces in Monrovia. The Second Liberian
        // Civil War itself ended with the Accra accord on 2003-08-18; the
        // original data's 09-11 date could not be sourced.
        { date: "2003-08-11", label: "Liberian Civil War intervention" },
        { date: "2004-02-05", label: "Haitian rebellion begins" },
        { date: "2004-03-16", label: "War in North-West Pakistan" },
        { date: "2007-02-06", label: "Enduring Freedom: Trans Sahara" },
        { date: "2010-01-14", label: "Yemeni al-Qaeda crackdown" },
        { date: "2011-03-19", label: "Libyan intervention begins" },
      ],
    },
    {
      name: "film",
      // Dates are US theatrical release.
      events: [
        { date: "2001-11-16", label: "Harry Potter and the Sorcerer's Stone" },
        { date: "2003-05-30", label: "Finding Nemo" },
        { date: "2003-12-17", label: "The Lord of the Rings: The Return of the King" },
        { date: "2005-05-19", label: "Star Wars Episode III: Revenge of the Sith" },
        { date: "2006-12-22", label: "Night at the Museum" },
        { date: "2008-07-18", label: "The Dark Knight" },
      ],
    },
  ],
}
