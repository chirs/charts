// DOM for the nav, one chart, and the pager.

import { draw, heightFor, parseDate } from './timeline.js';
import { neighbors } from './routing.js';

const WIDTH = 1200;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function link(href, className, text) {
  const node = element('a', className, text);
  node.href = href;
  return node;
}

function activeEvents(chart, active) {
  return (chart.layers || [])
    .filter((layer) => active.has(layer.name))
    .flatMap((layer) => layer.events)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));
}

export function renderNav(container, charts, current) {
  const nav = element('nav', 'charts-nav');
  for (const chart of charts) {
    nav.appendChild(link(`#${chart.slug}`, chart.slug === current.slug ? 'current' : null, chart.title));
  }
  container.replaceChildren(nav);
}

function pager(charts, chart) {
  const { prev, next } = neighbors(charts, chart.slug);
  const node = element('nav', 'pager');
  node.appendChild(link(`#${prev.slug}`, 'prev', `‹ ${prev.title}`));
  node.appendChild(link(`#${next.slug}`, 'next', `${next.title} ›`));
  return node;
}

export function renderChart(container, charts, chart) {
  const layers = chart.layers || [];
  const active = new Set(layers.length ? [layers[0].name] : []);

  const node = element('section', 'chart');
  node.appendChild(element('h2', null, chart.title));
  if (chart.description) node.appendChild(element('p', 'description', chart.description));

  const canvas = element('canvas');
  canvas.width = WIDTH;

  const redraw = () => {
    const events = activeEvents(chart, active);
    canvas.height = heightFor(events.length);
    draw(canvas.getContext('2d'), chart, events, canvas.width, canvas.height);
  };

  if (layers.length) {
    const toggles = element('ul', 'layers');
    for (const layer of layers) {
      const item = element('li', active.has(layer.name) ? 'selected' : null, layer.name);
      item.addEventListener('click', () => {
        if (active.has(layer.name)) active.delete(layer.name);
        else active.add(layer.name);
        item.className = active.has(layer.name) ? 'selected' : '';
        redraw();
      });
      toggles.appendChild(item);
    }
    node.appendChild(toggles);
  }

  node.appendChild(canvas);

  if (chart.source) {
    const source = element('p', 'source', 'Source: ');
    source.appendChild(link(chart.source, null, chart.source));
    node.appendChild(source);
  }

  node.appendChild(pager(charts, chart));

  redraw();
  container.replaceChildren(node);
}
