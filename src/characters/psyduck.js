// psyduck.js: Psyduck (可达鸭) character blueprint registered in CharacterRegistry.
// Designed directly from assets/ref_psyduck.jpg using unified contour builders shared between drawing and measure().
(() => {
  const PSY_PAL = {
    body: '#F4B618',
    bodyDk: '#D48E0C',
    bodyLt: '#FCD762',
    beak: '#F9ECA8',
    beakDk: '#DFC770',
    beakLt: '#FFF7D4',
    sclera: '#FBF7EE',
    mouthDark: '#4D1E2A',
    psychicGlow: '#6BE5FF',
    psychicAura: '#B288FF',
  };

  // View definitions: face metrics keep eyes & bill strictly separated and well inside head silhouettes.
  const VIEWS = {
    front: {
      L: -3.45, R: 3.45,
      hat: 0, hw: .66, hatY: -9.15, bandY: -8.38, bandW: .50, earX: 3.05, earY: -7.1,
      emoteTop: [0, -12.2], emoteSide: [4.05, -9.4],
      smearTop: 9.0, smearSpan: 1.9,
      face: { cx: 0, fw: 1, sides: [-1, 1], eyeX: 1.38, eyeY: -7.08, eyeRx: .94, eyeRy: .73, bx: 2.38, by: -6.02, cheekX: 2.95, cheekY: -6.5, neckY: -3.2 },
      legs: [[-1.48, 0, -1], [1.48, 0, 1]],
      arms: [[-3.05, -1, 'L', 1], [3.05, 1, 'R', 1]],
      tailLayer: 'back',
    },
    q: {
      L: -3.25, R: 3.45,
      hat: .15, hw: .64, hatY: -9.15, bandY: -8.38, bandW: .49, earX: 2.95, earY: -7.1,
      emoteTop: [.2, -12.2], emoteSide: [4.1, -9.4],
      smearTop: 9.0, smearSpan: 1.9,
      face: {
        cx: 0, fw: 1, sides: [-1, 1],
        eyeX: 1.12, eyeY: -7.10, eyeRx: .98, eyeRy: .69,
        eyePos: { '-1': [.18, -7.10, .84, .69], '1': [2.04, -7.10, .62, .65] },
        bx: -.55, by: -6.02, cheekX: 2.5, cheekY: -6.5, neckY: -3.2,
      },
      legs: [[1.35, 1, 1], [-.65, 0, 1]],
      arms: [[2.85, 1, 'R', 2], [-2.55, -1, 'L', 1]],
      tailLayer: 'back',
    },
    side: {
      L: -2.65, R: 2.75,
      hat: -.05, hw: .54, hatY: -9.15, bandY: -8.38, bandW: .44, earX: 2.35, earY: -7.1,
      emoteTop: [0, -12.2], emoteSide: [3.4, -9.4],
      smearTop: 9.0, smearSpan: 1.9,
      face: {
        cx: 0, fw: 1, sides: [1],
        eyeX: 1.05, eyeY: -7.10, eyeRx: .72, eyeRy: .68,
        eyePos: { '1': [1.05, -7.10, .72, .68] },
        bx: .25, by: -6.02, cheekX: 1.9, cheekY: -6.5, neckY: -3.2,
      },
      legs: [[.55, 1, 1], [-.35, 0, 1]],
      arms: [[0, 0, 'L', 1]],
      tailLayer: 'back',
    },
    qback: {
      L: -3.45, R: 3.25,
      hat: -.15, hw: .64, hatY: -9.15, bandY: -8.35, bandW: .49, earX: 2.95, earY: -7.1,
      emoteTop: [-.2, -12.1], emoteSide: [3.8, -9.2],
      smearTop: 9.0, smearSpan: 1.9,
      face: null,
      legs: [[1.25, 1, 1], [-.75, 0, 1]],
      arms: [[-2.85, -1, 'R', 2], [2.55, 1, 'L', 1]],
      tailLayer: 'front',
    },
    back: {
      L: -3.45, R: 3.45,
      hat: 0, hw: .66, hatY: -9.15, bandY: -8.35, bandW: .50, earX: 3.05, earY: -7.1,
      emoteTop: [0, -12.1], emoteSide: [3.85, -9.2],
      smearTop: 9.0, smearSpan: 1.9,
      face: null, back: true,
      legs: [[-1.48, 0, -1], [1.48, 0, 1]],
      arms: [[-3.05, -1, 'R', 1], [3.05, 1, 'L', 1]],
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
        [0, -9.15], [1.72, -8.84], [2.70, -7.82], [2.94, -6.92], [2.62, -5.65],
        [3.32, -4.15], [3.45, -2.55], [2.46, -1.16], [0, -.72],
        [-2.46, -1.16], [-3.45, -2.55], [-3.32, -4.15], [-2.62, -5.65],
        [-2.94, -6.92], [-2.70, -7.82], [-1.72, -8.84]
      ];
    } else if (vk === 'q') {
      ctrl = [
        [.10, -9.15], [1.85, -8.82], [2.88, -7.82], [3.04, -6.92], [2.68, -5.65],
        [3.38, -4.15], [3.45, -2.55], [2.45, -1.16], [.08, -.72],
        [-2.25, -1.18], [-3.22, -2.55], [-3.12, -4.15], [-2.58, -5.65],
        [-2.82, -6.95], [-2.50, -7.85], [-1.52, -8.85]
      ];
    } else if (vk === 'qback') {
      ctrl = [
        [-.10, -9.15], [1.52, -8.85], [2.50, -7.85], [2.82, -6.95], [2.58, -5.65],
        [3.12, -4.15], [3.22, -2.55], [2.25, -1.18], [-.08, -.72],
        [-2.45, -1.16], [-3.45, -2.55], [-3.38, -4.15], [-2.68, -5.65],
        [-3.04, -6.92], [-2.88, -7.82], [-1.85, -8.82]
      ];
    } else { // side (facing right)
      ctrl = [
        [-.05, -9.15], [1.45, -8.78], [2.25, -7.80], [2.36, -6.92], [2.05, -5.62],
        [2.65, -4.15], [2.72, -2.55], [1.95, -1.16], [0, -.72],
        [-1.88, -1.18], [-2.60, -2.55], [-2.52, -4.15], [-2.18, -5.65],
        [-2.38, -6.95], [-2.12, -7.85], [-1.35, -8.82]
      ];
    }
    const smooth = closedThrough(ctrl, 3);
    return smooth.map(([a, b]) => [a * u + jit(J), b * u + jit(J)]);
  }

  function buildHairFeathers(vk, u, o = {}, J = 0) {
    const psy = clamp(o.psychic || 0);
    const sway = Math.sin(T * 5) * .04 * (1 + psy * 2.5);
    const shiftX = vk === 'q' ? -.22 : vk === 'side' ? -.52 : vk === 'qback' ? .22 : 0;
    const mirror = vk === 'qback' ? -1 : 1;
    // Bold 3 black feathers anchored cleanly inside crown (-8.86 < -9.15) matching reference image
    const specs = [
      { root: [-.34, -8.84], tip: [-1.52, -10.18 - psy * .25], w0: .36, w1: .28 },
      { root: [-.08, -8.88], tip: [-.88, -10.98 - psy * .35], w0: .40, w1: .30 },
      { root: [.18, -8.86], tip: [.14, -10.76 - psy * .30], w0: .36, w1: .26 },
    ];
    return specs.map(sp => {
      const rx = (sp.root[0] * mirror + shiftX) * u;
      const ry = sp.root[1] * u;
      const tx = (sp.tip[0] * mirror + shiftX + sway) * u;
      const ty = sp.tip[1] * u;
      const dx = tx - rx, dy = ty - ry, len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const midX = (rx + tx) * .5 + nx * .06 * u, midY = (ry + ty) * .5 + ny * .06 * u;
      const w0 = sp.w0 * u, w1 = sp.w1 * u;
      const poly = [
        [rx - nx * w0 * .5, ry - ny * w0 * .5],
        [midX - nx * w1 * .52, midY - ny * w1 * .52],
        [tx - nx * w1 * .46 + dx / len * .05 * u, ty - ny * w1 * .46 + dy / len * .05 * u],
        [tx + dx / len * .16 * u, ty + dy / len * .16 * u],
        [tx + nx * w1 * .46 + dx / len * .05 * u, ty + ny * w1 * .46 + dy / len * .05 * u],
        [midX + nx * w1 * .52, midY + ny * w1 * .52],
        [rx + nx * w0 * .5, ry + ny * w0 * .5],
      ].map(([px, py]) => [px + jit(J * .35), py + jit(J * .35)]);
      return { root: [rx, ry], tip: [tx, ty], poly };
    });
  }

  function buildTailPts(vk, u, o = {}, J = 0) {
    const wag = (o.tailWag ?? 0) + Math.sin(bpOf(T) * Math.PI) * .12;
    let ctrl;
    if (vk === 'front') {
      ctrl = [[-1.65, -1.65], [-2.85, -2.02 + wag * .3], [-4.12, -2.92 + wag], [-3.10, -1.35 + wag * .4], [-1.80, -.96]];
    } else if (vk === 'q') {
      ctrl = [[-1.95, -1.70], [-3.15, -2.05 + wag * .3], [-4.35, -2.85 + wag], [-3.35, -1.35 + wag * .4], [-2.05, -1.02]];
    } else if (vk === 'side') {
      ctrl = [[-1.55, -1.72], [-2.85, -2.08 + wag * .3], [-4.05, -2.88 + wag], [-2.95, -1.36 + wag * .4], [-1.62, -1.05]];
    } else if (vk === 'qback') {
      ctrl = [[-1.15, -1.55], [-2.45, -1.92 + wag * .3], [-3.85, -2.72 + wag], [-2.75, -1.25 + wag * .4], [-1.35, -.95]];
    } else { // back: centered on spine sweeping right (mirrors front view's left-curve)
      ctrl = [[.35, -1.48], [1.85, -1.95 + wag * .3], [3.55, -2.78 + wag], [2.25, -1.22 + wag * .4], [.55, -.92]];
    }
    const pts = closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J * .5), b * u + jit(J * .5)]);
    return { root: [ctrl[0][0] * u, ctrl[0][1] * u], tip: [ctrl[2][0] * u, ctrl[2][1] * u], poly: pts };
  }

  function buildFootPts(cx, footY, dir, tilt, u, J = 0) {
    // One smooth 3-toed cream webbed duck foot resting flat at footY (0 in rest pose), heel overlapping belly
    const s = dir < 0 ? -1 : 1;
    const raw = [
      [0, -1.12],
      [.54, -.86],
      [.90, -.36],
      [1.14, -.02],     // outer toe tip
      [.58, -.20],
      [.44, -.36],
      [.18, .02],      // middle toe tip (y = 0)
      [-.18, -.36],
      [-.32, -.20],
      [-.92, -.02],    // inner toe tip
      [-.70, -.42],
      [-.50, -.90],
    ];
    const cos = Math.cos(tilt), sin = Math.sin(tilt);
    const pts = raw.map(([rx, ry]) => {
      const lx = rx * s * u, ly = (ry + .5) * u;
      return [cx + lx * cos - ly * sin, footY + (lx * sin + ly * cos) - .5 * u];
    });
    return closedThrough(pts, 2).map(([px, py]) => [px + jit(J * .4), py + jit(J * .4)]);
  }

  function computeFeetTransforms(V, u, o = {}) {
    const hover = (o.dy || 0) < -.45 || (o.psychic || 0) > .2;
    const dangle = hover ? .14 * clamp(-(o.dy || 0) / 2 + (o.psychic || 0)) : 0;
    return V.legs.map(([lx, isFar, dir], i) => {
      let xOff = 0, yOff = dangle * .45, tilt = (i ? 1 : -1) * dangle * .6;
      if (o.walk != null) {
        const ph = (o.walk + i * .5) * TAU;
        xOff = Math.sin(ph) * .68;
        const lift = Math.max(0, Math.cos(ph));
        yOff -= lift * .62;
        tilt = Math.sin(ph) * .16;
      }
      return { cx: (lx + xOff) * u, footY: yOff * u, isFar, dir, tilt, i };
    });
  }

  function buildArmPts(vk, side, a, holdAmt, u, J = 0) {
    // side: -1 for left arm (screen-left in front), +1 for right arm
    const hold = clamp(holdAmt || 0);

    // 1) Standard rotating flipper around shoulder (root stays strictly inside torso silhouette!)
    let rx, ry, rotAng, armLen = 2.48;
    if (vk === 'front' || vk === 'back') {
      rx = side * 2.68; ry = -4.05;
      rotAng = side < 0 ? clamp(a, -1.25, 1.35) : -clamp(a, -1.25, 1.35);
    } else if (vk === 'q') {
      if (side < 0) {
        rx = -2.38; ry = -4.05;
        rotAng = clamp(a, -1.25, 1.35);
      } else {
        // Far arm in 3/4 view sits below bill & pushes wide outside projecting bill tip when raised
        rx = 2.85; ry = -3.42;
        rotAng = -clamp(a, -1.1, .45);
        armLen = 2.35;
      }
    } else if (vk === 'qback') {
      rx = side < 0 ? -2.65 : 2.35; ry = -4.02;
      rotAng = side < 0 ? clamp(a, -1.25, 1.35) : -clamp(a, -1.25, 1.35);
    } else { // side: hang naturally DOWNWARD along the flank (+y is down) so arm never collides with bill
      rx = -.35; ry = -4.15;
      rotAng = 1.38 - clamp(a, -1.0, 1.45) * .42;
      armLen = 2.05;
    }

    const sDir = vk === 'side' ? 1 : side;
    const localStd = [
      [0, -.42],
      [.92 * sDir, -.64],
      [1.78 * sDir, -.56],
      [(armLen - .14) * sDir, -.50],   // finger 1 (top)
      [(armLen + .18) * sDir, -.30],
      [(armLen - .24) * sDir, -.12],
      [(armLen + .28) * sDir, .02],    // finger 2 (middle)
      [(armLen - .24) * sDir, .18],
      [(armLen + .12) * sDir, .36],    // finger 3 (bottom)
      [(armLen - .22) * sDir, .52],
      [1.60 * sDir, .60],
      [.75 * sDir, .58],
      [0, .42],
    ];
    // Push mid-arm & tip (never root vertices 0 & 12) outward when raised so raised flippers wrap wide around cheeks/bill
    const raise = Math.max(0, clamp(a) - .35);
    const qFarPush = (vk === 'q' && side > 0) ? Math.max(0, clamp(a) + .25) * 1.05 : 0;
    const outPush = vk === 'side' ? 0 : (raise * .52 + qFarPush) * sDir;
    const cos = Math.cos(rotAng), sin = Math.sin(rotAng);
    const stdWorld = localStd.map(([lx, ly], idx) => {
      const pushFrac = (idx === 0 || idx === 12) ? 0 : (idx === 1 || idx === 11) ? .68 : 1;
      return [
        rx + outPush * pushFrac + (lx * cos - ly * sin),
        ry + (lx * sin + ly * cos),
      ];
    });

    // 2) Head-hold contour (chubby flippers hugging outside cheeks & bill with 3 crisp fingers above temples)
    let holdWorld;
    if (vk === 'side') {
      holdWorld = [
        [-.98, -4.08],
        [-1.42, -5.35],
        [-1.36, -6.75],
        [-1.22, -7.88],
        [-1.12, -8.42],
        [-.84, -7.92],
        [-.64, -8.56],
        [-.42, -7.94],
        [-.14, -8.34],
        [-.02, -7.78],
        [-.16, -6.55],
        [-.24, -5.35],
        [-.28, -4.25],
      ];
    } else if (vk === 'q' && side > 0) {
      // Far right flipper in 3/4 arcs completely outside the projecting bill (x >= 3.55 across bill y) to far temple
      holdWorld = [
        [2.92, -3.38],
        [4.12, -4.32],
        [4.16, -6.32],
        [3.68, -7.88],
        [3.44, -8.50],
        [3.22, -7.98],
        [3.04, -8.64],
        [2.94, -8.00],
        [2.86, -8.34],
        [2.82, -7.74],
        [3.12, -6.58],
        [3.68, -5.18],
        [3.48, -4.18],
      ];
    } else {
      const s = side;
      const sx = vk === 'q' ? .28 : vk === 'qback' ? (s < 0 ? -.12 : .18) : 0;
      const outX = s < 0 ? -4.02 + sx : 4.02 + sx;
      const inX = s < 0 ? -2.86 + sx : 2.86 + sx;
      holdWorld = [
        [s * 2.95 + sx, -3.95],
        [outX + s * .10, -5.25],
        [outX - s * .04, -6.75],
        [s * 3.55 + sx, -7.92],
        [s * 3.30 + sx, -8.52],
        [s * 3.08 + sx, -8.02],
        [s * 2.90 + sx, -8.68],
        [s * 2.78 + sx, -8.04],
        [s * 2.70 + sx, -8.38],
        [s * 2.62 + sx, -7.80],
        [inX, -6.74],
        [inX + s * .10, -5.45],
        [s * 2.52 + sx, -4.40],
      ];
    }

    const blended = stdWorld.map((p, idx) => [
      lerp(p[0], holdWorld[idx][0], hold),
      lerp(p[1], holdWorld[idx][1], hold),
    ]);
    const tipPt = blended[6];
    const rootPt = [(blended[0][0] + blended[12][0]) * .5 * u, (blended[0][1] + blended[12][1]) * .5 * u];
    const poly = closedThrough(blended, 2).map(([px, py]) => [px * u + jit(J * .45), py * u + jit(J * .45)]);
    return { root: rootPt, tip: [tipPt[0] * u, tipPt[1] * u], poly };
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
      const widen = (kind === 'wide' || kind === 'scared') ? 1.07 : 1.0;
      const rx = (specPos ? specPos[2] : F.eyeRx) * widen * u;
      const ry = (specPos ? specPos[3] : F.eyeRy) * widen * (1 - sqz * .85) * u;
      const lx = clamp(o.lookX || 0, -1, 1) * rx * .46;
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
      case 'o': return .36;
      case 'O': return .68;
      case 'open': return .55;
      case 'grin': return .32;
      case 'laugh': return .72;
      case 'wail': return .82;
      case 'yawn': return .78;
      default: return 0;
    }
  }

  function buildBillGeometry(vk, u, o = {}, J = 0) {
    const open = getMouthOpenness(o);
    const drop = open * .58;
    const lift = Math.min(.06, open * .07); // strictly capped so upper bill NEVER touches eyes

    let upperCtrl, lowerCtrl, cavityCtrl, nostrils;
    if (vk === 'front') {
      upperCtrl = [
        [0, -6.16 - lift],
        [.82, -5.84 - lift],
        [1.58, -5.50 - lift],
        [2.08, -4.64 - lift * .4],
        [1.36, -4.18 + open * .08],
        [0, -4.10 + open * .10],
        [-1.36, -4.18 + open * .08],
        [-2.08, -4.64 - lift * .4],
        [-1.58, -5.50 - lift],
        [-.82, -5.84 - lift],
      ];
      lowerCtrl = [
        [-1.32, -4.25],
        [-1.98, -4.52 + drop * .22],
        [-1.38, -3.72 + drop * .82],
        [0, -3.55 + drop],
        [1.38, -3.72 + drop * .82],
        [1.98, -4.52 + drop * .22],
        [1.32, -4.25],
        [0, -4.14],
      ];
      cavityCtrl = open > .08 ? [
        [-1.24, -4.30], [0, -4.18], [1.24, -4.30],
        [1.06, -3.86 + drop * .78], [0, -3.72 + drop * .90], [-1.06, -3.86 + drop * .78],
      ] : null;
      nostrils = [[-.26, -5.74 - lift], [.26, -5.74 - lift]];
    } else if (vk === 'q') {
      upperCtrl = [
        [1.20, -6.16 - lift],
        [2.10, -5.75 - lift],
        [3.15, -5.18 - lift * .5],
        [3.42, -4.58],
        [2.32, -4.18 + open * .08],
        [1.10, -4.15],
        [.26, -4.56],
        [.62, -5.45 - lift * .5],
      ];
      lowerCtrl = [
        [.34, -4.54],
        [1.15, -4.18],
        [2.35, -4.22 + drop * .2],
        [3.22, -4.52 + drop * .4],
        [2.12, -3.68 + drop * .85],
        [1.05, -3.68 + drop * .8],
        [.40, -4.12 + drop * .3],
      ];
      cavityCtrl = open > .08 ? [
        [.62, -4.38], [2.10, -4.22], [2.88, -4.45 + drop * .25],
        [2.02, -3.82 + drop * .8], [1.05, -3.84 + drop * .75],
      ] : null;
      nostrils = [[1.58, -5.74 - lift], [2.04, -5.66 - lift]];
    } else if (vk === 'side') {
      upperCtrl = [
        [1.82, -6.10 - lift],
        [2.95, -5.78 - lift * .6],
        [4.12, -5.36 - lift * .3],
        [4.28, -4.92],
        [3.12, -4.64 + open * .06],
        [1.82, -4.68],
        [1.68, -5.42],
      ];
      lowerCtrl = [
        [1.76, -4.72],
        [3.05, -4.65 + drop * .18],
        [4.05, -4.85 + drop * .45],
        [3.10, -4.22 + drop * .82],
        [1.75, -4.18 + drop * .65],
      ];
      cavityCtrl = open > .08 ? [
        [1.82, -4.72], [3.62, -4.78 + drop * .25], [2.95, -4.32 + drop * .75], [1.82, -4.35 + drop * .55],
      ] : null;
      nostrils = [[2.46, -5.70 - lift]];
    } else {
      // Closed unified bill polygon only (for measure when needed)
      upperCtrl = [[0, -6.16], [1.58, -5.50], [2.08, -4.64], [0, -3.55], [-2.08, -4.64], [-1.58, -5.50]];
      lowerCtrl = upperCtrl;
      cavityCtrl = null;
      nostrils = [];
    }

    const toPts = ctrl => closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J * .3), b * u + jit(J * .3)]);
    const fullClosed = vk === 'front'
      ? closedThrough([
          [0, -6.16], [.82, -5.84], [1.58, -5.50], [2.08, -4.64], [1.38, -3.72], [0, -3.55],
          [-1.38, -3.72], [-2.08, -4.64], [-1.58, -5.50], [-.82, -5.84],
        ], 3).map(([a, b]) => [a * u + jit(J * .35), b * u + jit(J * .35)])
      : vk === 'q'
      ? closedThrough([
          [1.20, -6.16], [2.10, -5.75], [3.15, -5.18], [3.44, -4.60], [2.12, -3.68],
          [.92, -3.72], [.24, -4.55], [.62, -5.45],
        ], 3).map(([a, b]) => [a * u + jit(J * .35), b * u + jit(J * .35)])
      : closedThrough([
          [1.82, -6.10], [2.95, -5.78], [4.15, -5.32], [4.30, -4.92], [3.12, -4.22],
          [1.72, -4.22], [1.66, -5.35],
        ], 3).map(([a, b]) => [a * u + jit(J * .35), b * u + jit(J * .35)]);

    return {
      open,
      drop,
      fullPoly: fullClosed,
      upperPoly: toPts(upperCtrl),
      lowerPoly: toPts(lowerCtrl),
      cavityPoly: cavityCtrl ? toPts(cavityCtrl) : null,
      nostrils: nostrils.map(([nx, ny]) => [nx * u, ny * u]),
    };
  }

  // ---------- Parts Renderers ----------
  function drawArm(ctx, [px, dir, which, layer]) {
    const { V, u, sw, J, o, cols, rs } = ctx;
    rs('arm' + which);
    const vk = viewKey(V);
    const a = which === 'L' ? (o.aL ?? -.25) : (o.aR ?? -.25);
    const hold = getArmHold(o, which);
    const arm = buildArmPts(vk, which === 'L' ? -1 : 1, a, hold, u, J);
    const fillCol = layer === 2 ? mixCol(cols.col, cols.dk, .45) : cols.col;
    paint(arm.poly, { wash: fillCol, washOp: 255, fill: cols.dk, fillOp: 45, tex: .4, ink: PAL.ink, sw: sw * .95 });
    const hook = which === 'L' ? o.armL : o.armR;
    if (hook) {
      push();
      translate(arm.tip[0], arm.tip[1]);
      if (which === 'L') scale(-1, 1);
      hook(u, sw);
      pop();
    }
  }

  function drawEyes(ctx) {
    const { V, u, sw, o, cols } = ctx;
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
      const F = V.face;
      if (geom.length > 1) {
        const L = geom[0], R = geom[1];
        inkLine([[L.center[0] + L.rx * .75, L.center[1] - .1 * u], [(L.center[0] + R.center[0]) / 2, L.center[1] - .28 * u], [R.center[0] - R.rx * .75, R.center[1] - .1 * u]], sw * .85, PAL.ink, 'ink', .5);
        inkLine([[L.center[0] - L.rx * .95, L.center[1] - .1 * u], [V.L * .84 * u, L.center[1] - .2 * u]], sw * .7, PAL.ink, 'ink', 0);
        inkLine([[R.center[0] + R.rx * .95, R.center[1] - .1 * u], [V.R * .84 * u, R.center[1] - .2 * u]], sw * .7, PAL.ink, 'ink', 0);
      } else {
        const E = geom[0];
        inkLine([[E.center[0] - E.rx * .9, E.center[1] - .1 * u], [V.L * .75 * u, E.center[1] - .25 * u]], sw * .7, PAL.ink, 'ink', 0);
      }
      for (const e of geom) {
        const rx = e.rx * 1.06, ry = e.ry * 1.02;
        paint(ellPts(e.center[0], e.center[1], rx, ry, 16), { wash: '#2A2740', ink: PAL.ink, sw: sw * .9 });
        inkLine([[e.center[0] - rx * .45, e.center[1] - ry * .2], [e.center[0] - rx * .1, e.center[1] - ry * .52]], sw * .45, PAL.cream, 'inkfine', 0);
      }
      return;
    }

    for (const e of geom) {
      const [cx, cy] = e.center;
      const rx = e.rx, ry = e.ry;
      const kind = e.kind;
      const s = e.side;
      const blinkOn = ['normal', 'look', 'wide'].includes(kind) && ((T * .9 + (o.seed || 0) * 1.7) % 3.3) < .11;
      if (blinkOn) {
        inkLine([[cx - rx * .78, cy + ry * .15], [cx, cy + ry * .32], [cx + rx * .78, cy + ry * .15]], sw * 1.1, PAL.ink, 'ink', .4);
        continue;
      }

      const drawSclera = (fillCol = PSY_PAL.sclera) => {
        paint(ellPts(cx, cy, rx, ry, 18, .02 * u), { wash: fillCol, washOp: 255, ink: PAL.ink, sw: sw * .85 });
      };
      const drawPinPupil = (rScale = 1, jitterAmt = 0) => {
        const px = e.pupil[0] + (jitterAmt ? Math.sin(T * 42 + s) * jitterAmt * u : 0);
        const py = e.pupil[1] + (jitterAmt ? Math.cos(T * 37 + s) * jitterAmt * u : 0);
        paint(ellPts(px, py, .155 * u * rScale, .165 * u * rScale, 10), { wash: PAL.ink, ink: null });
      };

      switch (kind) {
        case 'normal': case 'look': case 'blank':
          drawSclera();
          if (kind !== 'blank') drawPinPupil();
          break;
        case 'wide':
          drawSclera();
          drawPinPupil(.85, .025);
          break;
        case 'psychic':
          glow(cx, cy, rx * 2.2, PSY_PAL.psychicGlow, .7);
          drawSclera('#B4F4FF');
          paint(ellPts(cx, cy, rx * .55, ry * .55, 14), { wash: '#FFFFFF', fill: PSY_PAL.psychicGlow, fillOp: 85, ink: null });
          paint(ellPts(e.pupil[0], e.pupil[1], .18 * u, .18 * u, 10), { wash: '#276A9E', ink: null });
          break;
        case 'happy':
          inkLine([[cx - rx * .72, cy + ry * .25], [cx, cy - ry * .55], [cx + rx * .72, cy + ry * .25]], sw * 1.25, PAL.ink, 'ink', .6);
          break;
        case 'closed':
          inkLine([[cx - rx * .72, cy - ry * .05], [cx, cy + ry * .45], [cx + rx * .72, cy - ry * .05]], sw * 1.2, PAL.ink, 'ink', .6);
          break;
        case 'squeeze':
          inkLine([[cx - rx * .42 * -s, cy - ry * .48], [cx + rx * .42 * -s, cy], [cx - rx * .42 * -s, cy + ry * .48]], sw * 1.15, PAL.ink, 'ink', 0);
          break;
        case 'sleepy':
          drawSclera();
          drawPinPupil(.9);
          // Half-drooped golden upper eyelid inside the oval
          paint([[cx - rx * .98, cy - ry * .02], [cx - rx * .75, cy - ry * .92], [cx, cy - ry * 1.04], [cx + rx * .75, cy - ry * .92], [cx + rx * .98, cy - ry * .02]], { wash: cols.col, ink: PAL.ink, sw: sw * .65, curv: .35 });
          inkLine([[cx - rx * .95, cy], [cx + rx * .95, cy + ry * .08]], sw * .95, PAL.ink, 'ink', .2);
          break;
        case 'narrow':
          paint(ellPts(cx, cy, rx * .85, Math.max(.18 * u, ry * .34), 14), { wash: PSY_PAL.sclera, ink: PAL.ink, sw: sw * .8 });
          drawPinPupil(.9);
          break;
        case 'angry': case 'determined': {
          drawSclera();
          drawPinPupil(1.1);
          const tilt = kind === 'angry' ? .55 : .38;
          const yIn = cy - ry * .15 + tilt * ry * .4, yOut = cy - ry * .85;
          paint([[cx - rx * .98, s < 0 ? yOut : yIn], [cx + rx * .98, s < 0 ? yIn : yOut], [cx + rx * .8, cy - ry * 1.15], [cx - rx * .8, cy - ry * 1.15]], { wash: cols.col, ink: PAL.ink, sw: sw * .7 });
          inkLine([[cx - rx * .95, s < 0 ? yOut : yIn], [cx + rx * .95, s < 0 ? yIn : yOut]], sw * 1.15, PAL.ink, 'ink', 0);
          break;
        }
        case 'sad': case 'teary': {
          drawSclera();
          drawPinPupil(1.15);
          const yIn = cy - ry * .85, yOut = cy - ry * .12;
          paint([[cx - rx * .98, s < 0 ? yOut : yIn], [cx + rx * .98, s < 0 ? yIn : yOut], [cx + rx * .8, cy - ry * 1.12], [cx - rx * .8, cy - ry * 1.12]], { wash: cols.col, ink: PAL.ink, sw: sw * .65 });
          if (kind === 'teary') {
            const w = Math.sin(T * 9 + s) * .05 * u;
            paint(ellPts(cx, cy + ry * .55 + w, rx * .72, ry * .32, 12), { wash: PAL.sky, washOp: 220, fill: '#FFFFFF', fillOp: 70, ink: PAL.ink, sw: sw * .4 });
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
          paint(ellPts(e.pupil[0], e.pupil[1], rx * .46, ry * .58, 12), { wash: PAL.ink, ink: null });
          paint(ellPts(e.pupil[0] - rx * .16, e.pupil[1] - ry * .22, rx * .18, ry * .22, 8), { wash: PAL.cream, ink: null });
          paint(ellPts(e.pupil[0] + rx * .14, e.pupil[1] + ry * .2, rx * .09, ry * .1, 8), { wash: PAL.cream, ink: null });
          break;
        case 'scared':
          drawSclera();
          drawPinPupil(.8, .04);
          break;
        case 'spark':
          drawSclera();
          paint(starPts(cx, cy, Math.min(rx, ry) * .88 * (1 + .1 * Math.sin(T * 14))), { wash: PAL.ochre, fill: PAL.cream, fillOp: 80, ink: PAL.ink, sw: sw * .5 });
          break;
        case 'red':
          paint(ellPts(cx, cy, rx * 1.15, ry * 1.15, 16), { fill: '#E0283F', fillOp: 110, bleed: .3, ink: null });
          drawSclera('#FFD8DC');
          paint(ellPts(e.pupil[0], e.pupil[1], rx * .35, ry * .42, 10), { wash: '#E6223C', ink: PAL.ink, sw: sw * .4 });
          break;
        case 'heart':
          drawSclera();
          paint(heartPts(cx, cy + .06 * u, Math.min(rx, ry) * .82 * (1 + .1 * pulse(T))), { wash: '#E2476E', ink: PAL.ink, sw: sw * .45 });
          break;
        case 'x':
          drawSclera();
          inkLine([[cx - rx * .48, cy - ry * .48], [cx + rx * .48, cy + ry * .48]], sw * 1.05, PAL.ink, 'ink', 0);
          inkLine([[cx + rx * .48, cy - ry * .48], [cx - rx * .48, cy + ry * .48]], sw * 1.05, PAL.ink, 'ink', 0);
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

  function drawBillAndMouth(ctx) {
    const { V, u, sw, J, o } = ctx;
    const vk = viewKey(V);
    const bill = buildBillGeometry(vk, u, o, J);
    const m = o.mouth;
    const isOpen = bill.open > .08;

    if (isOpen) {
      // Lower bill, dark open mouth cavity + pink tongue, then upper bill with nostrils
      paint(bill.lowerPoly, { wash: PSY_PAL.beak, washOp: 255, fill: PSY_PAL.beakDk, fillOp: 70, tex: .4, ink: PAL.ink, sw: sw * .95 });
      if (bill.cavityPoly) {
        paint(bill.cavityPoly, { wash: PSY_PAL.mouthDark, washOp: 255, ink: PAL.ink, sw: sw * .6 });
        const cx = vk === 'front' ? 0 : vk === 'q' ? 1.85 * u : 2.75 * u;
        const cy = (-3.92 + bill.drop * .75) * u;
        paint(ellPts(cx, cy, .62 * u, .22 * u, 10), { wash: PAL.rose, ink: null });
      }
      paint(bill.upperPoly, { wash: PSY_PAL.beak, washOp: 255, fill: PSY_PAL.beakLt, fillOp: 60, tex: .35, ink: PAL.ink, sw: sw * .95 });
    } else {
      paint(bill.fullPoly, { wash: PSY_PAL.beak, washOp: 255, fill: PSY_PAL.beakDk, fillOp: 60, bleed: .04, tex: .4, ink: PAL.ink, sw: sw * 1.0 });
      // Subtle expressive mouth crease inside lower bill (never overlapping eyes)
      const mx = vk === 'front' ? 0 : vk === 'q' ? 1.82 * u : 2.95 * u;
      const my = vk === 'side' ? -4.65 * u : -4.22 * u;
      const mw = vk === 'front' ? .82 * u : vk === 'q' ? .72 * u : .78 * u;
      if (m === 'smile') inkLine([[mx - mw, my - .12 * u], [mx, my + .14 * u], [mx + mw, my - .12 * u]], sw * .7, PAL.ink, 'ink', .6);
      else if (m === 'frown') inkLine([[mx - mw, my + .16 * u], [mx, my - .12 * u], [mx + mw, my + .16 * u]], sw * .7, PAL.ink, 'ink', .6);
      else if (m === 'flat') inkLine([[mx - mw * .8, my], [mx + mw * .8, my]], sw * .65, PAL.ink, 'ink', 0);
      else if (m === 'smirk') inkLine([[mx - mw * .7, my + .05 * u], [mx + mw * .1, my + .05 * u], [mx + mw * .9, my - .18 * u]], sw * .7, PAL.ink, 'ink', .5);
      else if (m === 'wobble') inkLine([[mx - mw, my], [mx - mw * .5, my - .14 * u], [mx, my + .08 * u], [mx + mw * .5, my - .14 * u], [mx + mw, my]], sw * .65, PAL.ink, 'ink', .4);
      else if (m === 'cat') inkLine([[mx - mw * .8, my - .08 * u], [mx - mw * .4, my + .14 * u], [mx, my - .08 * u], [mx + mw * .4, my + .14 * u], [mx + mw * .8, my - .08 * u]], sw * .65, PAL.ink, 'ink', .5);
      else if (m === 'pout') inkLine([[mx - mw * .45, my + .05 * u], [mx, my - .12 * u], [mx + mw * .45, my + .05 * u]], sw * .7, PAL.ink, 'ink', .5);
      else if (m === 'teeth') {
        paint(rectPts(mx - mw * .95, my - .22 * u, mw * 1.9, .48 * u, u * .02), { wash: PAL.cream, ink: PAL.ink, sw: sw * .55 });
        inkLine([[mx - mw * .9, my + .02 * u], [mx + mw * .9, my + .02 * u]], sw * .35, PAL.ink, 'ink', 0);
      } else if (m === 'tongue') {
        inkLine([[mx - mw * .8, my - .1 * u], [mx, my + .14 * u], [mx + mw * .8, my - .05 * u]], sw * .7, PAL.ink, 'ink', .5);
        paint([[mx + .08 * u, my + .08 * u], [mx + .62 * u, my + .08 * u], [mx + .58 * u, my + .52 * u], [mx + .35 * u, my + .64 * u], [mx + .12 * u, my + .50 * u]], { wash: PAL.rose, ink: PAL.ink, sw: sw * .45, curv: .45 });
      }
    }

    // Crisp dark nostrils on upper bridge
    for (let i = 0; i < bill.nostrils.length; i++) {
      const [nx, ny] = bill.nostrils[i];
      const ang = i === 0 ? -.45 : .45;
      paint(ellPts(nx, ny, .09 * u, .055 * u, 8, 0, vk === 'side' ? -.3 : ang), { wash: PAL.ink, ink: null });
    }
  }

  function drawBlush(u, V, b) {
    const F = V.face;
    if (!F) return;
    const sides = F.sides;
    for (const s of sides) {
      const bx = (F.eyePos && F.eyePos[String(s)]) ? F.eyePos[String(s)][0] + (s > 0 ? .35 : -.55) * u : s * F.bx * u;
      const by = F.by * u;
      paint(ellPts(bx, by, .62 * u, .32 * u, 14), { fill: PAL.rose, fillOp: 165 * clamp(b), bleed: .2, ink: null });
      if (b > .6) {
        for (let k = 0; k < 3; k++) {
          inkLine([[bx - .32 * u + k * .26 * u, by + .18 * u], [bx - .18 * u + k * .26 * u, by - .18 * u]], u * .03, mixCol(PAL.rose, PAL.ink, .3), 'inkfine', 0);
        }
      }
    }
  }

  function drawGloom(u, sw, V, g) {
    const L = (V.L + .65) * u, R = (V.R - .65) * u;
    paint(ellPts((L + R) / 2, -8.35 * u, (R - L) * .42, .85 * u, 16), { fill: PAL.indigo, fillOp: 145 * g, bleed: .08, tex: .5, border: .5, ink: null });
    const n = 6;
    for (let i = 0; i < n; i++) {
      const gx = lerp(L + .6 * u, R - .6 * u, i / (n - 1));
      inkLine([[gx, -8.9 * u], [gx + jit(u * .04), (-8.9 + 1.8 * g * (.7 + .3 * hash(i))) * u]], sw * .42, PAL.ink, 'inkfine', 0);
    }
  }

  // ---------- Blueprint Registration ----------
  CharacterRegistry.register('psyduck', {
    id: 'psyduck',
    name: 'Psyduck',
    palette: PSY_PAL,
    metrics: {
      width: 7.2, height: 10.8,
      shadowWidth: 7.0, shadowRx: 3.4, shadowRy: .75,
      hatY: -9.15, hatW: .66,
      emoteTop: [0, -12.1], emoteSide: [3.85, -9.2],
      jitter: .055, swScale: 1.05,
    },
    views: VIEWS,
    emotionChannels: ['headHold', 'psychic', 'tailWag'],
    emotionOverrides: {
      neutral: {
        eyes: 'normal', take: .3, tailWag: 0,
        body: t => {
          const b = _b(t);
          return { dy: -.18 * b.ab, sq: .025 * b.hit, aL: -.32 + .06 * b.s1, aR: -.32 - .06 * b.s1, tailWag: .08 * b.s1 };
        }
      },
      confused: {
        eyes: ['narrow', 'wide'], mouth: 'wobble', emote: '?', headHold: [0, .92], take: .65,
        body: t => {
          const b = _b(t);
          return { rot: .11 * Math.sin(b.bp * Math.PI / 4), aL: -.35, aR: .4, dy: -.15 * b.ab, headHold: [0, .92] };
        }
      },
      scared: {
        eyes: 'scared', mouth: 'wobble', tint: 'pale', tintK: .45, emote: 'sweat', headHold: [.88, .88], take: 1.1,
        body: t => ({ dx: .12 * Math.sin(t * TAU * 20), sq: -.05, headHold: [.88, .88], lookX: .55 * Math.sign(Math.sin(t * 2.3)) })
      },
      dizzy: {
        eyes: 'swirl', mouth: 'wobble', emote: 'stars', headHold: [.68, .68], take: .75,
        body: t => {
          const a = t * TAU * .8;
          return { rot: .11 * Math.sin(a), dx: .55 * Math.sin(a), dy: -.25 * Math.abs(Math.cos(a)), headHold: [.68, .68] };
        }
      },
      furious: {
        eyes: 'red', lid: .38, tint: 'flush', tintK: .75, emote: 'steam', headHold: [.95, .95], take: 1.2,
        body: t => {
          const b = _b(t);
          return { dx: .18 * Math.sin(t * TAU * 18), rot: .025 * Math.sin(t * TAU * 13), sq: .16 * b.hit, dy: -.6 * Math.sin(b.f * Math.PI) * (1 - b.f), headHold: [.95, .95] };
        }
      },
      headache: {
        eyes: 'wide', mouth: 'wobble', emote: 'sweat', headHold: [1, 1], psychic: .25, take: .9,
        body: t => {
          const vib = Math.sin(t * TAU * 14);
          return {
            dx: .10 * vib,
            rot: .04 * Math.sin(t * TAU * 3),
            sq: .06 + .04 * Math.abs(Math.sin(t * TAU * 4)),
            dy: -.12 * Math.abs(Math.sin(t * TAU * 2)),
            headHold: [1, 1],
            psychic: .22 + .08 * Math.sin(t * 8),
          };
        }
      },
      psychic: {
        eyes: 'psychic', mouth: 'open', tint: '#D8B8FF', tintK: .22, emote: 'psychic', headHold: [.92, .92], psychic: 1.0, take: 1.15,
        body: t => {
          const b = _b(t);
          return {
            dy: -1.95 + .30 * Math.sin(t * TAU * .7),
            sq: -.04 + .03 * Math.sin(t * TAU * 2),
            rot: .04 * Math.sin(t * TAU * .5),
            headHold: [.92, .92],
            psychic: .9 + .1 * Math.sin(t * 10),
            tailWag: .16 * b.s1,
          };
        }
      },
    },
    parts: {
      aura: ctx => {
        const psy = clamp(ctx.o.psychic || 0);
        if (psy <= .04) return;
        const cx = ctx.x + (ctx.o.dx || 0) * ctx.u;
        const cy = ctx.y + ctx.dy - 5.2 * ctx.u;
        const u = ctx.u;
        const pulseA = .65 + .35 * Math.sin(T * 8);
        glow(cx, cy, (6.5 + 1.4 * pulseA) * u * psy, PSY_PAL.psychicGlow, .62 * psy);
        glow(cx, cy - 1.5 * u, 4.5 * u * psy, PSY_PAL.psychicAura, .42 * psy);
      },
      backAppendages: ctx => {
        const { V, u, sw, J, o, cols, rs } = ctx;
        const vk = viewKey(V);
        if (V.tailLayer === 'back') {
          rs('tail');
          const tail = buildTailPts(vk, u, o, J);
          paint(tail.poly, { wash: cols.col, washOp: 255, fill: cols.dk, fillOp: 70, tex: .4, ink: PAL.ink, sw: sw * .95 });
        }
        // Subtle beak tip peeking in qback view behind right cheek
        if (vk === 'qback') {
          rs('qbackBill');
          const peek = closedThrough([[2.35, -5.82], [4.18, -5.18], [3.95, -4.52], [2.35, -4.40]], 2).map(([a, b]) => [a * u, b * u]);
          paint(peek, { wash: PSY_PAL.beak, washOp: 255, ink: PAL.ink, sw: sw * .9 });
        }
      },
      farArms: ctx => ctx.V.arms.filter(a => a[3] !== 1).forEach(a => drawArm(ctx, a)),
      legs: ctx => {
        const { V, u, sw, J, o, rs } = ctx;
        const feet = computeFeetTransforms(V, u, o);
        for (const f of feet) {
          rs('leg' + f.i);
          const poly = buildFootPts(f.cx, f.footY, f.dir, f.tilt, u, J);
          paint(poly, { wash: f.isFar ? PSY_PAL.beakDk : PSY_PAL.beak, washOp: 255, fill: PSY_PAL.beakDk, fillOp: 55, tex: .4, ink: PAL.ink, sw: sw * .9 });
        }
      },
      backCrown: ctx => {
        const { V, u, J, o, rs } = ctx;
        rs('hair');
        const feathers = buildHairFeathers(viewKey(V), u, o, J);
        for (const f of feathers) {
          paint(f.poly, { wash: PAL.ink, washOp: 255, ink: null });
        }
      },
      body: ctx => {
        const { V, u, sw, J, o, cols, rs } = ctx;
        rs('body');
        const vk = viewKey(V);
        const bodyPoly = buildBodyPts(vk, u, J);
        paint(bodyPoly, { wash: cols.col, washOp: 255, ink: null });
        // Soft sunlit crown & belly watercolor highlight
        const hlX = vk === 'side' ? -.3 * u : -.85 * u;
        paint(ellPts(hlX, -7.7 * u, 1.45 * u, .82 * u, 14, J, -.18), { fill: cols.lt, fillOp: V.back ? 75 : 115, bleed: .22, tex: .8, border: .6, ink: null });
        paint(ellPts(hlX * .7, -3.5 * u, 1.9 * u, 1.25 * u, 16, J, -.12), { fill: cols.lt, fillOp: 95, bleed: .22, tex: .75, border: .5, ink: null });
        // Warm golden underside belly shadow
        paint(ellPts(0, -1.65 * u, (vk === 'side' ? 1.9 : 2.35) * u, .78 * u, 16, J), { fill: cols.dk, fillOp: 120, bleed: .08, tex: .65, border: .4, ink: null });
        // Single continuous ink outline
        paint(bodyPoly, { ink: PAL.ink, sw: sw * 1.08 });
        if (o.gloom > .02) drawGloom(u, sw, V, o.gloom);
      },
      frontAppendages: ctx => {
        const { V, u, sw, J, o, cols, rs } = ctx;
        if (V.tailLayer === 'front') {
          rs('tail');
          const tail = buildTailPts(viewKey(V), u, o, J);
          paint(tail.poly, { wash: cols.col, washOp: 255, fill: cols.dk, fillOp: 70, tex: .4, ink: PAL.ink, sw: sw * .95 });
        }
      },
      face: ctx => {
        const { V, u, sw, o, rs } = ctx;
        if (o.blush) drawBlush(u, V, o.blush === true ? 1 : o.blush);
        if (o.hat === 'mask' && V.face.sides.length > 1) {
          drawSharedFaceAccessory(u, 'mask', sw, V.face.sides, { eyeX: V.face.eyeX, eyeY: V.face.eyeY, eyeRx: V.face.eyeRx, eyeRy: V.face.eyeRy });
        }
        rs('eyes');
        drawEyes(ctx);
        rs('mouth');
        drawBillAndMouth(ctx);
        if (['cat', 'masq', 'bowtie'].includes(o.hat)) {
          drawSharedFaceAccessory(u, o.hat, sw, V.face.sides, V.face);
        }
      },
      hat: ctx => {
        const { V, u, sw, o, cols, rs } = ctx;
        rs('hat');
        push();
        translate(V.hat * u, 0);
        scale(V.hw / .66, 1);
        drawSharedHat(u, o.hat, sw, {
          y: V.hatY,
          w: .66,
          bandY: V.bandY,
          bandW: V.bandW,
          earX: V.earX,
          earY: V.earY,
          bodyCol: cols.col,
        });
        pop();
      },
      nearArms: ctx => ctx.V.arms.filter(a => a[3] === 1).forEach(a => drawArm(ctx, a)),
    },
    measure(x, y, u, o = {}) {
      const V = VIEWS[o.view] || VIEWS.front;
      const vk = viewKey(V);
      const dy = (o.dy || 0) * u;
      const sq = (o.sq || 0) + (o.take || 0);
      const flip = o.flip ? -1 : 1;
      const sx = flip * (o.sx ?? 1) * (1 + sq * .6);
      const sy = (o.sy ?? 1) * (1 - sq);
      const ox = x + (o.dx || 0) * u;
      const oy = y + dy;
      const rot = o.rot || 0;
      const cos = Math.cos(rot), sin = Math.sin(rot);
      const xform = ([lx, ly]) => {
        const px = lx * sx, py = ly * sy;
        return [ox + px * cos - py * sin, oy + px * sin + py * cos];
      };
      const xformPoly = pts => pts.map(xform);

      const bodyLocal = buildBodyPts(vk, u, 0);
      const eyesLocal = buildEyeGeometry(V, u, o);
      const billLocal = V.face ? buildBillGeometry(vk, u, o, 0) : null;
      const armsLocal = V.arms.map(([px, dir, which]) => {
        const a = which === 'L' ? (o.aL ?? -.25) : (o.aR ?? -.25);
        const hold = getArmHold(o, which);
        const res = buildArmPts(vk, which === 'L' ? -1 : 1, a, hold, u, 0);
        return { which, root: res.root, tip: res.tip, poly: res.poly };
      });
      const hairLocal = buildHairFeathers(vk, u, o, 0);
      const tailLocal = buildTailPts(vk, u, o, 0);
      const feetTransforms = computeFeetTransforms(V, u, o);
      const feetPolys = feetTransforms.map(f => buildFootPts(f.cx, f.footY, f.dir, f.tilt, u, 0));

      let feetBottomY = -Infinity;
      for (const fp of feetPolys) for (const [, py] of fp) if (py > feetBottomY) feetBottomY = py;

      const allLocal = [...bodyLocal, ...feetPolys.flat(), ...hairLocal.flatMap(h => h.poly), ...armsLocal.flatMap(a => a.poly), ...tailLocal.poly];
      if (billLocal) allLocal.push(...billLocal.fullPoly);
      const hasNaN = allLocal.some(([a, b]) => !Number.isFinite(a) || !Number.isFinite(b));

      const worldPts = xformPoly(allLocal);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [wx, wy] of worldPts) {
        if (wx < x0) x0 = wx; if (wx > x1) x1 = wx;
        if (wy < y0) y0 = wy; if (wy > y1) y1 = wy;
      }

      return {
        charId: 'psyduck',
        view: vk,
        flip: !!o.flip,
        feetBottomY,
        bodyPoly: xformPoly(bodyLocal),
        bodyPolyLocal: bodyLocal,
        eyes: eyesLocal.map(e => ({
          side: e.side,
          kind: e.kind,
          center: xform(e.center),
          centerLocal: e.center,
          rx: e.rx, ry: e.ry,
          pupilLocal: e.pupil,
          poly: xformPoly(e.poly),
          polyLocal: e.poly,
        })),
        billPoly: billLocal ? xformPoly(billLocal.fullPoly) : null,
        billPolyLocal: billLocal ? billLocal.fullPoly : null,
        upperBillPolyLocal: billLocal ? billLocal.upperPoly : null,
        lowerBillPolyLocal: billLocal ? billLocal.lowerPoly : null,
        openMouthPolyLocal: billLocal ? billLocal.cavityPoly : null,
        nostrilsLocal: billLocal ? billLocal.nostrils : [],
        arms: armsLocal.map(a => ({
          which: a.which,
          root: xform(a.root),
          rootLocal: a.root,
          tipLocal: a.tip,
          poly: xformPoly(a.poly),
          polyLocal: a.poly,
        })),
        hairFeathers: hairLocal.map(h => ({
          rootLocal: h.root,
          tipLocal: h.tip,
          polyLocal: h.poly,
        })),
        tail: {
          rootLocal: tailLocal.root,
          tipLocal: tailLocal.tip,
          polyLocal: tailLocal.poly,
        },
        feetPolysLocal: feetPolys,
        hatAnchor: { y: V.hatY * u, w: V.hw, bandY: V.bandY * u, bandW: V.bandW },
        hasNaN,
        worldBBox: [x0, y0, x1, y1],
      };
    },
  });
})();
