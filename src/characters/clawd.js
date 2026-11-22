// clawd.js: Clawd character blueprint registered in CharacterRegistry.
// Preserves the exact original terracotta block mascot (10u wide × 8u tall) inside the modular CharacterEngine.
(() => {
  const VIEWS = {
    front: { L: -5, R: 5, face: { cx: 0, fw: 1, sides: [-1, 1], mx: 0, bx: 3.6 }, hat: 0, hw: 1,
             legs: [[-4, 0], [-2, 0], [1, 0], [3, 0]], arms: [[-4.9, -1, 'L', 0], [4.9, 1, 'R', 0]] },
    q:     { L: -5, R: 5.1, strip: [-5, -2.3], seam: -2.3, face: { cx: 1.5, fw: .74, sides: [-1, 1], mx: .3, bx: 3.6 }, hat: .6, hw: 1,
             legs: [[-4.3, 1], [-1.8, 0], [.8, 0], [3.3, 0]], arms: [[5, 1, 'R', 2], [-4.7, -1, 'L', 1]] },
    side:  { L: -3.1, R: 3.1, face: { cx: 1.35, fw: .55, sides: [1], mx: 1.7, bx: 1 }, hat: .3, hw: .66,
             legs: [[-2.1, 1], [1.3, 1], [-2.6, 0], [.9, 0]], arms: [[1.6, 0, 'L', 1]] },
    qback: { L: -5.1, R: 5, strip: [2.3, 5], seam: 2.3, face: null, hat: -.4, hw: 1,
             legs: [[3.3, 1], [.8, 0], [-1.8, 0], [-4.3, 0]], arms: [[-5, -1, 'R', 2], [4.7, 1, 'L', 1]] },
    back:  { L: -5, R: 5, face: null, hat: 0, hw: 1, back: true,
             legs: [[-4, 0], [-2, 0], [1, 0], [3, 0]], arms: [[-4.9, -1, 'R', 0], [4.9, 1, 'L', 0]] },
  };

  function drawArm(ctx, [px, dir, which, layer]) {
    const { u, sw, J, o, cols, rs } = ctx;
    rs('arm' + which);
    const a = which === 'L' ? (o.aL ?? .2) : (o.aR ?? .2);
    const hook = which === 'L' ? o.armL : o.armR;
    push();
    translate((px + dir * .55 * clamp((Math.abs(a) - .7) / .9)) * u, -4.5 * u);
    if (dir === 0) {
      translate(0, .3 * u); rotate(.7 - a);
      paint(rectPts(-.2 * u, -.45 * u, 2.3 * u, .9 * u, J * .6), { wash: cols.col, washOp: 255, fill: cols.dk, fillOp: 60, tex: .5, ink: PAL.ink, sw: sw * .8 });
      if (hook) { translate(2.1 * u, 0); hook(u, sw); }
    } else {
      rotate(dir < 0 ? a : -a);
      paint(rectPts(dir < 0 ? -2.2 * u : 0, -.5 * u, 2.2 * u, u, J * .6), { wash: layer === 2 ? mixCol(cols.col, cols.dk, .4) : cols.col, washOp: 255, fill: cols.dk, fillOp: 60, tex: .5, ink: PAL.ink, sw: sw * .8 });
      if (hook) { translate(dir * 2.2 * u, 0); if (dir < 0) scale(-1, 1); hook(u, sw); }
    }
    pop();
  }

  function drawGloom(u, sw, V, g) {
    const L = V.L * u, R = V.R * u;
    paint(rectPts(L + .15 * u, -7.9 * u, R - L - .3 * u, 2.6 * u, u * .05), { fill: PAL.indigo, fillOp: 150 * g, bleed: .08, tex: .5, border: .6, ink: null });
    const n = Math.round((V.R - V.L) * .7);
    for (let i = 0; i < n; i++) {
      const gx = lerp(L + .7 * u, R - .7 * u, i / Math.max(1, n - 1));
      inkLine([[gx, -7.8 * u], [gx + jit(u * .05), (-7.8 + 2.4 * g * (.7 + .3 * hash(i))) * u]], sw * .45, PAL.ink, 'inkfine', 0);
    }
  }

  function drawBlush(u, sw, F, b) {
    for (const s of F.sides) {
      const bx = s * F.bx * u;
      paint(ellPts(bx, -4.6 * u, u * .85, u * .42, 14), { fill: PAL.rose, fillOp: 170 * clamp(b), bleed: .2, ink: null });
      if (b > .6) for (let k = 0; k < 3; k++) inkLine([[bx - .5 * u + k * .4 * u, -4.35 * u], [bx - .3 * u + k * .4 * u, -4.85 * u]], sw * .4, mixCol(PAL.rose, PAL.ink, .3), 'inkfine', 0);
    }
  }

  function drawEye(e, s, u, o, sw) {
    const lx = (o.lookX || 0) * u * .5, ly = (o.lookY || 0) * u * .4;
    const slit = (w, h) => {
      paint(rectPts(-w / 2 * u + lx, -h / 2 * u + ly, w * u, h * u, u * .04), { wash: PAL.ink, ink: null });
      if (u > 9) paint(ellPts(lx - w * .18 * u, ly - h * .29 * u, u * .17 * w, u * .24 * w, 10), { wash: PAL.cream, washOp: 230, ink: null });
    };
    const blinkOn = ['normal', 'look', 'wide'].includes(e) && ((T * .9 + (o.seed || 0) * 1.7) % 3.3) < .12;
    if (blinkOn) { inkLine([[-.7 * u, .5 * u], [.7 * u, .5 * u]], sw, PAL.ink, 'ink', 0); return; }
    const lineEye = (pts, w = 1.3, c = .2) => inkLine(pts.map(([a, b]) => [a * u, b * u]), sw * w, PAL.ink, 'ink', c);
    switch (e) {
      case 'normal': case 'look': slit(1, 2); break;
      case 'wide': slit(1.25, 2.7); break;
      case 'happy': lineEye([[-.9, .7], [0, -.5], [.9, .7]]); break;
      case 'closed': lineEye([[-.9, .2], [0, .6], [.9, .2]], 1.2, .4); break;
      case 'sleepy':
        paint(rectPts(-.5 * u + lx, .05 * u, u, .95 * u, u * .03), { wash: PAL.ink, ink: null });
        lineEye([[-.8, .05], [0, -.1], [.8, .1]], 1.1, .4); break;
      case 'narrow': paint(rectPts(-.6 * u + lx, -.1 * u + ly, 1.2 * u, .7 * u, u * .03), { wash: PAL.ink, ink: null }); break;
      case 'angry': case 'determined': {
        const hi = e === 'angry' ? .75 : .5, top = e === 'angry' ? -.7 : -.55;
        const P = [[-.65, s < 0 ? top : top + hi], [.65, s < 0 ? top + hi : top], [.65, 1], [-.65, 1]];
        paint(P.map(([a, b]) => [a * u + lx, b * u + ly]), { wash: PAL.ink, ink: null });
        if (e === 'determined' && u > 9) paint(ellPts(lx - .2 * u, ly + .25 * u, u * .16, u * .2, 8), { wash: PAL.cream, ink: null });
        break;
      }
      case 'sad': case 'teary': {
        const P = [[-.6, s < 0 ? -.2 : -.85], [.6, s < 0 ? -.85 : -.2], [.6, .9], [-.6, .9]];
        paint(P.map(([a, b]) => [a * u + lx, b * u + ly]), { wash: PAL.ink, ink: null });
        if (u > 9) paint(ellPts(lx - .18 * u, ly + .05 * u, u * .16, u * .22, 8), { wash: PAL.cream, ink: null });
        if (e === 'teary') {
          const w = Math.sin(T * 9 + s) * .06 * u;
          paint(ellPts(0, .95 * u + w, .95 * u, .38 * u, 14), { wash: PAL.sky, washOp: 210, fill: '#FFFFFF', fillOp: 60, ink: PAL.ink, sw: sw * .4 });
          paint(ellPts(-.35 * u, .85 * u + w, .18 * u, .1 * u, 8), { wash: '#FFFFFF', ink: null });
        }
        break;
      }
      case 'cry': {
        lineEye([[-.9, .45], [-.3, -.05], [.3, .15], [.9, -.2]].map(([a, b]) => [a * -s, b]), 1.3, .3);
        const R = []; for (let k = 0; k <= 5; k++) R.push([(s * .55 + Math.sin(T * 8 + k * 1.3 + s) * .12 * k / 5) * u, (.4 + k * .72) * u]);
        paint(ribbon(R, .45 * u, .8 * u), { wash: PAL.sky, washOp: 230, fill: '#FFFFFF', fillOp: 70, ink: PAL.ink, sw: sw * .45 });
        for (let k = 0; k < 2; k++) {
          const ph = frac(T * 1.8 + k * .5 + (s > 0 ? .25 : 0)), p = arcPt([s * .9 * u, .2 * u], [s * 3.6 * u, 1.8 * u], 1.6 * u, ph);
          paint(ellPts(p[0], p[1], .22 * u * (1 - ph * .5), .3 * u * (1 - ph * .5), 8), { wash: PAL.sky, ink: PAL.ink, sw: sw * .35 });
        }
        break;
      }
      case 'squeeze': lineEye([[-.55 * -s, -.7], [.55 * -s, 0], [-.55 * -s, .7]], 1.3, 0); break;
      case 'shine':
        paint(ellPts(lx * .6, ly * .6, u * .78, u * 1.12, 16), { wash: PAL.ink, ink: null });
        paint(ellPts(lx * .6 - .25 * u, ly * .6 - .45 * u, u * .3, u * .38, 10), { wash: PAL.cream, ink: null });
        paint(ellPts(lx * .6 + .25 * u, ly * .6 + .45 * u, u * .14, u * .14, 8), { wash: PAL.cream, ink: null });
        break;
      case 'scared':
        paint(ellPts(0, 0, u * .95, u * 1.15, 16), { wash: PAL.cream, ink: PAL.ink, sw: sw * .6 });
        paint(ellPts((o.lookX || 0) * u * .3 + Math.sin(T * 40) * .04 * u, .1 * u, u * .3, u * .4, 10), { wash: PAL.ink, ink: null });
        break;
      case 'blank': paint(ellPts(0, 0, u * .8, u * 1.05, 14), { wash: PAL.cream, ink: PAL.ink, sw: sw * .7 }); break;
      case 'spark':
        paint(ellPts(0, 0, u * 1.5, u * 1.5, 18), { fill: PAL.ochre, fillOp: 90, bleed: .3, ink: null });
        paint(starPts(0, 0, u * 1.35 * (1 + .12 * Math.sin(T * 14))), { wash: PAL.cream, fill: PAL.ochre, fillOp: 80, ink: PAL.ink, sw: sw * .55 });
        break;
      case 'red':
        paint(ellPts(0, 0, u * 1.7, u * 1.7, 18), { fill: '#E0283F', fillOp: 110, bleed: .35, ink: null });
        paint(rectPts(-.6 * u, -u, 1.2 * u, 2 * u, u * .05), { wash: '#FF2F4A', ink: PAL.ink, sw: sw * .5 });
        break;
      case 'heart': paint(heartPts(0, .1 * u, u * .9 * (1 + .1 * pulse(T))), { wash: '#E2476E', ink: PAL.ink, sw: sw * .5 }); break;
      case 'x': lineEye([[-.8, -.8], [.8, .8]], 1, 0); lineEye([[.8, -.8], [-.8, .8]], 1, 0); break;
      case 'swirl': {
        const sp = []; for (let k = 0; k < 16; k++) { const a = k * .7 + T * 6 * s, r = k * .06 * u; sp.push([Math.cos(a) * r, Math.sin(a) * r]); }
        inkLine(sp, sw * .6, PAL.ink, 'inkfine', .6); break;
      }
      case 'dot': paint(ellPts(lx * .5, ly * .5, u * .45, u * .55, 12), { wash: PAL.ink, ink: null }); break;
      default: slit(1, 2);
    }
  }

  function drawEyes(u, o, sw, sides, smear = 0) {
    const kinds = Array.isArray(o.eyes) ? o.eyes : o.eyes === 'wink' ? ['happy', 'normal'] : [o.eyes || 'normal', o.eyes || 'normal'];
    const sqz = clamp(o.squint || 0);
    if (smear > .5) { for (const s of sides) inkLine([[s * 2.5 * u - .9 * u, -6 * u], [s * 2.5 * u + .9 * u, -6 * u]], sw * 1.4, PAL.ink, 'ink', 0); return; }
    if (sqz > .8) { for (const s of sides) inkLine([[s * 2.5 * u - .8 * u, -5.9 * u], [s * 2.5 * u + .8 * u, -5.9 * u]], sw, PAL.ink, 'ink', 0); return; }
    if (kinds[0] === 'shades') {
      const P = pts => pts.map(([a, b]) => [a * u, b * u]);
      const lens = cx => P([[cx - 1.4, -7.1], [cx + 1.4, -7.1], [cx + 1.3, -6.2], [cx + .8, -5.35], [cx, -5.2], [cx - .8, -5.35], [cx - 1.3, -6.2]]);
      if (sides.length > 1) {
        for (const s of [-1, 1]) inkLine(P([[s * 3.9, -6.85], [s * 5, -6.95]]), sw * .8, PAL.ink, 'ink', 0);
        inkLine(P([[-1.15, -6.75], [0, -7.05], [1.15, -6.75]]), sw * .8, PAL.ink, 'ink', .5);
      } else inkLine(P([[1.1, -6.85], [-5, -6.95]]), sw * .8, PAL.ink, 'ink', 0);
      for (const s of sides) {
        const cx = s * 2.5;
        paint(lens(cx), { wash: '#2A2740', ink: PAL.ink, sw: sw * .9, curv: .3 });
        inkLine(P([[cx - .85, -6.35], [cx - .25, -6.85]]), sw * .45, PAL.cream, 'inkfine', 0);
        inkLine(P([[cx - .45, -5.85], [cx - .05, -6.2]]), sw * .3, PAL.cream, 'inkfine', 0);
      }
      return;
    }
    if (sqz > 0) { push(); translate(0, -6 * u); scale(1 + sqz * .15, 1 - sqz); translate(0, 6 * u); }
    for (const s of sides) { push(); translate(s * 2.5 * u, -6 * u); drawEye(kinds[s < 0 ? 0 : 1], s, u, o, sw); pop(); }
    if (sqz > 0) pop();
  }

  function drawMouth(u, m, sw) {
    if (!m) return;
    const P = pts => pts.map(([a, b]) => [a * u, b * u]), dark = '#4A1F2A';
    const ln = (pts, w = .8, c = .6) => inkLine(P(pts), sw * w, PAL.ink, 'ink', c);
    switch (m) {
      case 'o': paint(ellPts(0, -4.3 * u, u * .45, u * .5, 12), { wash: PAL.ink, ink: null }); break;
      case 'O': paint(ellPts(0, -4.1 * u, u * .8, u * .95, 14), { wash: dark, ink: PAL.ink, sw: sw * .6 }); break;
      case 'smile': ln([[-.8, -4.6], [0, -4.1], [.8, -4.6]]); break;
      case 'frown': ln([[-.8, -4.1], [0, -4.6], [.8, -4.1]]); break;
      case 'grin': paint(P([[-1.3, -4.8], [1.3, -4.8], [.9, -3.9], [-.9, -3.9]]), { wash: dark, ink: PAL.ink, sw: sw * .6, curv: .3 }); break;
      case 'flat': ln([[-.7, -4.4], [.7, -4.4]], .8, 0); break;
      case 'wobble': ln([[-1, -4.4], [-.5, -4.7], [0, -4.4], [.5, -4.7], [1, -4.4]], .7, .3); break;
      case 'cat': ln([[-.9, -4.5], [-.45, -4.1], [0, -4.5], [.45, -4.1], [.9, -4.5]], .7, .5); break;
      case 'smirk': ln([[-.8, -4.35], [.2, -4.3], [.9, -4.75]], .8, .5); break;
      case 'laugh':
        paint(P([[-1.4, -4.9], [1.4, -4.9], [1, -4], [0, -3.4], [-1, -4]]), { wash: dark, ink: PAL.ink, sw: sw * .6, curv: .4 });
        paint(ellPts(0, -3.85 * u, .7 * u, .32 * u, 12), { wash: PAL.rose, ink: null }); break;
      case 'open':
        paint(ellPts(0, -4.25 * u, u * .75, u * .6, 14), { wash: dark, ink: PAL.ink, sw: sw * .6 });
        paint(ellPts(0, -3.95 * u, u * .45, u * .2, 10), { wash: PAL.rose, ink: null }); break;
      case 'wail': {
        const w = Math.sin(T * 30) * .06;
        paint(P([[-1.5, -4.5 + w], [-.5, -4.9], [.5, -4.9 - w], [1.5, -4.5], [1.2, -3.3], [-1.2, -3.3]]), { wash: dark, ink: PAL.ink, sw: sw * .6, curv: .3 });
        paint(ellPts(0, -3.6 * u, .8 * u, .25 * u, 12), { wash: PAL.rose, ink: null }); break;
      }
      case 'teeth':
        paint(rectPts(-1.3 * u, -4.85 * u, 2.6 * u, .95 * u, u * .04), { wash: PAL.cream, ink: PAL.ink, sw: sw * .6 });
        ln([[-1.25, -4.38], [1.25, -4.38]], .4, 0);
        for (const tx of [-.65, 0, .65]) ln([[tx, -4.8], [tx, -3.95]], .35, 0);
        break;
      case 'tongue':
        paint(P([[.05, -4.3], [.75, -4.3], [.72, -3.75], [.4, -3.55], [.08, -3.75]]), { wash: PAL.rose, ink: PAL.ink, sw: sw * .5, curv: .5 });
        ln([[-.8, -4.6], [0, -4.2], [.8, -4.5]]); break;
      case 'pout': ln([[-.45, -4.2], [0, -4.5], [.45, -4.2]], 1, .6); ln([[-.25, -4.0], [0, -3.9], [.25, -4.0]], .6, .6); break;
      case 'yawn':
        paint(ellPts(0, -4.1 * u, u * .6, u * 1.05, 14), { wash: dark, ink: PAL.ink, sw: sw * .6 });
        paint(ellPts(0, -3.45 * u, u * .38, u * .25, 10), { wash: PAL.rose, ink: null }); break;
    }
  }

  function drawLunchbox(ctx, lid) {
    const { u, o, sw, J, cols } = ctx;
    const hy = -5.1 * u, A = lid * 1.25, gap = x => (x + 5 * u) * Math.sin(A);
    const tooth = (tx, dir) => {
      const h = Math.min(.8 * u, .42 * gap(tx + .65 * u));
      if (h < .12 * u) return;
      paint([[tx, hy], [tx + 1.3 * u, hy], [tx + .65 * u, hy + dir * h]], { wash: PAL.cream, ink: PAL.ink, sw: sw * .45 });
    };
    paint(rectPts(-5 * u, hy, 10 * u, 3.1 * u, J), { wash: cols.col, washOp: 255, ink: null });
    paint(rectPts(-4.8 * u, -3.8 * u, 9.6 * u, 1.6 * u, J), { fill: cols.dk, fillOp: 120, bleed: .03, tex: .7, border: .5, ink: null });
    paint([[-5 * u, hy], [5 * u, hy], [-5 * u + 10 * u * Math.cos(A), hy - 10 * u * Math.sin(A)]], { wash: '#4A1F2A', ink: null });
    const th = Math.min(.5 * u, .3 * gap(1.8 * u));
    if (th > .08 * u) paint(ellPts(1.8 * u, hy - th * .7, 2.2 * u, th, 16), { wash: PAL.rose, fill: '#E2476E', fillOp: 60, ink: null });
    for (let i = 0; i < 6; i++) tooth(-4.4 * u + i * 1.6 * u, -1);
    paint(rectPts(-5 * u, hy, 10 * u, 3.1 * u, J), { ink: PAL.ink, sw });

    push(); translate(-5 * u, hy); rotate(-A); translate(5 * u, -hy);
    paint(rectPts(-5 * u, -8 * u, 10 * u, 2.9 * u, J), { wash: cols.col, washOp: 255, ink: null });
    paint(ellPts(-1.6 * u, -6.9 * u, 3.2 * u, 1 * u, 16, J), { fill: cols.lt, fillOp: 110, bleed: .15, tex: .8, border: .8, ink: null });
    for (let i = 0; i < 5; i++) tooth(-3.6 * u + i * 1.6 * u, 1);
    paint(rectPts(-5 * u, -8 * u, 10 * u, 2.9 * u, J), { ink: PAL.ink, sw });
    if (o.gloom > .02) drawGloom(u, sw, VIEWS.front, o.gloom);
    drawEyes(u, o, sw, [-1, 1], 0);
    drawSharedHat(u, o.hat, sw, { y: -8, w: 1, bodyCol: cols.col });
    pop();
  }

  CharacterRegistry.register('clawd', {
    id: 'clawd',
    name: 'Clawd',
    palette: { body: PAL.clay, bodyDk: PAL.clayDk, bodyLt: '#F5B394' },
    metrics: {
      width: 10, height: 8,
      shadowWidth: 10, shadowRx: 5.6, shadowRy: 1.0,
      hatY: -8, hatW: 1,
      emoteTop: [0, -10.4], emoteSide: [5.4, -8.6],
      jitter: .07, swScale: 1,
    },
    views: VIEWS,
    emotionChannels: [],
    emotionOverrides: {
      headache: { eyes: 'squeeze', mouth: 'wobble', emote: 'anger', take: .8, body: t => ({ dx: .15 * Math.sin(t * TAU * 14), sq: .12, aL: 1.1, aR: 1.1 }) },
      psychic:  { eyes: 'spark', mouth: 'O', tint: '#B288FF', tintK: .35, emote: 'psychic', take: 1, body: t => ({ dy: -1.4 + .25 * Math.sin(t * 4), sq: -.06, aL: 1.3, aR: 1.3 }) },
    },
    parts: {
      farArms: ctx => ctx.V.arms.filter(a => a[3] !== 1).forEach(a => drawArm(ctx, a)),
      legs: ctx => {
        const { V, u, sw, J, o, cols, far, rs } = ctx;
        V.legs.forEach(([lx, isFar], i) => {
          rs('leg' + i);
          let h = 2.2, sx = 0;
          if (o.walk != null) {
            if (o.view === 'side') {
              const ph = (o.walk + [0, .5, .5, 0][i]) * TAU;
              sx = Math.sin(ph) * .55; h = 2.2 - Math.max(0, Math.cos(ph)) * .8;
            } else {
              const ph = Math.sin((o.walk + (i % 2 ? .5 : 0)) * TAU);
              if (ph > 0) h = 2.2 - ph * .9;
            }
          }
          paint(rectPts((lx + sx) * u, -2.4 * u, u, h * u, J * .6), { wash: isFar ? far : cols.dk, washOp: 255, ink: PAL.ink, sw: sw * .8 });
        });
      },
      body: ctx => {
        const { V, u, sw, J, o, cols, rs } = ctx;
        rs('body');
        const lid = V === VIEWS.front ? o.lid || 0 : 0;
        if (lid > .01) {
          drawLunchbox(ctx, lid);
          return;
        }
        const L = V.L * u, R = V.R * u, wk = (V.R - V.L) / 10, body = rectPts(L, -8 * u, R - L, 6 * u, J);
        paint(body, { wash: cols.col, washOp: 255, ink: null });
        const px = V.strip ? (V.strip[0] < 0 ? (V.seam + V.R) / 2 - 1.2 : (V.L + V.seam) / 2 - .6) : -1.6 * wk;
        paint(ellPts(px * u, -6.4 * u, 3.4 * u * (V.strip ? .75 : wk), 1.5 * u, 18, J * 2, -.08), { fill: cols.lt, fillOp: V.back ? 80 : 120, bleed: .2, tex: .85, border: .8, ink: null });
        paint(rectPts(L + .2 * u, -3.8 * u, R - L - .4 * u, 1.6 * u, J), { fill: cols.dk, fillOp: 120, bleed: .03, tex: .7, border: .5, ink: null });
        if (V.strip) {
          paint(rectPts(V.strip[0] * u, -8 * u, (V.strip[1] - V.strip[0]) * u, 6 * u, J * .5), { fill: cols.dk, fillOp: 150, bleed: .04, tex: .6, border: .4, ink: null });
          inkLine([[V.seam * u + jit(J), -7.9 * u], [V.seam * u + jit(J), -5 * u], [V.seam * u + jit(J), -2.1 * u]], sw * .55, PAL.ink, 'inkfine', 0);
        }
        paint(body, { ink: PAL.ink, sw });
        if (o.gloom > .02) drawGloom(u, sw, V, o.gloom);
      },
      face: ctx => {
        const { V, u, sw, o, sm, rs } = ctx;
        if ((V === VIEWS.front) && (o.lid || 0) > .01) return;
        const F = V.face;
        push(); translate(F.cx * u, 0); scale(F.fw, 1);
        if (o.blush) drawBlush(u, sw, F, o.blush === true ? 1 : o.blush);
        if (o.hat === 'mask' && F.sides.length > 1) drawSharedFaceAccessory(u, 'mask', sw, F.sides, { eyeX: 2.5, eyeY: -6, eyeRx: 1, eyeRy: 1.1 });
        rs('eyes'); drawEyes(u, o, sw, F.sides, sm);
        rs('mouth'); push(); translate(F.mx * u, 0); drawMouth(u, o.mouth, sw); pop();
        if (['cat', 'masq', 'bowtie'].includes(o.hat)) drawSharedFaceAccessory(u, o.hat, sw, F.sides, { eyeX: 2.5, eyeY: -6.4, eyeRx: 1, eyeRy: .75, cheekX: 4.2, cheekY: -4.7, neckY: -2.9 });
        pop();
      },
      hat: ctx => {
        const { V, u, sw, o, cols, rs } = ctx;
        if ((V === VIEWS.front) && (o.lid || 0) > .01) return;
        rs('hat');
        push(); translate(V.hat * u, 0); scale(V.hw, 1);
        drawSharedHat(u, o.hat, sw, { y: -8, w: 1, bodyCol: cols.col });
        pop();
      },
      nearArms: ctx => {
        ctx.V.arms.filter(a => a[3] === 1).forEach(a => drawArm(ctx, a));
      },
    },
    measure(x, y, u, o = {}) {
      const V = VIEWS[o.view] || VIEWS.front;
      const dy = (o.dy || 0) * u;
      return {
        charId: 'clawd',
        view: o.view || 'front',
        feetBottomY: dy,
        bodyPoly: rectPts(x + V.L * u, y + dy - 8 * u, (V.R - V.L) * u, 6 * u, 0),
        eyes: V.face ? V.face.sides.map(s => ({
          side: s,
          center: [x + (V.face.cx + s * 2.5 * V.face.fw) * u, y + dy - 6 * u],
          rx: .65 * u * V.face.fw, ry: 1.05 * u,
          poly: ellPts(x + (V.face.cx + s * 2.5 * V.face.fw) * u, y + dy - 6 * u, .65 * u * V.face.fw, 1.05 * u, 12),
        })) : [],
        arms: V.arms.map(([px, dir, which]) => ({
          which,
          root: [x + px * u, y + dy - 4.5 * u],
          poly: rectPts(x + (px + (dir < 0 ? -2.2 : 0)) * u, y + dy - 5 * u, 2.2 * u, u, 0),
        })),
        hairFeathers: [],
        tail: null,
        hasNaN: false,
        worldBBox: [x + V.L * u, y + dy - 8 * u, x + V.R * u, y + dy],
      };
    },
  });
})();
