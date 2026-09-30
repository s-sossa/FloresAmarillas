/**
 * shared.js — Stars, fireflies, falling petals
 * Used by both the landing page and the animation page.
 */

/* ── Stars ──────────────────────────────────────────────────── */
export function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const stars = Array.from({ length: 220 }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    r:     Math.random() * 1.4 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 1.6,
  }));

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight * 0.65;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const alpha = 0.35 + 0.65 * Math.abs(Math.sin(t * s.speed * 0.001 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 248, 200, ${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* ── Fireflies ───────────────────────────────────────────────── */
export function initFireflies(count = 18) {
  const isMobile = window.innerWidth <= 480;
  const actualCount = isMobile ? Math.min(count, 8) : count;
  // On mobile keep fireflies in upper half to not clash with card
  const yMin = isMobile ? 10 : 28;
  const yMax = isMobile ? 55 : 76;

  for (let i = 0; i < actualCount; i++) {
    const ff   = document.createElement('div');
    ff.className = 'firefly';
    const dur  = 7 + Math.random() * 9;
    const x1   = (Math.random() * 85 + 5).toFixed(1);
    const y1   = (yMin + Math.random() * (yMax - yMin)).toFixed(1);
    const x2   = (Math.random() * 85 + 5).toFixed(1);
    const y2   = (yMin + Math.random() * (yMax - yMin)).toFixed(1);

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes ff-${i} {
        0%   { left:${x1}vw; top:${y1}vh; opacity:0; }
        18%  { opacity:1; }
        82%  { opacity:0.75; }
        100% { left:${x2}vw; top:${y2}vh; opacity:0; }
      }`;
    document.head.appendChild(styleEl);

    ff.style.cssText = `
      left:${x1}vw; top:${y1}vh;
      animation: ff-${i} ${dur}s ${(Math.random() * dur).toFixed(1)}s ease-in-out infinite alternate;`;
    document.body.appendChild(ff);
  }
}

/* ── Falling petals ──────────────────────────────────────────── */
export function initFallingPetals(count = 22) {
  const isMobile = window.innerWidth <= 480;
  const actualCount = isMobile ? Math.min(count, 10) : count;

  for (let i = 0; i < actualCount; i++) {
    const fp  = document.createElement('div');
    fp.className = 'falling-petal';
    const dur = (7 + Math.random() * 8).toFixed(1);
    fp.style.cssText = `
      left:   ${(Math.random() * 100).toFixed(1)}vw;
      width:  ${(8  + Math.random() * 10).toFixed(0)}px;
      height: ${(12 + Math.random() * 14).toFixed(0)}px;
      animation-name:     fall-petal;
      animation-duration: ${dur}s;
      animation-delay:    ${(Math.random() * parseFloat(dur)).toFixed(1)}s;`;
    document.body.appendChild(fp);
  }
}

/* ── Burst petals on click ───────────────────────────────────── */
export function burstPetals(clientX, clientY, count = 8) {
  for (let i = 0; i < count; i++) {
    const fp = document.createElement('div');
    fp.className = 'falling-petal';
    fp.style.cssText = `
      left:     ${clientX - 6}px;
      top:      ${clientY - 10}px;
      position: fixed;
      width:    ${(6 + Math.random() * 8).toFixed(0)}px;
      height:   ${(8 + Math.random() * 10).toFixed(0)}px;
      animation: fall-petal ${(1.8 + Math.random() * 2).toFixed(1)}s ease-in forwards;
      opacity:  1;`;
    document.body.appendChild(fp);
    setTimeout(() => fp.remove(), 4000);
  }
}
