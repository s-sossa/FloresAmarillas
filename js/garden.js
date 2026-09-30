/**
 * garden.js — SVG flower garden
 * Draws and manages yellow flowers in an SVG element.
 */

const NS = 'http://www.w3.org/2000/svg';

/* ── Gradient def ───────────────────────────────────────────── */
function addDefs(svg) {
  const defs = document.createElementNS(NS, 'defs');

  // Petal gradient
  const petalGrad = document.createElementNS(NS, 'radialGradient');
  petalGrad.setAttribute('id', 'petalGrad');
  petalGrad.setAttribute('cx', '50%');
  petalGrad.setAttribute('cy', '75%');
  petalGrad.setAttribute('r', '60%');
  const ps1 = document.createElementNS(NS, 'stop');
  ps1.setAttribute('offset', '0%');  ps1.setAttribute('stop-color', '#fff7b0');
  const ps2 = document.createElementNS(NS, 'stop');
  ps2.setAttribute('offset', '100%'); ps2.setAttribute('stop-color', '#e8900a');
  petalGrad.appendChild(ps1);
  petalGrad.appendChild(ps2);

  // Center gradient
  const centerGrad = document.createElementNS(NS, 'radialGradient');
  centerGrad.setAttribute('id', 'centerGrad');
  centerGrad.setAttribute('cx', '40%');
  centerGrad.setAttribute('cy', '35%');
  centerGrad.setAttribute('r', '60%');
  const cs1 = document.createElementNS(NS, 'stop');
  cs1.setAttribute('offset', '0%');  cs1.setAttribute('stop-color', '#c87a00');
  const cs2 = document.createElementNS(NS, 'stop');
  cs2.setAttribute('offset', '100%'); cs2.setAttribute('stop-color', '#5c2d00');
  centerGrad.appendChild(cs1);
  centerGrad.appendChild(cs2);

  defs.appendChild(petalGrad);
  defs.appendChild(centerGrad);
  svg.appendChild(defs);
}

/* ── Single flower ───────────────────────────────────────────── */
export function makeFlower(x, groundY, stemH, size, delay = 0) {
  const g = document.createElementNS(NS, 'g');
  g.classList.add('flower-group');
  g.style.animationDelay = `${delay}s`;

  const bx = x;
  const by = groundY - stemH;

  // Stem
  const stemWidth = Math.max(2.5, size * 0.075);
  const stem = document.createElementNS(NS, 'path');
  // Slightly curved stem
  stem.setAttribute('d', `M${x},${groundY} Q${x + size * 0.08},${groundY - stemH * 0.5} ${bx},${by}`);
  stem.setAttribute('stroke', '#3a7d2c');
  stem.setAttribute('stroke-width', stemWidth);
  stem.setAttribute('stroke-linecap', 'round');
  stem.setAttribute('fill', 'none');
  g.appendChild(stem);

  // Leaf left
  const leafL = document.createElementNS(NS, 'ellipse');
  leafL.setAttribute('cx', x - size * 0.5);
  leafL.setAttribute('cy', groundY - stemH * 0.42);
  leafL.setAttribute('rx', size * 0.44);
  leafL.setAttribute('ry', size * 0.17);
  leafL.setAttribute('transform', `rotate(-28, ${x - size * 0.5}, ${groundY - stemH * 0.42})`);
  leafL.setAttribute('fill', '#4caf50');
  g.appendChild(leafL);

  // Leaf right
  const leafR = document.createElementNS(NS, 'ellipse');
  leafR.setAttribute('cx', x + size * 0.5);
  leafR.setAttribute('cy', groundY - stemH * 0.63);
  leafR.setAttribute('rx', size * 0.44);
  leafR.setAttribute('ry', size * 0.17);
  leafR.setAttribute('transform', `rotate(28, ${x + size * 0.5}, ${groundY - stemH * 0.63})`);
  leafR.setAttribute('fill', '#388e3c');
  g.appendChild(leafR);

  // 8 petals
  const petalColors = ['#ffe566', '#ffd32a', '#f5c518', '#ffec6e', '#ffd700', '#ffe066', '#ffdb4d', '#f7ca18'];
  for (let i = 0; i < 8; i++) {
    const angle = i * 45;
    const rad   = (angle - 90) * Math.PI / 180;
    const dist  = size * 0.54;
    const px    = bx + Math.cos(rad) * dist;
    const py    = by + Math.sin(rad) * dist;

    const p = document.createElementNS(NS, 'ellipse');
    p.setAttribute('cx', px);
    p.setAttribute('cy', py);
    p.setAttribute('rx', size * 0.38);
    p.setAttribute('ry', size * 0.82);
    p.setAttribute('transform', `rotate(${angle}, ${px}, ${py})`);
    p.setAttribute('fill', petalColors[i]);
    p.setAttribute('opacity', '0.93');
    p.classList.add('petal');
    p.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
    g.appendChild(p);
  }

  // Center disc
  const center = document.createElementNS(NS, 'circle');
  center.setAttribute('cx', bx);
  center.setAttribute('cy', by);
  center.setAttribute('r', size * 0.27);
  center.setAttribute('fill', 'url(#centerGrad)');
  center.classList.add('center-dot');
  g.appendChild(center);

  // Center texture dots
  for (let d = 0; d < 12; d++) {
    const a   = (d * 30) * Math.PI / 180;
    const dr  = size * (d < 6 ? 0.10 : 0.18);
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', bx + Math.cos(a) * dr);
    dot.setAttribute('cy', by + Math.sin(a) * dr);
    dot.setAttribute('r',  size * 0.04);
    dot.setAttribute('fill', '#c87a00');
    dot.setAttribute('opacity', '0.7');
    g.appendChild(dot);
  }

  return g;
}

/* ── Initialize garden ───────────────────────────────────────── */
export function initGarden() {
  const svg = document.getElementById('garden');
  if (!svg) return;

  addDefs(svg);

  const VW = 1200, VH = 700;
  const groundY = VH;

  // [x, stemH, size, delay]
  const configs = [
    [70,  130, 38, 0.2],
    [170, 162, 46, 0.5],
    [300, 108, 32, 0.8],
    [415, 182, 52, 0.3],
    [538, 148, 43, 0.6],
    [650, 124, 37, 1.0],
    [758, 172, 50, 0.4],
    [868, 132, 40, 0.7],
    [965, 156, 46, 0.2],
    [1078,122, 35, 0.9],
    [1155,166, 48, 0.5],
    [235, 96,  27, 1.2],
    [595, 98,  31, 1.4],
    [898, 102, 29, 1.1],
  ];

  configs.forEach(([x, stemH, size, delay]) => {
    svg.appendChild(makeFlower(x, groundY, stemH, size, delay));
  });

  // Click to bloom new flowers
  svg.addEventListener('click', (e) => {
    const rect   = svg.getBoundingClientRect();
    const scaleX = VW / rect.width;
    const cx     = (e.clientX - rect.left) * scaleX;
    const stemH  = 80 + Math.random() * 120;
    const size   = 28 + Math.random() * 30;
    svg.appendChild(makeFlower(cx, groundY, stemH, size, 0));

    // Import burst dynamically to avoid circular deps
    import('./shared.js').then(({ burstPetals }) => burstPetals(e.clientX, e.clientY));
  });
}
