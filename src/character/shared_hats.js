// shared_hats.js: Parameterized hats & face accessories that adapt cleanly to any character's head geometry.
// Anchor schema:
//   hatAnchor:  { y, w, bandY, bandW, earX, earY, bodyCol }
//   faceAnchor: { eyeX, eyeY, eyeRx, eyeRy, cheekX, cheekY, neckY }
(() => {
  function drawSharedHat(u, h, sw, anchor = {}) {
    if (!h || h === 'mask' || h === 'masq' || h === 'bowtie') return;
    const crownY = anchor.y ?? -8;
    const wScale = anchor.w ?? 1;
    const bodyCol = anchor.bodyCol || PAL.clay;
    const bandY = anchor.bandY ?? (crownY + .1);
    const bandW = anchor.bandW ?? wScale;
    const earX = anchor.earX ?? 5.1 * wScale;
    const earY = anchor.earY ?? (crownY + 2.2);

    // Special case: headband sits slightly lower on forehead with skull-matched width
    if (h === 'band' || h === 'sweatband') {
      const hw = 5.1 * bandW;
      paint(rectPts(-hw * u, (bandY - .45) * u, hw * 2 * u, .9 * u), { wash: h === 'band' ? '#D8394E' : PAL.cream, ink: PAL.ink, sw: sw * .5 });
      if (h === 'sweatband') {
        for (let i = 0; i < 4; i++) {
          const sx = lerp(-hw * .78, hw * .78, i / 3);
          inkLine([[sx * u, (bandY - .35) * u], [(sx + .35 * bandW) * u, (bandY + .35) * u]], sw * .4, '#D8394E', 'inkfine', 0);
        }
      }
      return;
    }

    // Special case: headphones wrap over the crown to side ear cups without touching eyes
    if (h === 'headphones') {
      const topY = crownY - 1.9;
      const arch = [[-earX, earY], [-earX * .9, crownY - .9], [0, topY], [earX * .9, crownY - .9], [earX, earY]].map(([a, b]) => [a * u, b * u]);
      inkLine(arch, sw * 2.2, PAL.ink, 'ink', .6);
      for (const s of [-1, 1]) {
        const cx = s < 0 ? -earX - .7 : earX - .6;
        paint(rrPts(cx * u, (earY - 1.25) * u, 1.3 * u, 2.5 * u, .55 * u), { wash: PAL.violet, fill: PAL.rose, fillOp: 50, ink: PAL.ink, sw: sw * .7 });
      }
      return;
    }

    // Standard top-of-crown hats: map Clawd's crown space (y=-8, width=1) into target character's crown anchor
    const P = pts => pts.map(([a, b]) => [a * wScale * u, (b + 8 + crownY) * u]);
    const eX = x => x * wScale * u;
    const eY = y => (y + 8 + crownY) * u;
    const eR = r => r * Math.max(.65, wScale) * u;

    if (h === 'party') {
      paint(P([[-1.8, -7.9], [0, -12.8], [1.8, -7.9]]), { wash: PAL.rose, fill: PAL.violet, fillOp: 50, ink: PAL.ink, sw: sw * .8 });
      paint(ellPts(0, eY(-12.8), eR(.75), eR(.75), 12), { wash: PAL.ochre, ink: PAL.ink, sw: sw * .6 });
    } else if (h === 'hard') {
      const d = [];
      for (let i = 0; i <= 12; i++) {
        const a = Math.PI + i / 12 * Math.PI;
        d.push([Math.cos(a) * 3.5 * wScale * u, eY(-8.25) + Math.sin(a) * 3.1 * Math.max(.75, wScale) * u]);
      }
      paint(d, { wash: '#F2C53D', ink: PAL.ink, sw: sw * .8 });
      paint(rectPts(-4.7 * wScale * u, eY(-8.85), 9.4 * wScale * u, .9 * u), { wash: '#F2C53D', ink: PAL.ink, sw: sw * .8 });
    } else if (h === 'crown') {
      paint(P([[-3, -7.9], [-3, -10.8], [-1.5, -9.3], [0, -11.2], [1.5, -9.3], [3, -10.8], [3, -7.9]]), { wash: '#F2C53D', fill: PAL.ochre, fillOp: 90, ink: PAL.ink, sw: sw * .8 });
      for (const gx of [-1.5, 0, 1.5]) paint(ellPts(eX(gx), eY(-8.7), eR(.28), eR(.28), 8), { wash: gx ? PAL.teal : PAL.rose, ink: null });
    } else if (h === 'halo') {
      brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', PAL.ochre, sw * 1.4);
      brush.beginShape(0);
      for (const p of ellPts(0, eY(-10.4), 3.1 * wScale * u, .75 * u, 20)) brush.vertex(p[0], p[1]);
      brush.endShape(true);
    } else if (h === 'wizard' || h === 'hood') {
      paint(P([[-3.9, -7.9], [.9, -14.8], [3.9, -7.9]]), { wash: h === 'hood' ? PAL.violet : PAL.indigo, fill: PAL.violet, fillOp: 80, ink: PAL.ink, sw: sw * .8 });
      paint(starPts(eX(.2), eY(-10.6), eR(.85), .4, 5), { wash: PAL.ochre, ink: null });
    } else if (h === 'top') {
      paint(rectPts(-2.6 * wScale * u, eY(-12.4), 5.2 * wScale * u, 4.2 * u), { wash: PAL.ink, ink: null });
      paint(rectPts(-2.6 * wScale * u, eY(-9.4), 5.2 * wScale * u, .8 * u), { wash: '#C8324A', ink: null });
      paint(rectPts(-3.9 * wScale * u, eY(-8.6), 7.8 * wScale * u, .8 * u), { wash: PAL.ink, ink: null });
    } else if (h === 'fedora') {
      paint(P([[-2.8, -8.3], [-2.3, -10.8], [0, -10.2], [2.3, -10.8], [2.8, -8.3]]), { wash: '#3B3550', ink: PAL.ink, sw: sw * .8, curv: .3 });
      paint(rectPts(-2.8 * wScale * u, eY(-9.2), 5.6 * wScale * u, .8 * u), { wash: '#C8324A', ink: null });
      paint(ellPts(0, eY(-8.2), 4.4 * wScale * u, .6 * u, 20), { wash: '#3B3550', ink: PAL.ink, sw: sw * .8 });
    } else if (h === 'beanie') {
      const d = [];
      for (let i = 0; i <= 12; i++) {
        const a = Math.PI + i / 12 * Math.PI;
        d.push([Math.cos(a) * 3.8 * wScale * u, eY(-8.4) + Math.sin(a) * 2.5 * u]);
      }
      paint(d, { wash: PAL.teal, fill: PAL.sky, fillOp: 60, ink: PAL.ink, sw: sw * .8 });
      paint(rectPts(-4.1 * wScale * u, eY(-8.9), 8.2 * wScale * u, 1.05 * u), { wash: mixCol(PAL.teal, PAL.ink, .2), ink: PAL.ink, sw: sw * .7 });
      paint(ellPts(0, eY(-11.1), eR(.75), eR(.75), 12), { wash: PAL.cream, ink: PAL.ink, sw: sw * .6 });
    } else if (h === 'bow') {
      for (const s of [-1, 1]) paint(P([[2.2, -8.1], [2.2 + s * 1.6, -9.2], [2.2 + s * 1.6, -7.1]]), { wash: PAL.rose, fill: '#E2476E', fillOp: 70, ink: PAL.ink, sw: sw * .6, curv: .3 });
      paint(ellPts(eX(2.2), eY(-8.2), eR(.42), eR(.42), 10), { wash: '#E2476E', ink: PAL.ink, sw: sw * .5 });
    } else if (h === 'flower') {
      const fx = eX(-2.3), fy = eY(-8.6);
      inkLine([[fx, fy], [fx + .3 * wScale * u, eY(-7.9)]], sw * .6, PAL.sap, 'ink', 0);
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * TAU + .3;
        paint(ellPts(fx + Math.cos(a) * .65 * u, fy + Math.sin(a) * .65 * u, .52 * u, .52 * u, 10), { wash: PAL.cream, ink: PAL.ink, sw: sw * .4 });
      }
      paint(ellPts(fx, fy, .42 * u, .42 * u, 10), { wash: PAL.ochre, ink: PAL.ink, sw: sw * .4 });
    } else if (h === 'cat') {
      for (const s of [-1, 1]) {
        paint(P([[s * 4.5, -7.8], [s * 4.0, -11.0], [s * 1.6, -7.9]]), { wash: bodyCol, ink: PAL.ink, sw: sw * .8 });
        paint(P([[s * 3.9, -8.05], [s * 3.7, -10.0], [s * 2.4, -8.05]]), { wash: PAL.rose, ink: null });
      }
    }
  }

  function drawSharedFaceAccessory(u, h, sw, sides, m = {}) {
    if (!h) return;
    const eyeX = m.eyeX ?? 2.5;
    const eyeY = m.eyeY ?? -6;
    const eyeRx = m.eyeRx ?? .95;
    const eyeRy = m.eyeRy ?? .6;
    const cheekX = m.cheekX ?? 4.0;
    const cheekY = m.cheekY ?? -4.7;
    const neckY = m.neckY ?? -2.9;

    if (h === 'cat') {
      for (const s of sides) {
        for (const k of [-.28, .28]) {
          inkLine([[s * (cheekX - .6) * u, (cheekY + k) * u], [s * (cheekX + 1.8) * u, (cheekY - .15 + k * 2) * u]], sw * .4, PAL.ink, 'inkfine', 0);
        }
      }
    } else if (h === 'masq') {
      const w = eyeX + eyeRx + .8;
      const top = eyeY - eyeRy - .6, bot = eyeY + eyeRy + .45;
      const pts = [
        [-w, eyeY - .3], [-eyeX, top], [0, eyeY - .35], [eyeX, top], [w, eyeY - .3],
        [w * .82, bot], [eyeX * .55, bot - .1], [0, eyeY + .25], [-eyeX * .55, bot - .1], [-w * .82, bot]
      ].map(([a, b]) => [a * u, b * u]);
      paint(pts, { wash: PAL.violet, fill: PAL.rose, fillOp: 60, ink: PAL.ink, sw: sw * .7, curv: .3 });
      for (const s of sides) {
        paint(ellPts(s * eyeX * u, eyeY * u, eyeRx * .95 * u, eyeRy * .72 * u, 12), { wash: PAL.ink, ink: null });
      }
    } else if (h === 'mask' && sides.length > 1) {
      const w = eyeX + eyeRx + 1.0;
      const top = eyeY - eyeRy - .75, bot = eyeY + eyeRy + .4;
      const pts = [[-w, top], [w, top], [w * .8, bot], [.5, eyeY + .35], [-.5, eyeY + .35], [-w * .8, bot]].map(([a, b]) => [a * u, b * u]);
      paint(pts, { wash: PAL.violet, ink: PAL.ink, sw: sw * .7 });
    } else if (h === 'bowtie') {
      for (const s of [-1, 1]) {
        paint([[0, neckY * u], [s * 1.35 * u, (neckY - .65) * u], [s * 1.35 * u, (neckY + .65) * u]], { wash: PAL.rose, ink: PAL.ink, sw: sw * .5 });
      }
      paint(ellPts(0, neckY * u, .32 * u, .32 * u, 10), { wash: '#E2476E', ink: PAL.ink, sw: sw * .45 });
    }
  }

  window.drawSharedHat = drawSharedHat;
  window.drawSharedFaceAccessory = drawSharedFaceAccessory;
})();
