// woodpecker.js: Woodpecker (啄木鸟) character blueprint registered in CharacterRegistry.
// Designed directly from assets/ref_woodpecker.jpg using unified contour builders shared between drawing and measure().
(() => {
  const WP_PAL = {
    body: '#28242E',      // charcoal plumage (used as base for body tinting)
    bodyDk: '#1E1B24',
    bodyLt: '#464052',
    cream: '#FAF6EC',     // warm cream face, belly, wing scallops, tail bands, sclera
    creamDk: '#E6DEC9',
    crest: '#E63229',     // sweeping 3-spike crimson crest
    crestLt: '#F66357',
    crestDk: '#B51F1A',
    beak: '#585B64',      // slate grey chisel beak & bird feet
    beakLt: '#7C808B',
    beakDk: '#3E414A',
    flower: '#F6A5BE',    // 5-petal pink temple blossom
    flowerCenter: '#FCE166',
    blush: '#F2999C',
    mouthDark: '#4D1E2A',
  };

  const VIEWS = {
    front: {
      L: -3.15, R: 3.15,
      hat: 0, hw: .62, hatY: -9.12, bandY: -8.35, bandW: .48, earX: 2.95, earY: -6.95,
      emoteTop: [0, -12.6], emoteSide: [3.75, -9.4],
      smearTop: 9.2, smearSpan: 1.9,
      face: { cx: 0, fw: 1, sides: [-1, 1], eyeX: 1.29, eyeY: -6.92, eyeRx: .92, eyeRy: .88, bx: 2.02, by: -5.75, cheekX: 2.85, cheekY: -6.2, neckY: -4.2 },
      legs: [[-1.38, 0, -1], [1.38, 0, 1]],
      arms: [[-2.35, -1, 'L', 1], [2.35, 1, 'R', 1]],
      tailLayer: 'back',
    },
    q: {
      L: -3.05, R: 3.18,
      hat: .15, hw: .60, hatY: -9.12, bandY: -8.35, bandW: .47, earX: 2.85, earY: -6.95,
      emoteTop: [.2, -12.6], emoteSide: [3.85, -9.4],
      smearTop: 9.2, smearSpan: 1.9,
      face: {
        cx: 0, fw: 1, sides: [-1, 1],
        eyeX: 1.07, eyeY: -6.95, eyeRx: .94, eyeRy: .84,
        eyePos: { '-1': [.18, -6.95, .84, .84], '1': [1.96, -6.95, .60, .80] },
        bx: -.58, by: -5.75, cheekX: 2.4, cheekY: -6.2, neckY: -4.2,
      },
      legs: [[1.22, 1, 1], [-.62, 0, 1]],
      arms: [[2.42, 1, 'R', 2], [-1.95, -1, 'L', 1]],
      tailLayer: 'back',
    },
    side: {
      L: -2.55, R: 2.65,
      hat: -.05, hw: .52, hatY: -9.12, bandY: -8.35, bandW: .42, earX: 2.30, earY: -6.95,
      emoteTop: [0, -12.6], emoteSide: [3.3, -9.4],
      smearTop: 9.2, smearSpan: 1.9,
      face: {
        cx: 0, fw: 1, sides: [1],
        eyeX: .92, eyeY: -6.95, eyeRx: .72, eyeRy: .80,
        eyePos: { '1': [.92, -6.95, .72, .80] },
        bx: .15, by: -5.75, cheekX: 1.85, cheekY: -6.2, neckY: -4.2,
      },
      legs: [[.55, 1, 1], [-.38, 0, 1]],
      arms: [[-.25, 0, 'L', 1]],
      tailLayer: 'back',
    },
    qback: {
      L: -3.18, R: 3.05,
      hat: -.15, hw: .60, hatY: -9.12, bandY: -8.35, bandW: .47, earX: 2.85, earY: -6.95,
      emoteTop: [-.2, -12.6], emoteSide: [3.75, -9.4],
      smearTop: 9.2, smearSpan: 1.9,
      face: null,
      legs: [[1.15, 1, 1], [-.68, 0, 1]],
      arms: [[-2.42, -1, 'R', 2], [1.95, 1, 'L', 1]],
      tailLayer: 'front',
    },
    back: {
      L: -3.15, R: 3.15,
      hat: 0, hw: .62, hatY: -9.12, bandY: -8.35, bandW: .48, earX: 2.95, earY: -6.95,
      emoteTop: [0, -12.6], emoteSide: [3.75, -9.4],
      smearTop: 9.2, smearSpan: 1.9,
      face: null, back: true,
      legs: [[-1.38, 0, -1], [1.38, 0, 1]],
      arms: [[-2.35, -1, 'R', 1], [2.35, 1, 'L', 1]],
      tailLayer: 'front',
    },
  };

  function viewKey(V) {
    if (V === VIEWS.q) return 'q';
    if (V === VIEWS.side) return 'side';
    if (V === VIEWS.qback) return 'qback';
    if (V === VIEWS.back) return 'back';
    return 'front';
  }

  // ---------- Unified Geometry Builders (used identically by parts & measure) ----------
  function buildBodyPts(vk, u, J = 0) {
    let ctrl;
    if (vk === 'front' || vk === 'back') {
      ctrl = [
        [0, -9.08], [1.82, -8.72], [2.72, -7.75], [2.85, -6.72], [2.38, -5.45],
        [2.95, -4.05], [2.98, -2.48], [2.15, -1.18], [0, -.86],
        [-2.15, -1.18], [-2.98, -2.48], [-2.95, -4.05], [-2.38, -5.45],
        [-2.85, -6.72], [-2.72, -7.75], [-1.82, -8.72]
      ];
    } else if (vk === 'q') {
      ctrl = [
        [.08, -9.08], [1.92, -8.70], [2.84, -7.72], [2.96, -6.70], [2.46, -5.45],
        [3.04, -4.05], [3.08, -2.48], [2.18, -1.18], [.08, -.86],
        [-2.05, -1.20], [-2.85, -2.48], [-2.80, -4.05], [-2.32, -5.45],
        [-2.74, -6.72], [-2.55, -7.75], [-1.68, -8.74]
      ];
    } else if (vk === 'qback') {
      ctrl = [
        [-.08, -9.08], [1.68, -8.74], [2.55, -7.75], [2.74, -6.72], [2.32, -5.45],
        [2.80, -4.05], [2.85, -2.48], [2.05, -1.20], [-.08, -.86],
        [-2.18, -1.18], [-3.08, -2.48], [-3.04, -4.05], [-2.46, -5.45],
        [-2.96, -6.70], [-2.84, -7.72], [-1.92, -8.70]
      ];
    } else { // side (facing right)
      ctrl = [
        [-.04, -9.08], [1.45, -8.68], [2.22, -7.72], [2.30, -6.70], [1.98, -5.45],
        [2.52, -4.05], [2.60, -2.48], [1.85, -1.18], [0, -.86],
        [-1.78, -1.20], [-2.45, -2.48], [-2.40, -4.05], [-2.05, -5.45],
        [-2.28, -6.72], [-2.08, -7.75], [-1.35, -8.74]
      ];
    }
    return closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J), b * u + jit(J)]);
  }

  function buildCreamMaskPts(vk, u, J = 0) {
    let ctrl;
    if (vk === 'front') {
      ctrl = [
        [0, -7.86], [1.45, -8.12], [2.42, -7.32], [2.44, -6.15], [1.96, -5.22],
        [2.42, -3.88], [2.48, -2.38], [1.72, -1.26], [0, -1.04],
        [-1.72, -1.26], [-2.48, -2.38], [-2.42, -3.88], [-1.96, -5.22],
        [-2.44, -6.15], [-2.42, -7.32], [-1.45, -8.12]
      ];
    } else if (vk === 'q') {
      ctrl = [
        [.35, -7.88], [1.65, -8.02], [2.62, -7.32], [2.68, -6.22], [2.22, -5.25],
        [2.78, -3.90], [2.82, -2.40], [1.98, -1.28], [.28, -1.04],
        [-1.35, -1.30], [-1.98, -2.42], [-1.85, -3.90], [-1.32, -5.25],
        [-1.58, -6.22], [-1.38, -7.32], [-.65, -8.02]
      ];
    } else if (vk === 'side') {
      ctrl = [
        [.65, -7.88], [1.65, -7.85], [2.15, -7.12], [2.18, -6.12], [1.85, -5.25],
        [2.38, -3.90], [2.44, -2.40], [1.65, -1.28], [.28, -1.04],
        [-.48, -1.42], [-.65, -2.55], [-.55, -4.05], [-.32, -5.35],
        [-.22, -6.32], [-.10, -7.32], [.25, -7.92]
      ];
    } else {
      return null;
    }
    return closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J * .5), b * u + jit(J * .5)]);
  }

  function buildCrestPts(vk, u, o = {}, J = 0) {
    const bounce = Math.sin(bpOf(T) * Math.PI) * .08 + (o.psy ? .15 : 0);
    const shiftX = vk === 'q' ? .05 : vk === 'side' ? -.30 : vk === 'qback' ? -.05 : 0;
    const mirror = vk === 'qback' ? -1 : 1;
    const tuckHat = ['party', 'hard', 'crown', 'wizard', 'hood', 'top', 'fedora', 'beanie', 'cat'].includes(o.hat);
    const kH = tuckHat ? .22 : 1; // tuck tall upper spikes cleanly under full-crown hats
    const vX = vk === 'q' ? 1.15 : .04;
    const vY = vk === 'q' ? -7.86 : -7.82;
    const raw = [
      [vX, vY],
      [vk === 'q' ? 1.35 : .68, -8.38],
      [.58, lerp(-8.65, -9.28, kH)],
      [.22, lerp(-8.85, -10.18, kH)],
      [-.52, lerp(-8.90, -10.95, kH)],
      [-1.35 * (tuckHat ? .5 : 1), lerp(-8.92, -11.42 + bounce, kH)],
      [-1.02 * (tuckHat ? .5 : 1), lerp(-8.85, -10.42 + bounce * .7, kH)],
      [-2.05 * (tuckHat ? .55 : 1), lerp(-8.78, -10.48 + bounce * .6, kH)],
      [-1.35 * (tuckHat ? .6 : 1), lerp(-8.72, -9.76 + bounce * .4, kH)],
      [-2.14 * (tuckHat ? .65 : 1), lerp(-8.65, -9.58 + bounce * .3, kH)],
      [-1.32, -8.68],
      [vk === 'q' ? .38 : -.46, -8.46],
    ];
    const pts = raw.map(([px, py]) => [(px * mirror + shiftX) * u, py * u]);
    return {
      root: [(shiftX) * u, -8.55 * u],
      tip: [(-1.35 * mirror + shiftX) * u, (lerp(-8.92, -11.42 + bounce, kH)) * u],
      poly: closedThrough(pts, 2).map(([px, py]) => [px + jit(J * .4), py + jit(J * .4)]),
    };
  }

  function buildFlowerGeom(vk, u) {
    const pos = vk === 'front' ? [-1.76, -8.54]
      : vk === 'q' ? [-1.45, -8.56]
      : vk === 'side' ? [-1.12, -8.56]
      : vk === 'qback' ? [1.45, -8.56]
      : [1.72, -8.54];
    return { cx: pos[0] * u, cy: pos[1] * u, r: .31 * u };
  }

  function buildTailPts(vk, u, o = {}, J = 0) {
    const wag = (o.tailWag ?? 0) + Math.sin(bpOf(T) * Math.PI) * .12;
    const drawTwin = (f1, f2) => {
      const toP = c => closedThrough(c, 2).map(([a, b]) => [a * u + jit(J * .4), b * u + jit(J * .4)]);
      return {
        root: [f1[0][0] * u, f1[0][1] * u],
        tip: [f1[2][0] * u, f1[2][1] * u],
        poly: toP(f1),
        poly2: toP(f2),
        bands1: f1.bands.map(b => b.map(([bx, by]) => [bx * u, by * u])),
        bands2: f2.bands.map(b => b.map(([bx, by]) => [bx * u, by * u])),
      };
    };

    if (vk === 'back') {
      const f1 = [[.55, -2.05], [2.45, -2.68 + wag * .3], [4.25, -3.72 + wag], [3.05, -2.08 + wag * .3], [.85, -1.25]];
      const f2 = [[.62, -2.42], [2.25, -3.45 + wag * .4], [3.45, -4.65 + wag], [2.65, -2.78 + wag * .3], [.88, -1.62]];
      f1.bands = [
        [[1.95, -2.35], [2.75, -2.65 + wag * .2], [2.48, -1.96], [1.72, -1.72]],
        [[2.82, -2.85 + wag * .4], [3.55, -3.25 + wag * .6], [3.22, -2.48 + wag * .4], [2.56, -2.18]],
      ];
      f2.bands = [
        [[1.62, -2.88], [2.32, -3.38 + wag * .3], [2.35, -2.72 + wag * .2], [1.72, -2.28]],
        [[2.25, -3.58 + wag * .4], [2.90, -4.08 + wag * .6], [2.85, -3.35 + wag * .4], [2.28, -2.92]],
      ];
      return drawTwin(f1, f2);
    }

    const sx = vk === 'q' ? -.25 : vk === 'side' ? -.15 : vk === 'qback' ? -.35 : 0;
    const f1 = [[-1.62 + sx, -2.02], [-3.22 + sx, -2.68 + wag * .3], [-4.48 + sx, -3.72 + wag], [-3.42 + sx, -2.04 + wag * .3], [-1.78 + sx, -1.22]];
    const f2 = [[-1.68 + sx, -2.38], [-2.95 + sx, -3.48 + wag * .4], [-3.72 + sx, -4.68 + wag], [-3.02 + sx, -2.74 + wag * .3], [-1.82 + sx, -1.58]];
    f1.bands = [
      [[-2.58 + sx, -2.30], [-3.35 + sx, -2.62 + wag * .2], [-3.08 + sx, -1.92], [-2.36 + sx, -1.68]],
      [[-3.32 + sx, -2.84 + wag * .4], [-4.02 + sx, -3.26 + wag * .6], [-3.72 + sx, -2.46 + wag * .4], [-3.08 + sx, -2.18]],
    ];
    f2.bands = [
      [[-2.32 + sx, -2.88], [-2.98 + sx, -3.42 + wag * .3], [-2.88 + sx, -2.70 + wag * .2], [-2.28 + sx, -2.28]],
      [[-2.85 + sx, -3.58 + wag * .4], [-3.42 + sx, -4.12 + wag * .6], [-3.22 + sx, -3.32 + wag * .4], [-2.72 + sx, -2.92]],
    ];
    return drawTwin(f1, f2);
  }

  function buildFootPts(cx, footY, dir, tilt, u, J = 0) {
    // 3-toed slate-grey bird claw resting flat at footY (y = 0 at rest), ankle overlapping body
    const s = dir < 0 ? -1 : 1;
    const raw = [
      [-.18, -1.20],
      [.22, -1.20],
      [.26, -.58],
      [.98, -.16],      // outer toe
      [1.06, -.02],
      [.54, -.16],
      [.32, -.30],
      [.26, .02],       // middle toe (y = 0)
      [-.04, .02],
      [-.12, -.30],
      [-.36, -.16],
      [-.94, -.02],     // inner toe
      [-.84, -.18],
      [-.22, -.58],
    ];
    const cos = Math.cos(tilt), sin = Math.sin(tilt);
    const pts = raw.map(([rx, ry]) => {
      const lx = rx * s * u, ly = (ry + .5) * u;
      return [cx + lx * cos - ly * sin, footY + (lx * sin + ly * cos) - .5 * u];
    });
    return closedThrough(pts, 2).map(([px, py]) => [px + jit(J * .35), py + jit(J * .35)]);
  }

  function computeFeetTransforms(V, u, o = {}) {
    const hover = (o.dy || 0) < -.45 || (o.psychic || 0) > .2;
    const dangle = hover ? .14 * clamp(-(o.dy || 0) / 2 + (o.psychic || 0)) : 0;
    return V.legs.map(([lx, isFar, dir], i) => {
      let xOff = 0, yOff = dangle * .45, tilt = (i ? 1 : -1) * dangle * .55;
      if (o.walk != null) {
        const ph = (o.walk + i * .5) * TAU;
        xOff = Math.sin(ph) * .62;
        const lift = Math.max(0, Math.cos(ph));
        yOff -= lift * .65;
        tilt = Math.sin(ph) * .18;
      }
      return { cx: (lx + xOff) * u, footY: yOff * u, isFar, dir, tilt, i };
    });
  }

  function buildWingPts(vk, side, a, holdAmt, u, J = 0) {
    // Folded rest pose (a <= -0.15): rounded teardrop charcoal wings hugging belly with 3 cream scalloped bars.
    // Raised/flapping pose (a > -0.15): spreads cleanly outward/upward around shoulder without touching eyes/beak.
    const hold = clamp(holdAmt || 0);
    const flapT = clamp((a + .22) / 1.45); // 0 when resting at side, 1 when flapped high

    let restCtrl, flapCtrl, barSpecs;
    if (vk === 'side') {
      // In side view, folded wing sits along mid-flank; flapping wing sweeps BACKWARD-UP (away from forward beak!)
      restCtrl = [
        [-.25, -4.45], [-.95, -4.25], [-1.32, -3.15], [-1.05, -2.05], [-.25, -1.78],
        [.52, -2.15], [.72, -3.15], [.42, -4.18],
      ];
      const ang = clamp(a, -.2, 1.35);
      flapCtrl = [
        [-.35, -4.45], [-1.35, -4.55 - ang * .7], [-2.45, -4.15 - ang * 1.3], [-2.95, -3.35 - ang * 1.4],
        [-2.35, -2.65 - ang * .9], [-1.35, -2.75 - ang * .6], [-.55, -3.35], [-.15, -4.05],
      ];
    } else {
      const s = side;
      const sx = vk === 'q' ? (s < 0 ? .28 : .10) : vk === 'qback' ? (s < 0 ? -.10 : -.28) : 0;
      const rootX = s * 2.15 + sx;
      // Folded resting wing hugging the lower-outer belly (matches ref_woodpecker.jpg!)
      restCtrl = [
        [rootX, -4.55],
        [s * 2.82 + sx, -4.20],
        [s * 3.05 + sx, -3.02],
        [s * 2.75 + sx, -2.05],
        [s * 2.02 + sx, -1.78],
        [s * 1.42 + sx, -2.38],
        [s * 1.46 + sx, -3.45],
        [s * 1.72 + sx, -4.28],
      ];
      // Flapping/spread wing: for q far wing (side > 0), push wide outside beak tip & keep tip <= y=-5.15
      const liftY = vk === 'q' && s > 0 ? clamp(a, -.2, .75) * 1.35 : clamp(a, -.2, 1.35) * 2.15;
      const pushOut = vk === 'q' && s > 0 ? 1.55 : .95 + Math.max(0, a - .4) * .45;
      flapCtrl = [
        [rootX, -4.45],
        [s * (2.95 + pushOut * .45) + sx, -4.65 - liftY * .45],
        [s * (3.75 + pushOut) + sx, -4.35 - liftY * .95],
        [s * (3.92 + pushOut) + sx, -3.52 - liftY],
        [s * (3.35 + pushOut * .75) + sx, -2.92 - liftY * .7],
        [s * (2.52 + pushOut * .35) + sx, -2.98 - liftY * .35],
        [s * 1.98 + sx, -3.48],
        [s * 1.82 + sx, -4.15],
      ];
    }

    // Optional head-hold wing pose (for shared headache/psychic scenes, kept cleanly outside eyes & beak)
    let holdCtrl = flapCtrl;
    if (hold > .01 && vk !== 'side') {
      const s = side;
      if (vk === 'q' && s > 0) {
        holdCtrl = [
          [2.52, -3.65],
          [4.28, -4.28],
          [4.56, -6.28],
          [3.65, -8.15],
          [3.04, -8.02],
          [3.48, -6.45],
          [4.14, -5.12],
          [2.95, -4.10],
        ];
      } else {
        const sx = vk === 'q' ? .25 : 0;
        holdCtrl = [
          [s * 2.25 + sx, -4.35],
          [s * 3.65 + sx, -5.05],
          [s * 3.78 + sx, -6.55],
          [s * 3.35 + sx, -8.15],
          [s * 2.78 + sx, -8.05],
          [s * 2.62 + sx, -6.65],
          [s * 2.78 + sx, -5.35],
          [s * 1.95 + sx, -4.25],
        ];
      }
    }

    const active = restCtrl.map((p, idx) => {
      const mx = lerp(p[0], flapCtrl[idx][0], flapT);
      const my = lerp(p[1], flapCtrl[idx][1], flapT);
      return [lerp(mx, holdCtrl[idx][0], hold), lerp(my, holdCtrl[idx][1], hold)];
    });

    // Compute 3 crisp scalloped cream-white feather stripe polygons cleanly INSIDE the outer wing
    const bars = [];
    if (vk !== 'qback' || side > 0) {
      const pOuterTop = active[1], pOuterMid = active[2], pOuterLow = active[3];
      const pInTop = active[6], pInMid = active[5], pInLow = active[4];
      for (const fracY of [.22, .48, .74]) {
        const ox = lerp(pOuterTop[0], pOuterLow[0], fracY) * .55 + pOuterMid[0] * .45;
        const oy = lerp(pOuterTop[1], pOuterLow[1], fracY);
        const ix = lerp(pInTop[0], pInLow[0], fracY) * .65 + pInMid[0] * .35;
        const iy = lerp(pInTop[1], pInLow[1], fracY);
        const a0 = [lerp(ox, ix, .12), lerp(oy, iy, .12)];
        const a2 = [lerp(ox, ix, .74), lerp(oy, iy, .74)];
        const midX = (a0[0] + a2[0]) * .5, midY = (a0[1] + a2[1]) * .5 + .18;
        const th = .10;
        const barPoly = [
          [a0[0], a0[1] - th * .5],
          [lerp(a0[0], midX, .5), lerp(a0[1], midY, .5) + .04],
          [midX, midY - th * .4],
          [lerp(midX, a2[0], .5), lerp(midY, a2[1], .5) + .04],
          [a2[0], a2[1] - th * .4],
          [a2[0], a2[1] + th * .7],
          [lerp(midX, a2[0], .5), lerp(midY, a2[1], .5) + .16],
          [midX, midY + th * 1.1],
          [lerp(a0[0], midX, .5), lerp(a0[1], midY, .5) + .16],
          [a0[0], a0[1] + th * .7],
        ].map(([bx, by]) => [bx * u, by * u]);
        bars.push(barPoly);
      }
    }

    const rootPt = [(active[0][0] + active[7][0]) * .5 * u, (active[0][1] + active[7][1]) * .5 * u];
    const tipPt = [active[3][0] * u, active[3][1] * u];
    const poly = closedThrough(active, 2).map(([px, py]) => [px * u + jit(J * .4), py * u + jit(J * .4)]);
    return { root: rootPt, tip: tipPt, poly, bars };
  }

  function getArmHold(o, which) {
    if (Array.isArray(o.headHold)) return clamp(which === 'L' ? o.headHold[0] : o.headHold[1]);
    return clamp(o.headHold || 0);
  }

  function buildEyeGeometry(V, u, o = {}) {
    if (!V.face) return [];
    const F = V.face;
    const kinds = Array.isArray(o.eyes) ? o.eyes : o.eyes === 'wink' ? ['happy', 'normal'] : [o.eyes || 'normal', o.eyes || 'normal'];
    const sqz = clamp(o.squint || 0);
    return F.sides.map(s => {
      const specPos = F.eyePos && F.eyePos[String(s)];
      const cx = (specPos ? specPos[0] : s * F.eyeX) * u;
      const cy = (specPos ? specPos[1] : F.eyeY) * u;
      const kind = kinds[s < 0 ? 0 : 1];
      const widen = (kind === 'wide' || kind === 'scared') ? 1.05 : 1.0;
      const rx = (specPos ? specPos[2] : F.eyeRx) * widen * u;
      const ry = (specPos ? specPos[3] : F.eyeRy) * widen * (1 - sqz * .85) * u;
      const lx = clamp(o.lookX || 0, -1, 1) * rx * .45;
      const ly = clamp(o.lookY || 0, -1, 1) * ry * .42;
      return {
        side: s, kind, center: [cx, cy], rx, ry,
        pupil: [cx + lx, cy + ly],
        poly: ellPts(cx, cy, rx, Math.max(.08 * u, ry), 16),
      };
    });
  }

  function getMouthOpenness(o) {
    const m = o.mouth;
    if (o.lid && o.lid > .05) return clamp(o.lid, .15, .95);
    switch (m) {
      case 'o': return .35;
      case 'O': return .68;
      case 'open': return .55;
      case 'grin': return .35;
      case 'laugh': return .72;
      case 'wail': return .82;
      case 'yawn': return .78;
      default: return 0;
    }
  }

  function buildBeakGeometry(vk, u, o = {}, J = 0) {
    const open = getMouthOpenness(o);
    const lift = Math.min(.04, open * .05);
    const drop = open * .52;

    let upperCtrl, lowerCtrl, cavityCtrl, nostrils;
    if (vk === 'front') {
      // Sleek pointed chisel beak angled slightly down-right matching ref_woodpecker.jpg, strictly below y=-5.97 eyes
      upperCtrl = [
        [-.36, -5.56 - lift],
        [.10, -5.82 - lift],
        [1.05, -5.42 - lift * .5],
        [1.96, -4.96],
        [.85, -5.18 + open * .04],
        [-.28, -5.34],
      ];
      lowerCtrl = [
        [-.28, -5.34],
        [.82, -5.18],
        [1.76, -4.96 + drop * .55],
        [.75, -4.98 + drop * .82],
        [-.34, -5.22 + drop * .38],
      ];
      cavityCtrl = open > .08 ? [
        [-.16, -5.36], [1.45, -5.02 + drop * .22], [.72, -5.02 + drop * .72], [-.20, -5.22 + drop * .35],
      ] : null;
      nostrils = [[.06, -5.58 - lift]];
    } else if (vk === 'q') {
      upperCtrl = [
        [1.12, -5.82 - lift],
        [2.25, -5.52 - lift * .5],
        [3.78, -5.12],
        [2.40, -5.18 + open * .04],
        [1.06, -5.35],
      ];
      lowerCtrl = [
        [1.06, -5.35],
        [2.38, -5.18],
        [3.52, -5.08 + drop * .58],
        [2.25, -4.98 + drop * .78],
        [1.02, -5.12 + drop * .38],
      ];
      cavityCtrl = open > .08 ? [
        [1.18, -5.35], [3.20, -5.12 + drop * .22], [2.15, -5.02 + drop * .68], [1.14, -5.15 + drop * .32],
      ] : null;
      nostrils = [[1.52, -5.58 - lift]];
    } else if (vk === 'side') {
      upperCtrl = [
        [1.68, -5.84 - lift],
        [3.05, -5.60 - lift * .4],
        [4.52, -5.32],
        [3.02, -5.26 + open * .04],
        [1.64, -5.34],
      ];
      lowerCtrl = [
        [1.64, -5.34],
        [3.00, -5.26],
        [4.28, -5.28 + drop * .58],
        [2.95, -5.00 + drop * .78],
        [1.62, -4.98 + drop * .38],
      ];
      cavityCtrl = open > .08 ? [
        [1.76, -5.34], [3.95, -5.28 + drop * .22], [2.85, -5.05 + drop * .68], [1.74, -5.06 + drop * .32],
      ] : null;
      nostrils = [[2.15, -5.62 - lift]];
    } else {
      upperCtrl = [[-.36, -5.56], [.10, -5.82], [1.96, -4.96], [-.34, -5.22]];
      lowerCtrl = upperCtrl;
      cavityCtrl = null;
      nostrils = [];
    }

    const toPts = ctrl => closedThrough(ctrl, 2).map(([a, b]) => [a * u + jit(J * .25), b * u + jit(J * .25)]);
    const fullCtrl = vk === 'front'
      ? [[-.36, -5.56], [.10, -5.82], [1.05, -5.42], [1.96, -4.96], [.75, -5.02], [-.34, -5.22]]
      : vk === 'q'
      ? [[1.12, -5.82], [2.25, -5.52], [3.78, -5.12], [2.25, -5.00], [1.02, -5.12]]
      : [[1.68, -5.84], [3.05, -5.60], [4.52, -5.32], [2.95, -5.00], [1.62, -4.98]];

    return {
      open, drop,
      fullPoly: toPts(fullCtrl),
      upperPoly: toPts(upperCtrl),
      lowerPoly: toPts(lowerCtrl),
      cavityPoly: cavityCtrl ? toPts(cavityCtrl) : null,
      nostrils: nostrils.map(([nx, ny]) => [nx * u, ny * u]),
    };
  }

  // ---------- Parts Renderers ----------
  function drawWing(ctx, [, , which, layer]) {
    const { V, u, sw, J, o, rs } = ctx;
    rs('wing' + which);
    const vk = viewKey(V);
    const a = which === 'L' ? (o.aL ?? -.35) : (o.aR ?? -.35);
    const hold = getArmHold(o, which);
    const wing = buildWingPts(vk, which === 'L' ? -1 : 1, a, hold, u, J);
    const col = layer === 2 ? WP_PAL.bodyDk : WP_PAL.body;
    paint(wing.poly, { wash: col, washOp: 255, fill: WP_PAL.bodyLt, fillOp: 30, tex: .3, ink: null });
    for (const bar of wing.bars) {
      paint(bar, { wash: WP_PAL.cream, washOp: 245, ink: null });
    }
    paint(wing.poly, { ink: PAL.ink, sw: sw * .95 });
    const hook = which === 'L' ? o.armL : o.armR;
    if (hook) {
      push();
      translate(wing.tip[0], wing.tip[1]);
      if (which === 'L') scale(-1, 1);
      hook(u, sw);
      pop();
    }
  }

  function drawEyes(ctx) {
    const { V, u, sw, o } = ctx;
    const geom = buildEyeGeometry(V, u, o);
    const sqz = clamp(o.squint || 0);
    const sm = clamp(o.smear || 0);
    const kinds = Array.isArray(o.eyes) ? o.eyes : o.eyes === 'wink' ? ['happy', 'normal'] : [o.eyes || 'normal', o.eyes || 'normal'];

    if (sm > .5) {
      for (const e of geom) inkLine([[e.center[0] - e.rx * .8, e.center[1]], [e.center[0] + e.rx * .8, e.center[1]]], sw * 1.3, PAL.ink, 'ink', 0);
      return;
    }
    if (sqz > .82) {
      for (const e of geom) inkLine([[e.center[0] - e.rx * .75, e.center[1]], [e.center[0] + e.rx * .75, e.center[1]]], sw * 1.1, PAL.ink, 'ink', 0);
      return;
    }

    if (kinds[0] === 'shades' && geom.length) {
      if (geom.length > 1) {
        const L = geom[0], R = geom[1];
        inkLine([[L.center[0] + L.rx * .75, L.center[1] - .1 * u], [(L.center[0] + R.center[0]) / 2, L.center[1] - .28 * u], [R.center[0] - R.rx * .75, R.center[1] - .1 * u]], sw * .85, PAL.ink, 'ink', .5);
        inkLine([[L.center[0] - L.rx * .95, L.center[1] - .1 * u], [V.L * .86 * u, L.center[1] - .2 * u]], sw * .7, PAL.ink, 'ink', 0);
        inkLine([[R.center[0] + R.rx * .95, R.center[1] - .1 * u], [V.R * .86 * u, R.center[1] - .2 * u]], sw * .7, PAL.ink, 'ink', 0);
      } else {
        const E = geom[0];
        inkLine([[E.center[0] - E.rx * .9, E.center[1] - .1 * u], [V.L * .72 * u, E.center[1] - .22 * u]], sw * .7, PAL.ink, 'ink', 0);
      }
      for (const e of geom) {
        const rx = e.rx * 1.04, ry = e.ry * .92;
        paint(ellPts(e.center[0], e.center[1], rx, ry, 16), { wash: '#2A2740', ink: PAL.ink, sw: sw * .9 });
        inkLine([[e.center[0] - rx * .45, e.center[1] - ry * .2], [e.center[0] - rx * .1, e.center[1] - ry * .52]], sw * .45, PAL.cream, 'inkfine', 0);
      }
      return;
    }

    for (const e of geom) {
      const [cx, cy] = e.center, rx = e.rx, ry = e.ry, kind = e.kind, s = e.side;
      const blinkOn = ['normal', 'look', 'wide'].includes(kind) && ((T * .9 + (o.seed || 0) * 1.7) % 3.3) < .11;
      if (blinkOn) {
        inkLine([[cx - rx * .76, cy + ry * .12], [cx, cy + ry * .28], [cx + rx * .76, cy + ry * .12]], sw * 1.1, PAL.ink, 'ink', .4);
        continue;
      }

      const drawSclera = (fillCol = WP_PAL.cream) => {
        paint(ellPts(cx, cy, rx, ry, 18, .02 * u), { wash: fillCol, washOp: 255, ink: PAL.ink, sw: sw * .85 });
      };
      const drawPinPupil = (rScale = 1, jitterAmt = 0) => {
        const px = e.pupil[0] + (jitterAmt ? Math.sin(T * 42 + s) * jitterAmt * u : 0);
        const py = e.pupil[1] + (jitterAmt ? Math.cos(T * 37 + s) * jitterAmt * u : 0);
        paint(ellPts(px, py, .135 * u * rScale, .145 * u * rScale, 10), { wash: PAL.ink, ink: null });
      };

      switch (kind) {
        case 'normal': case 'look': case 'blank':
          drawSclera();
          if (kind !== 'blank') drawPinPupil();
          break;
        case 'wide':
          drawSclera();
          drawPinPupil(.88, .02);
          break;
        case 'psychic':
          glow(cx, cy, rx * 2.1, '#6BE5FF', .7);
          drawSclera('#B4F4FF');
          paint(ellPts(cx, cy, rx * .55, ry * .55, 14), { wash: '#FFFFFF', fill: '#6BE5FF', fillOp: 85, ink: null });
          paint(ellPts(e.pupil[0], e.pupil[1], .16 * u, .16 * u, 10), { wash: '#276A9E', ink: null });
          break;
        case 'happy':
          inkLine([[cx - rx * .70, cy + ry * .22], [cx, cy - ry * .52], [cx + rx * .70, cy + ry * .22]], sw * 1.25, PAL.ink, 'ink', .6);
          break;
        case 'closed':
          inkLine([[cx - rx * .70, cy - ry * .05], [cx, cy + ry * .42], [cx + rx * .70, cy - ry * .05]], sw * 1.2, PAL.ink, 'ink', .6);
          break;
        case 'squeeze':
          inkLine([[cx - rx * .42 * -s, cy - ry * .44], [cx + rx * .42 * -s, cy], [cx - rx * .42 * -s, cy + ry * .44]], sw * 1.15, PAL.ink, 'ink', 0);
          break;
        case 'sleepy':
          drawSclera();
          drawPinPupil(.9);
          paint([[cx - rx * .96, cy - ry * .02], [cx - rx * .72, cy - ry * .92], [cx, cy - ry * 1.02], [cx + rx * .72, cy - ry * .92], [cx + rx * .96, cy - ry * .02]], { wash: WP_PAL.creamDk, ink: PAL.ink, sw: sw * .65, curv: .35 });
          inkLine([[cx - rx * .92, cy], [cx + rx * .92, cy + ry * .06]], sw * .95, PAL.ink, 'ink', .2);
          break;
        case 'narrow':
          paint(ellPts(cx, cy, rx * .84, Math.max(.18 * u, ry * .32), 14), { wash: WP_PAL.cream, ink: PAL.ink, sw: sw * .8 });
          drawPinPupil(.9);
          break;
        case 'angry': case 'determined': {
          drawSclera();
          drawPinPupil(1.1);
          const tilt = kind === 'angry' ? .55 : .38;
          const yIn = cy - ry * .15 + tilt * ry * .4, yOut = cy - ry * .85;
          paint([[cx - rx * .96, s < 0 ? yOut : yIn], [cx + rx * .96, s < 0 ? yIn : yOut], [cx + rx * .78, cy - ry * 1.12], [cx - rx * .78, cy - ry * 1.12]], { wash: WP_PAL.creamDk, ink: PAL.ink, sw: sw * .7 });
          inkLine([[cx - rx * .94, s < 0 ? yOut : yIn], [cx + rx * .94, s < 0 ? yIn : yOut]], sw * 1.15, PAL.ink, 'ink', 0);
          break;
        }
        case 'sad': case 'teary': {
          drawSclera();
          drawPinPupil(1.1);
          const yIn = cy - ry * .85, yOut = cy - ry * .12;
          paint([[cx - rx * .96, s < 0 ? yOut : yIn], [cx + rx * .96, s < 0 ? yIn : yOut], [cx + rx * .78, cy - ry * 1.10], [cx - rx * .78, cy - ry * 1.10]], { wash: WP_PAL.creamDk, ink: PAL.ink, sw: sw * .65 });
          if (kind === 'teary') {
            const w = Math.sin(T * 9 + s) * .05 * u;
            paint(ellPts(cx, cy + ry * .52 + w, rx * .70, ry * .28, 12), { wash: PAL.sky, washOp: 220, fill: '#FFFFFF', fillOp: 70, ink: PAL.ink, sw: sw * .4 });
          }
          break;
        }
        case 'cry': {
          inkLine([[cx - rx * .65, cy + ry * .15], [cx, cy - ry * .25], [cx + rx * .65, cy + ry * .15]], sw * 1.15, PAL.ink, 'ink', .3);
          const streamX = cx + s * rx * .45;
          const R = []; for (let k = 0; k <= 5; k++) R.push([streamX + s * k * .14 * u + Math.sin(T * 8 + k + s) * .08 * u, cy + (.35 + k * .65) * u]);
          paint(ribbon(R, .35 * u, .68 * u), { wash: PAL.sky, washOp: 225, fill: '#FFFFFF', fillOp: 70, ink: PAL.ink, sw: sw * .45 });
          for (let k = 0; k < 2; k++) {
            const ph = frac(T * 1.8 + k * .5 + (s > 0 ? .25 : 0)), p = arcPt([streamX, cy + .4 * u], [streamX + s * 2.2 * u, cy + 2.2 * u], 1.1 * u, ph);
            paint(ellPts(p[0], p[1], .18 * u * (1 - ph * .4), .24 * u * (1 - ph * .4), 8), { wash: PAL.sky, ink: PAL.ink, sw: sw * .35 });
          }
          break;
        }
        case 'shine':
          drawSclera();
          paint(ellPts(e.pupil[0], e.pupil[1], rx * .45, ry * .50, 12), { wash: PAL.ink, ink: null });
          paint(ellPts(e.pupil[0] - rx * .15, e.pupil[1] - ry * .18, rx * .18, ry * .18, 8), { wash: PAL.cream, ink: null });
          paint(ellPts(e.pupil[0] + rx * .13, e.pupil[1] + ry * .16, rx * .09, ry * .09, 8), { wash: PAL.cream, ink: null });
          break;
        case 'scared':
          drawSclera();
          drawPinPupil(.8, .035);
          break;
        case 'spark':
          drawSclera();
          paint(starPts(cx, cy, Math.min(rx, ry) * .84 * (1 + .1 * Math.sin(T * 14))), { wash: PAL.ochre, fill: PAL.cream, fillOp: 80, ink: PAL.ink, sw: sw * .5 });
          break;
        case 'red':
          paint(ellPts(cx, cy, rx * 1.12, ry * 1.12, 16), { fill: '#E0283F', fillOp: 110, bleed: .3, ink: null });
          drawSclera('#FFD8DC');
          paint(ellPts(e.pupil[0], e.pupil[1], rx * .35, ry * .38, 10), { wash: '#E6223C', ink: PAL.ink, sw: sw * .4 });
          break;
        case 'heart':
          drawSclera();
          paint(heartPts(cx, cy + .06 * u, Math.min(rx, ry) * .78 * (1 + .1 * pulse(T))), { wash: '#E2476E', ink: PAL.ink, sw: sw * .45 });
          break;
        case 'x':
          drawSclera();
          inkLine([[cx - rx * .45, cy - ry * .45], [cx + rx * .45, cy + ry * .45]], sw * 1.05, PAL.ink, 'ink', 0);
          inkLine([[cx + rx * .45, cy - ry * .45], [cx - rx * .45, cy + ry * .45]], sw * 1.05, PAL.ink, 'ink', 0);
          break;
        case 'swirl': {
          drawSclera();
          const sp = [];
          for (let k = 0; k < 14; k++) {
            const a = k * .75 + T * 6 * s, r = k * .042 * Math.min(rx, ry) / .65;
            sp.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
          }
          inkLine(sp, sw * .6, PAL.ink, 'inkfine', .6);
          break;
        }
        case 'dot':
          drawSclera();
          drawPinPupil(1.5);
          break;
        default:
          drawSclera();
          drawPinPupil();
      }
    }
  }

  function drawBeak(ctx) {
    const { V, u, sw, J, o } = ctx;
    const vk = viewKey(V);
    const beak = buildBeakGeometry(vk, u, o, J);
    const m = o.mouth;
    if (beak.open > .08) {
      paint(beak.lowerPoly, { wash: WP_PAL.beakDk, washOp: 255, ink: PAL.ink, sw: sw * .95 });
      if (beak.cavityPoly) {
        paint(beak.cavityPoly, { wash: WP_PAL.mouthDark, washOp: 255, ink: PAL.ink, sw: sw * .55 });
        const tx = vk === 'front' ? .55 * u : vk === 'q' ? 2.15 * u : 2.75 * u;
        const ty = (-5.12 + beak.drop * .42) * u;
        paint(ellPts(tx, ty, .36 * u, .16 * u, 10), { wash: PAL.rose, ink: null });
      }
      paint(beak.upperPoly, { wash: WP_PAL.beak, washOp: 255, fill: WP_PAL.beakLt, fillOp: 45, tex: .3, ink: PAL.ink, sw: sw * .95 });
    } else {
      paint(beak.fullPoly, { wash: WP_PAL.beak, washOp: 255, fill: WP_PAL.beakLt, fillOp: 40, tex: .3, ink: PAL.ink, sw: sw * .98 });
      // Crisp beak center line / subtle expression seam
      const seam = vk === 'front' ? [[-.28, -5.36], [.95, -5.20], [1.88, -4.98]]
        : vk === 'q' ? [[1.08, -5.36], [2.42, -5.22], [3.68, -5.12]]
        : [[1.66, -5.35], [3.02, -5.32], [4.42, -5.32]];
      const sOff = m === 'smile' ? .08 : m === 'frown' ? -.08 : 0;
      inkLine([[seam[0][0] * u, seam[0][1] * u], [seam[1][0] * u, (seam[1][1] + sOff) * u], [seam[2][0] * u, seam[2][1] * u]], sw * .65, PAL.ink, 'ink', .4);
      if (m === 'tongue') {
        paint(ellPts(seam[1][0] * u, (seam[1][1] + .18) * u, .28 * u, .22 * u, 10), { wash: PAL.rose, ink: PAL.ink, sw: sw * .45 });
      }
    }
    for (const [nx, ny] of beak.nostrils) {
      paint(ellPts(nx, ny, .08 * u, .05 * u, 8), { wash: PAL.ink, ink: null });
    }
  }

  function drawBlush(u, V, b) {
    const F = V.face;
    if (!F) return;
    const amt = Math.max(.45, b || 0); // Woodpecker always sports subtle cute rosy cheek marks
    for (const s of F.sides) {
      const bx = (F.eyePos && F.eyePos[String(s)]) ? F.eyePos[String(s)][0] + (s > 0 ? .22 : -.32) * u : s * F.bx * u;
      const by = F.by * u;
      paint(ellPts(bx, by, .48 * u, .25 * u, 12), { fill: WP_PAL.blush, fillOp: 185 * clamp(amt), bleed: .15, ink: null });
      for (const k of [-.14, .14]) {
        inkLine([[bx + (k - .05) * u, by + .12 * u], [bx + (k + .08) * u, by - .12 * u]], u * .032, mixCol(WP_PAL.blush, PAL.ink, .25), 'inkfine', 0);
      }
    }
  }

  function drawGloom(u, sw, V, g) {
    const L = (V.L + .6) * u, R = (V.R - .6) * u;
    paint(ellPts((L + R) / 2, -8.3 * u, (R - L) * .42, .8 * u, 16), { fill: PAL.indigo, fillOp: 145 * g, bleed: .08, tex: .5, ink: null });
    const n = 6;
    for (let i = 0; i < n; i++) {
      const gx = lerp(L + .55 * u, R - .55 * u, i / (n - 1));
      inkLine([[gx, -8.8 * u], [gx + jit(u * .04), (-8.8 + 1.6 * g * (.7 + .3 * hash(i))) * u]], sw * .42, PAL.ink, 'inkfine', 0);
    }
  }

  function drawTailAndBands(ctx, tail) {
    const { sw } = ctx;
    const paintFeather = (poly, bands) => {
      paint(poly, { wash: WP_PAL.body, washOp: 255, fill: WP_PAL.bodyLt, fillOp: 30, tex: .3, ink: null });
      for (const b of bands) paint(b, { wash: WP_PAL.cream, washOp: 255, ink: null });
      paint(poly, { ink: PAL.ink, sw: sw * .85 });
    };
    paintFeather(tail.poly2, tail.bands2);
    paintFeather(tail.poly, tail.bands1);
  }

  CharacterRegistry.register('woodpecker', {
    id: 'woodpecker',
    name: 'Woodpecker',
    palette: WP_PAL,
    metrics: {
      width: 6.4, height: 11.4,
      shadowWidth: 6.4, shadowRx: 3.1, shadowRy: .72,
      hatY: -9.12, hatW: .62,
      emoteTop: [0, -12.6], emoteSide: [3.75, -9.4],
      jitter: .05, swScale: 1.05,
    },
    views: VIEWS,
    emotionChannels: ['headHold', 'tailWag'],
    emotionOverrides: {
      neutral: {
        eyes: 'normal', blush: .45, take: .3, tailWag: 0,
        body: t => {
          const b = _b(t);
          return { dy: -.18 * b.ab, sq: .025 * b.hit, aL: -.38 + .04 * b.s1, aR: -.38 - .04 * b.s1, tailWag: .08 * b.s1 };
        }
      },
      peck: {
        eyes: 'determined', mouth: 'flat', blush: .55, take: .7,
        body: t => {
          // Rapid woodpecker triple-tap rhythm locked to the beat
          const ph = frac(bpOf(t) * 2);
          const tap = Math.pow(Math.max(0, Math.sin(ph * Math.PI * 3)), 2);
          const recoil = Math.sin(ph * TAU * 3);
          return {
            rot: .24 * tap,
            dx: .35 * tap,
            dy: -.18 * Math.abs(recoil),
            sq: .06 * tap,
            aL: .35 + .45 * Math.sin(t * 28),
            aR: .35 - .45 * Math.sin(t * 28),
            tailWag: .22 * recoil,
          };
        }
      },
      flutter: {
        eyes: 'happy', mouth: 'open', blush: .65, emote: 'spark', take: .8,
        body: t => {
          const flap = Math.sin(t * TAU * 7);
          return {
            dy: -1.55 + .35 * Math.sin(t * TAU * 2),
            sq: -.04 + .04 * flap,
            rot: .04 * Math.sin(t * TAU),
            aL: .55 + .55 * flap,
            aR: .55 + .55 * flap,
            tailWag: .20 * flap,
          };
        }
      },
      headache: {
        eyes: 'wide', mouth: 'wobble', emote: 'sweat', headHold: [1, 1], take: .9,
        body: t => ({ dx: .10 * Math.sin(t * TAU * 14), rot: .04 * Math.sin(t * TAU * 3), sq: .06, headHold: [1, 1] })
      },
      psychic: {
        eyes: 'psychic', mouth: 'open', tint: '#D8B8FF', tintK: .2, emote: 'psychic', headHold: [.9, .9], take: 1.1,
        body: t => ({ dy: -1.6 + .28 * Math.sin(t * TAU * .7), sq: -.04, headHold: [.9, .9] })
      },
    },
    parts: {
      backAppendages: ctx => {
        const { V, u, sw, J, o, rs } = ctx;
        const vk = viewKey(V);
        if (V.tailLayer === 'back') {
          rs('tail');
          drawTailAndBands(ctx, buildTailPts(vk, u, o, J));
        }
        if (vk === 'qback') {
          rs('qbackBeak');
          paint(closedThrough([[2.35, -5.78], [4.18, -5.18], [2.42, -5.06]], 2).map(([a, b]) => [a * u, b * u]), { wash: WP_PAL.beak, washOp: 255, ink: PAL.ink, sw: sw * .9 });
        }
      },
      farArms: ctx => ctx.V.arms.filter(a => a[3] !== 1).forEach(a => drawWing(ctx, a)),
      legs: ctx => {
        const { V, u, sw, J, o, rs } = ctx;
        const feet = computeFeetTransforms(V, u, o);
        for (const f of feet) {
          rs('leg' + f.i);
          const poly = buildFootPts(f.cx, f.footY, f.dir, f.tilt, u, J);
          paint(poly, { wash: f.isFar ? WP_PAL.beakDk : WP_PAL.beak, washOp: 255, ink: PAL.ink, sw: sw * .88 });
        }
      },
      body: ctx => {
        const { V, u, sw, J, o, cols, rs } = ctx;
        rs('body');
        const vk = viewKey(V);
        const bodyPoly = buildBodyPts(vk, u, J);
        // Charcoal plumage base
        paint(bodyPoly, { wash: cols.col, washOp: 255, ink: null });
        paint(ellPts(vk === 'side' ? -.5 * u : -1.1 * u, -7.8 * u, 1.3 * u, .75 * u, 14, J, -.2), { fill: cols.lt, fillOp: 85, bleed: .2, tex: .6, ink: null });
        // Cream face-and-belly hourglass patch for front/q/side
        const maskPoly = buildCreamMaskPts(vk, u, J);
        if (maskPoly) {
          paint(maskPoly, { wash: WP_PAL.cream, washOp: 255, ink: null });
          paint(ellPts(vk === 'side' ? .8 * u : 0, -1.75 * u, (vk === 'side' ? 1.15 : 1.85) * u, .58 * u, 14, J), { fill: WP_PAL.creamDk, fillOp: 120, bleed: .08, tex: .55, ink: null });
        } else {
          paint(ellPts(0, -1.7 * u, 1.8 * u, .65 * u, 14, J), { fill: cols.dk, fillOp: 110, bleed: .08, ink: null });
        }
        // Single crisp ink outline around body
        paint(bodyPoly, { ink: PAL.ink, sw: sw * 1.08 });
        if (o.gloom > .02) drawGloom(u, sw, V, o.gloom);

        // Sweeping crimson 3-spike crest & cute 5-petal pink blossom
        rs('crest');
        const crest = buildCrestPts(vk, u, o, J);
        paint(crest.poly, { wash: WP_PAL.crest, washOp: 255, fill: WP_PAL.crestLt, fillOp: 70, tex: .4, ink: PAL.ink, sw: sw * .98 });
        if (o.hat !== 'flower') {
          rs('flower');
          const fl = buildFlowerGeom(vk, u);
          for (let i = 0; i < 5; i++) {
            const ang = i / 5 * TAU - .2;
            paint(ellPts(fl.cx + Math.cos(ang) * fl.r * 1.18, fl.cy + Math.sin(ang) * fl.r * 1.18, fl.r * .95, fl.r * .95, 10), { wash: WP_PAL.flower, ink: PAL.ink, sw: sw * .45 });
          }
          paint(ellPts(fl.cx, fl.cy, fl.r * .75, fl.r * .75, 10), { wash: WP_PAL.flowerCenter, ink: PAL.ink, sw: sw * .4 });
        }
      },
      frontAppendages: ctx => {
        const { V, u, J, o, rs } = ctx;
        if (V.tailLayer === 'front') {
          rs('tail');
          drawTailAndBands(ctx, buildTailPts(viewKey(V), u, o, J));
        }
      },
      face: ctx => {
        const { V, u, sw, o, rs } = ctx;
        drawBlush(u, V, o.blush === true ? 1 : o.blush);
        if (o.hat === 'mask' && V.face.sides.length > 1) {
          drawSharedFaceAccessory(u, 'mask', sw, V.face.sides, V.face);
        }
        rs('eyes');
        drawEyes(ctx);
        rs('mouth');
        drawBeak(ctx);
        if (['cat', 'masq', 'bowtie'].includes(o.hat)) {
          drawSharedFaceAccessory(u, o.hat, sw, V.face.sides, V.face);
        }
      },
      hat: ctx => {
        const { V, u, sw, o, cols, rs } = ctx;
        rs('hat');
        push();
        translate(V.hat * u, 0);
        scale(V.hw / .62, 1);
        drawSharedHat(u, o.hat, sw, {
          y: V.hatY, w: .62, bandY: V.bandY, bandW: V.bandW,
          earX: V.earX, earY: V.earY, bodyCol: cols.col,
        });
        pop();
      },
      nearArms: ctx => ctx.V.arms.filter(a => a[3] === 1).forEach(a => drawWing(ctx, a)),
    },
    measure(x, y, u, o = {}) {
      const V = VIEWS[o.view] || VIEWS.front;
      const vk = viewKey(V);
      const dy = (o.dy || 0) * u;
      const sq = (o.sq || 0) + (o.take || 0);
      const flip = o.flip ? -1 : 1;
      const sx = flip * (o.sx ?? 1) * (1 + sq * .6);
      const sy = (o.sy ?? 1) * (1 - sq);
      const ox = x + (o.dx || 0) * u, oy = y + dy;
      const rot = o.rot || 0, cos = Math.cos(rot), sin = Math.sin(rot);
      const xform = ([lx, ly]) => {
        const px = lx * sx, py = ly * sy;
        return [ox + px * cos - py * sin, oy + px * sin + py * cos];
      };
      const xformPoly = pts => pts.map(xform);

      const bodyLocal = buildBodyPts(vk, u, 0);
      const eyesLocal = buildEyeGeometry(V, u, o);
      const beakLocal = V.face ? buildBeakGeometry(vk, u, o, 0) : null;
      const armsLocal = V.arms.map(([, , which]) => {
        const a = which === 'L' ? (o.aL ?? -.35) : (o.aR ?? -.35);
        const hold = getArmHold(o, which);
        const res = buildWingPts(vk, which === 'L' ? -1 : 1, a, hold, u, 0);
        return { which, root: res.root, tip: res.tip, poly: res.poly };
      });
      const crestLocal = buildCrestPts(vk, u, o, 0);
      const tailLocal = buildTailPts(vk, u, o, 0);
      const feetPolys = computeFeetTransforms(V, u, o).map(f => buildFootPts(f.cx, f.footY, f.dir, f.tilt, u, 0));

      let feetBottomY = -Infinity;
      for (const fp of feetPolys) for (const [, py] of fp) if (py > feetBottomY) feetBottomY = py;

      const allLocal = [...bodyLocal, ...feetPolys.flat(), ...crestLocal.poly, ...armsLocal.flatMap(a => a.poly), ...tailLocal.poly];
      if (beakLocal) allLocal.push(...beakLocal.fullPoly);
      const hasNaN = allLocal.some(([a, b]) => !Number.isFinite(a) || !Number.isFinite(b));

      const worldPts = xformPoly(allLocal);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [wx, wy] of worldPts) {
        if (wx < x0) x0 = wx; if (wx > x1) x1 = wx;
        if (wy < y0) y0 = wy; if (wy > y1) y1 = wy;
      }

      return {
        charId: 'woodpecker',
        view: vk,
        flip: !!o.flip,
        feetBottomY,
        bodyPoly: xformPoly(bodyLocal),
        bodyPolyLocal: bodyLocal,
        eyes: eyesLocal.map(e => ({
          side: e.side, kind: e.kind,
          center: xform(e.center), centerLocal: e.center,
          rx: e.rx, ry: e.ry, pupilLocal: e.pupil,
          poly: xformPoly(e.poly), polyLocal: e.poly,
        })),
        billPoly: beakLocal ? xformPoly(beakLocal.fullPoly) : null,
        billPolyLocal: beakLocal ? beakLocal.fullPoly : null,
        upperBillPolyLocal: beakLocal ? beakLocal.upperPoly : null,
        lowerBillPolyLocal: beakLocal ? beakLocal.lowerPoly : null,
        openMouthPolyLocal: beakLocal ? beakLocal.cavityPoly : null,
        nostrilsLocal: beakLocal ? beakLocal.nostrils : [],
        arms: armsLocal.map(a => ({
          which: a.which, root: xform(a.root), rootLocal: a.root,
          tipLocal: a.tip, poly: xformPoly(a.poly), polyLocal: a.poly,
        })),
        hairFeathers: [{ rootLocal: crestLocal.root, tipLocal: crestLocal.tip, polyLocal: crestLocal.poly }],
        tail: { rootLocal: tailLocal.root, tipLocal: tailLocal.tip, polyLocal: tailLocal.poly },
        feetPolysLocal: feetPolys,
        hatAnchor: { y: V.hatY * u, w: V.hw, bandY: V.bandY * u, bandW: V.bandW },
        hasNaN,
        worldBBox: [x0, y0, x1, y1],
      };
    },
  });
})();
