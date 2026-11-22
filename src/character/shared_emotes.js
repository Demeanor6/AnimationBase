// shared_emotes.js: Painted reaction marks, heart geometry, and motion smear trails shared across all characters.
const EMOTE_TOP = ['steam', 'stars', 'cloud', 'bulb', 'scribble', 'psychic'];

// Heart outline points, centred at (cx, cy), about 2r wide.
function heartPts(cx, cy, r, n = 22) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU;
    p.push([
      cx + 16 * Math.pow(Math.sin(a), 3) * r / 16,
      cy - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * r / 16
    ]);
  }
  return p;
}

// A smear drawing: dry-brush streaks and speed lines trailing a fast move (dir ±1), or on both sides for a spin (0).
function smearTrail(x, y, u, V, k, dir, col) {
  const sides = dir === 0 ? [-1, 1] : [-dir];
  const topY = V.smearTop ?? 7.2;
  const spanY = V.smearSpan ?? 1.5;
  const edge = Math.max(Math.abs(V.L || -5), Math.abs(V.R || 5));
  for (const s of sides) {
    for (let i = 0; i < 4; i++) {
      const yy = y - (topY - i * spanY) * u, x0 = x + s * (edge - .5) * u, len = (3 + 3 * hash(i + 7 * s)) * u * k;
      inkLine([[x0, yy], [x0 + s * len * .5, yy + jit(u * .1)], [x0 + s * len, yy]], 2.2 * k, col, 'dry', .3);
      if (i % 2) inkLine([[x0 + s * len * .3, yy + .5 * u], [x0 + s * len * 1.1, yy + .5 * u]], .6, PAL.ink, 'inkfine', 0);
    }
  }
}

