import { charts } from '../data/index.js';
import { renderNav, renderChart } from './gallery.js';
import { chartFor } from './routing.js';

const nav = document.getElementById('nav');
const main = document.getElementById('chart');

function show() {
  const chart = chartFor(charts, location.hash);
  renderNav(nav, charts, chart);
  renderChart(main, charts, chart);
  document.title = `${chart.title} — Charts`;
}

addEventListener('hashchange', show);
show();