// Painted reaction marks, never lettering: ! ? !! !? zzz sweat spark heart hearts anger steam bulb dots scribble
// music swirl stars cloud psychic. k = 0..1 pop-in progress (with overshoot); age = seconds since it appeared.
function emote(kind, x, y, s, k = 1, age = T) {
  const p = backOut(k);
  if (p < .02) return;
  const sw = clamp(s / 15, .4, 2), P = pts => pts.map(([a, b]) => [a * s, b * s]);
  const dot = (dx, col) => paint(ellPts(dx, 1.25 * s, .42 * s, .42 * s, 12), { wash: col, ink: PAL.ink, sw: sw * .7 });
  const bang = (dx, col) => {
    push(); translate(dx, 0); rotate(.1 + .08 * Math.sin(age * 16) * Math.exp(-age * 3));
    paint(P([[-.62, -2.3], [.62, -2.3], [.22, .45], [-.22, .45]]), { wash: col, fill: PAL.cream, fillOp: 70, ink: PAL.ink, sw: sw * .8, curv: .25 });
    dot(0, col);
    pop();
  };
  const quest = (dx, col) => {
    push(); translate(dx, 0); rotate(-.08 + .08 * Math.sin(age * 12) * Math.exp(-age * 3));
    paint(ribbon(P([[-1, -1.3], [-.55, -2.15], [.35, -2.3], [1, -1.6], [.7, -.75], [.05, -.3], [0, .4]]), .75 * s, .5 * s), { wash: col, fill: PAL.cream, fillOp: 60, ink: PAL.ink, sw: sw * .8 });
    dot(0, col);
    pop();
  };
  push(); translate(x, y); scale(p);
  switch (kind) {
    case '!': bang(0, PAL.ochre); break;
    case '?': quest(0, PAL.sky); break;
    case '!!': bang(-.8 * s, PAL.ochre); bang(.9 * s, PAL.ochre); break;
    case '!?': bang(-.9 * s, PAL.ochre); quest(1 * s, PAL.sky); break;
    case 'zzz':
      for (let i = 0; i < 3; i++) {
        const ph = frac(age * .4 + i / 3), a = Math.sin(ph * Math.PI), zs = (.8 + ph * .7) * s * Math.min(1, a * 1.6);
        if (a < .12) continue;
        const zx = ph * 2.6 * s, zy = -ph * 4.2 * s;
        const Z = [[-.6, -.6], [.6, -.6], [.6, -.28], [-.12, .3], [.6, .3], [.6, .6], [-.6, .6], [-.6, .28], [.12, -.3], [-.6, -.3]];
        push(); translate(zx, zy); rotate(-.15 + .1 * Math.sin(age * 2 + i));
        paint(Z.map(([a0, b0]) => [a0 * zs, b0 * zs]), { wash: PAL.cream, fill: PAL.sky, fillOp: 70, ink: PAL.ink, sw: sw * .7 });
        pop();
      }
      break;
    case 'sweat':
      for (const [dx, dy, r] of [[0, 0, 1], [1.6, 1.4, .7]]) {
        paint(P([[dx, dy - 1.6 * r], [dx + .9 * r, dy + .2], [dx, dy + .9 * r], [dx - .9 * r, dy + .2]]), { wash: PAL.sky, fill: '#FFFFFF', fillOp: 60, ink: PAL.ink, sw: sw * .6, curv: .7 });
      }
      break;
    case 'spark': {
      const tw = 1 + .15 * Math.sin(age * 12);
      paint(starPts(0, 0, 1.6 * s * tw), { wash: PAL.cream, fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: sw * .5 });
      paint(starPts(1.9 * s, 1.2 * s, .8 * s / tw), { wash: PAL.ochre, ink: PAL.ink, sw: sw * .4 });
      break;
    }
    case 'heart':
      paint(heartPts(0, 0, s * 1.8 * (1 + .12 * pulse(age + OFF))), { wash: '#E2476E', fill: PAL.rose, fillOp: 90, ink: PAL.ink, sw: sw * .6 });
      break;
    case 'hearts':
      for (let i = 0; i < 3; i++) {
        const ph = frac(age * .55 + i / 3), a = Math.sin(ph * Math.PI);
        if (a < .1) continue;
        paint(heartPts((Math.sin(ph * 6 + i * 2) * .7 + i * .7 - .7) * s, -ph * 3.8 * s, s * (.5 + .6 * a)), { wash: '#E2476E', fill: PAL.rose, fillOp: 90, ink: PAL.ink, sw: sw * .5 });
      }
      break;
    case 'anger': {
      const b = 1 + .15 * pulse(age + OFF, 8);
      for (let i = 0; i < 4; i++) {
        push(); rotate(i * Math.PI / 2 + Math.PI / 4); scale(b);
        inkLine(P([140, 160, 180, 200, 220].map(d => [2.1 + 1.3 * Math.cos(d * Math.PI / 180), 1.3 * Math.sin(d * Math.PI / 180)])), sw * 1.1, '#D8394E', 'ink', .6);
        pop();
      }
      break;
    }
    case 'steam':
      for (const sd of [-1, 1]) {
        for (let j = 0; j < 2; j++) {
          const ph = frac(age / .7 + j * .5 + (sd > 0 ? .25 : 0)), r = (.55 + ph * .9) * s, cx = sd * (3.2 + ph * 1.8) * s, cy = (1 - ph * 3) * s;
          const puff = [];
          for (let i = 0; i < 18; i++) {
            const a = i / 18 * TAU, bump = 1 + .22 * Math.abs(Math.sin(a * 2.5));
            puff.push([cx + Math.cos(a) * r * bump, cy + Math.sin(a) * r * .8 * bump]);
          }
          paint(puff, { wash: PAL.cream, washOp: 255 * (1 - ph * .8), ink: ph < .6 ? PAL.ink : null, sw: sw * .5 });
        }
      }
      break;
    case 'bulb': {
      const gl = .5 + .5 * Math.sin(age * 10);
      glow(0, -1.4 * s, 4.5 * s, '#FFD27A', .75 + .25 * gl);
      for (let i = 0; i < 7; i++) {
        const a = -Math.PI / 2 + (i - 3) * .45, r0 = 1.6 * s, r1 = (2.2 + .4 * gl) * s;
        inkLine([[Math.cos(a) * r0, -1.4 * s + Math.sin(a) * r0], [Math.cos(a) * r1, -1.4 * s + Math.sin(a) * r1]], sw * .8, PAL.ochre, 'ink', 0);
      }
      paint(ellPts(0, -1.4 * s, 1.15 * s, 1.2 * s, 16), { wash: '#FFE68A', fill: PAL.cream, fillOp: 90, ink: PAL.ink, sw: sw * .7 });
      paint(rectPts(-.5 * s, -.3 * s, s, .8 * s), { wash: '#9A93A8', ink: PAL.ink, sw: sw * .6 });
      break;
    }
    case 'dots':
      for (let i = 0; i < 3; i++) {
        const ph = frac(age / 1.8), q = backOut(clamp((ph - i * .22) * 6));
        if (q < .02) continue;
        paint(ellPts((i - 1) * 1.3 * s, 0, .42 * s * q, .42 * s * q, 10), { wash: PAL.ink, ink: null });
      }
      break;
    case 'scribble': {
      const pts = [];
      for (let i = 0; i < 34; i++) {
        const a = i * .95, r = (1.1 + .5 * Math.sin(i * 1.7)) * s;
        pts.push([Math.cos(a) * r * 1.5 + jit(.2 * s), Math.sin(a) * r * .8 + jit(.2 * s)]);
      }
      inkLine(pts, sw * .8, PAL.ink, 'ink', .7);
      break;
    }
    case 'music': {
      const b = Math.sin(age * 5) * .3 * s;
      push(); translate(0, b); rotate(.1 * Math.sin(age * 5));
      paint(ellPts(0, 1.2 * s, .7 * s, .5 * s, 12, 0, -.3), { wash: PAL.ink, ink: null });
      inkLine(P([[.6, 1.1], [.6, -1.6], [1.6, -1]]), sw * .8, PAL.ink, 'ink', 0);
      pop();
      const b2 = Math.sin(age * 5 + 2) * .3 * s;
      paint(ellPts(2.2 * s, 2.2 * s + b2, .45 * s, .33 * s, 10, 0, -.3), { wash: PAL.ink, ink: null });
      inkLine([[2.6 * s, 2.15 * s + b2], [2.6 * s, .6 * s + b2]], sw * .6, PAL.ink, 'ink', 0);
      break;
    }
    case 'swirl': {
      const sp = [];
      for (let i = 0; i < 18; i++) {
        const a = i * .6 + age * 5, r = i * .09 * s;
        sp.push([Math.cos(a) * r, Math.sin(a) * r]);
      }
      inkLine(sp, sw * .7, PAL.violet, 'inkfine', .6);
      break;
    }
    case 'stars':
      for (let i = 0; i < 3; i++) {
        const a = age * 5 + i * TAU / 3, d = .75 + .25 * Math.sin(a);
        paint(starPts(Math.cos(a) * 4.2 * s, Math.sin(a) * s, .75 * s * d, .45, 5, age * 3), { wash: PAL.ochre, fill: PAL.cream, fillOp: 60, ink: PAL.ink, sw: sw * .5 });
      }
      break;
    case 'cloud': {
      const bob = Math.sin(age * 2) * .15 * s, c = [];
      for (let i = 0; i < 40; i++) {
        const a = i / 40 * TAU, up = Math.sin(a) < 0, r = up ? 1 + .38 * Math.pow(Math.abs(Math.sin(a * 3)), .6) : 1;
        c.push([Math.cos(a) * 2.8 * s * (up ? r * .92 : 1), bob - .2 * s + Math.sin(a) * (up ? 1.35 : .7) * s * r]);
      }
      for (let i = 0; i < 6; i++) {
        const ph = frac(age * 2.4 + hash(i)), rx = (-2 + i * .8) * s, ry = (.7 + ph * 2) * s;
        inkLine([[rx, ry], [rx - .12 * s, ry + .7 * s]], sw * 1.1, mixCol(PAL.sky, PAL.indigo, .3), 'ink', 0);
      }
      paint(c, { wash: '#A3A8C4', fill: PAL.indigo, fillOp: 70, bleed: .1, ink: PAL.ink, sw: sw * .8, curv: .4 });
      break;
    }
    case 'psychic': {
      // Expanding cyan-violet psychic waves & floating star sparks over the crown
      glow(0, -.3 * s, 4.4 * s, '#85EAFF', .55 + .2 * Math.sin(age * 8));
      for (let i = 0; i < 2; i++) {
        const ph = frac(age * 1.2 + i * .5);
        const rx = (1.1 + ph * 2.6) * s, ry = (.4 + ph * .85) * s, cy = (-ph * 1.5) * s;
        const wave = [];
        for (let j = 0; j < 18; j++) {
          const a = j / 18 * TAU;
          wave.push([Math.cos(a) * rx, cy + Math.sin(a) * ry]);
        }
        wave.push(wave[0]);
        inkLine(wave, sw * .7 * (1 - ph * .65), i % 2 ? '#59D5FF' : '#9B7CF0', 'inkfine', .6);
      }
      for (let i = 0; i < 3; i++) {
        const a = age * 3.5 + i * TAU / 3;
        paint(starPts(Math.cos(a) * 2.8 * s, -.6 * s + Math.sin(a * 2) * .45 * s, .45 * s, .38, 4, age * 4), { wash: '#AEEFFF', ink: PAL.ink, sw: sw * .35 });
      }
      break;
    }
  }
  pop();
}
