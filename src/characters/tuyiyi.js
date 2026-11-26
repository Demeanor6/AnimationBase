// tuyiyi.js: 兔一一 (Tuyiyi) character blueprint registered in CharacterRegistry.
// Crafted 1:1 from the reference illustration: ~2.5-head Q-chibi girl with lush wavy charcoal-black hair, soft dome
// hairline & center part, sweeping S-bangs (with dainty brow-skimming strand & peeking right ear), feathery split-tip
// chest locks over seamless drop-shoulder white crew-neck T-shirt (with asymmetric French tuck & delicate grey folds),
// big soulful rounded-almond eyes (aspect ~0.73, winged upper lash, 2 outward lower lashes & bright dual catchlights),
// baby-fat cheeks, pinpoint nose shadow, dewy coral-pink smile lips, wide-leg black trousers with gently arched hems,
// rounded light-grey sneakers, inner-knotted right-wrist red-black cord, and petite left-hand "1" gesture (`point_up`).
(() => {
  const TYY_PAL = {
    body: '#FDE4D9',        // warm porcelain-peach skin
    bodyDk: '#E8B3A5',      // warm peach chin / sleeve-cast / ear shadow
    bodyLt: '#FFF5F0',      // soft sunlit forehead & cheek highlight
    earIn: '#E0A092',       // inner ear concha shadow
    blush: '#F9AAA2',       // creamy airbrushed peach-pink cheek blush
    hair: '#26252B',        // rich charcoal-black wavy hair base (lets #100F14 strands read crisply)
    hairDk: '#100F14',      // deep jet-ink hair part, outline & interior wave strands
    hairHi: '#3F424E',      // tapered slate-charcoal hair sheen
    hairHi2: '#4D5160',     // secondary soft hair highlight accent
    brow: '#433B42',        // soft natural charcoal-umber tapered eyebrow
    eyeInk: '#121116',      // deep obsidian lash & iris ink
    irisGlow: '#2F2A38',    // subtle lower-iris warm reflection
    sclera: '#FBF7F4',      // clean warm off-white sclera
    lipTop: '#E4726C',      // soft coral-rose upper cupid's bow
    lipBot: '#D14E4C',      // berry-coral center gradient lower lip
    lipGlow: '#F8A9A5',     // soft coral-pink dewy lower-lip water sheen (no stark white grain!)
    mouthDark: '#59232B',   // open mouth interior
    tongue: '#EE858C',      // cute pink tongue
    shirt: '#F6F7FA',       // soft warm-cool off-white T-shirt (never pure #FFFFFF)
    shirtDk: '#D8DFE9',     // cool grey-blue French-tuck & sleeve drape shadow
    shirtHole: '#BAC3D2',   // interior sleeve cuff opening shadow
    shirtLine: '#8D96A5',   // delicate grey fabric crease & ribbed collar ink
    pants: '#1E1F25',       // deep charcoal-black wide-leg casual trousers
    pantsDk: '#131419',     // inner leg & hem shadow
    pantsSeam: '#3A3E4B',   // subtle trouser fly, pocket & hem stack crease
    shoe: '#DCE0E8',        // clean light-grey / off-white rounded sneaker dome
    shoeLt: '#EEF1F6',      // sneaker upper highlight
    shoeDk: '#BCC4D0',      // sneaker sole/edge shadow
    cordRed: '#CC262D',     // right-wrist red-black braided cord (red strand)
    cordBlk: '#18171C',     // right-wrist red-black braided cord (black strand)
  };

  // 5 drawn key views in 12.2u height coordinate system (ground y = 0, crown y = -12.24u).
  // Anatomical convention across all views:
  //   When !o.flip: 'L' = anatomical RIGHT arm (screen-left in front, wears red-black bracelet),
  //                 'R' = anatomical LEFT arm  (screen-right in front, performs signature "1" point_up).
  //   When  o.flip: 'L' = anatomical LEFT arm, 'R' = anatomical RIGHT arm.
  const VIEWS = {
    front: {
      L: -2.88, R: 2.78,
      hat: 0, hw: .72, hatY: -11.88, bandY: -11.44, bandW: .46, earX: 2.45, earY: -9.02,
      emoteTop: [0, -14.3], emoteSide: [3.15, -10.8],
      smearTop: 11.5, smearSpan: 2.3,
      face: {
        cx: 0, fw: 1, sides: [-1, 1],
        eyeX: .76, eyeY: -9.32, eyeRx: .47, eyeRy: .34,
        eyePos: { '-1': [-.73, -9.32, .475, .345], '1': [.80, -9.33, .455, .34] },
        bx: .86, by: -8.80, cheekX: 1.44, cheekY: -8.82, neckY: -7.38,
      },
      legs: [[-1.08, 0, -1], [.68, 0, 1]],
      arms: [[-1.68, -1, 'L', 1], [1.45, 1, 'R', 1]],
    },
    q: {
      L: -2.70, R: 2.58,
      hat: .14, hw: .68, hatY: -11.88, bandY: -11.44, bandW: .44, earX: 2.26, earY: -9.02,
      emoteTop: [.18, -14.3], emoteSide: [3.05, -10.8],
      smearTop: 11.5, smearSpan: 2.3,
      face: {
        cx: .38, fw: .92, sides: [-1, 1],
        eyeX: .68, eyeY: -9.32, eyeRx: .44, eyeRy: .34,
        eyePos: { '-1': [-.18, -9.32, .46, .34], '1': [1.15, -9.33, .37, .33] },
        bx: .78, by: -8.80, cheekX: 1.52, cheekY: -8.82, neckY: -7.38,
      },
      legs: [[-.72, 0, -1], [.80, 1, 1]],
      arms: [[1.32, 1, 'R', 2], [-1.50, -1, 'L', 1]],
    },
    side: {
      L: -2.52, R: 1.88,
      hat: -.12, hw: .58, hatY: -11.88, bandY: -11.44, bandW: .38, earX: 1.78, earY: -9.02,
      emoteTop: [-.05, -14.3], emoteSide: [2.55, -10.8],
      smearTop: 11.5, smearSpan: 2.3,
      face: {
        cx: .74, fw: .76, sides: [1],
        eyeX: .72, eyeY: -9.32, eyeRx: .36, eyeRy: .33,
        eyePos: { '1': [.72, -9.32, .36, .33] },
        bx: .64, by: -8.80, cheekX: 1.18, cheekY: -8.82, neckY: -7.38,
      },
      legs: [[.22, 1, 1], [-.20, 0, 1]],
      arms: [[-.08, 0, 'L', 1]],
    },
    qback: {
      L: -2.58, R: 2.70,
      hat: -.14, hw: .68, hatY: -11.88, bandY: -11.44, bandW: .44, earX: 2.26, earY: -9.02,
      emoteTop: [-.18, -14.3], emoteSide: [3.05, -10.8],
      smearTop: 11.5, smearSpan: 2.3,
      face: null,
      legs: [[-.80, 1, -1], [.72, 0, 1]],
      arms: [[-1.32, -1, 'R', 2], [1.50, 1, 'L', 1]],
    },
    back: {
      L: -2.80, R: 2.80,
      hat: 0, hw: .72, hatY: -11.88, bandY: -11.44, bandW: .46, earX: 2.45, earY: -9.02,
      emoteTop: [0, -14.3], emoteSide: [3.15, -10.8],
      smearTop: 11.5, smearSpan: 2.3,
      face: null, back: true,
      legs: [[-.84, 0, -1], [.84, 0, 1]],
      arms: [[-1.58, -1, 'R', 1], [1.58, 1, 'L', 1]],
    },
  };

  function viewKey(V) {
    if (V === VIEWS.q) return 'q';
    if (V === VIEWS.side) return 'side';
    if (V === VIEWS.qback) return 'qback';
    if (V === VIEWS.back) return 'back';
    return 'front';
  }

  function isAnatRightArm(which, flip) {
    return !flip ? which === 'L' : which === 'R';
  }

  // ---------- Unified Geometry Builders ----------

  function buildCoreBodyPoly(vk, u, o = {}, J = 0) {
    let ctrl;
    if (vk === 'front' || vk === 'back') {
      ctrl = [
        [0, -12.08], [1.52, -11.52], [2.02, -10.15], [1.82, -8.80], [1.40, -7.80],
        [1.72, -7.20], [1.82, -5.80], [1.50, -4.15], [1.36, -3.30], [0, -3.35],
        [-1.42, -3.30], [-1.60, -4.25], [-2.12, -5.65], [-1.80, -7.30], [-1.46, -7.90],
        [-1.92, -8.85], [-2.12, -10.15], [-1.60, -11.52],
      ];
    } else if (vk === 'q' || vk === 'qback') {
      const s = vk === 'q' ? 1 : -1;
      ctrl = [
        [.12 * s, -12.08], [1.55 * s, -11.45], [1.92 * s, -10.10], [1.72 * s, -8.80], [1.28 * s, -7.80],
        [1.56 * s, -7.15], [1.62 * s, -5.75], [1.38 * s, -4.10], [1.22 * s, -3.30], [0, -3.35],
        [-1.30 * s, -3.30], [-1.48 * s, -4.25], [-1.78 * s, -5.75], [-1.62 * s, -7.25], [-1.32 * s, -7.90],
        [-1.78 * s, -8.90], [-1.92 * s, -10.15], [-1.45 * s, -11.50],
      ];
      if (s < 0) ctrl.reverse();
    } else {
      ctrl = [
        [-.08, -12.08], [1.18, -11.45], [1.44, -10.15], [1.42, -8.85], [1.05, -7.90],
        [1.15, -7.15], [1.18, -5.65], [1.10, -3.85], [.96, -3.30], [0, -3.30],
        [-.98, -3.30], [-1.15, -4.25], [-1.25, -5.75], [-1.15, -7.25], [-1.05, -7.90],
        [-1.62, -8.90], [-1.75, -10.15], [-1.35, -11.50],
      ];
    }
    return closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J), b * u + jit(J)]);
  }

  // Sweet, plump baby-fat Q-chibi face contour (fuller lower cheeks y=-9.1..-8.25 & soft rounded chin!)
  function buildHeadSkinPts(vk, u, J = 0) {
    let ctrl;
    if (vk === 'front') {
      ctrl = [
        [0, -11.22], [.94, -11.00], [1.36, -10.12], [1.36, -9.22],
        [1.32, -8.72], [1.06, -8.28], [.56, -8.02], [.02, -7.94],
        [-.58, -8.02], [-1.14, -8.29], [-1.44, -8.76], [-1.48, -9.24],
        [-1.38, -10.14], [-.96, -11.00],
      ];
    } else if (vk === 'q') {
      ctrl = [
        [.26, -11.20], [1.14, -10.96], [1.54, -10.10], [1.58, -9.22],
        [1.52, -8.72], [1.26, -8.26], [.76, -7.98], [.30, -7.94],
        [-.26, -8.06], [-.88, -8.38], [-1.18, -8.86], [-1.20, -9.40],
        [-1.04, -10.22], [-.56, -10.98],
      ];
    } else if (vk === 'side') {
      // Soft anime Q-profile: gently rounded forehead, dainty upturned nose, sweet lip bump & plump baby-fat chin!
      ctrl = [
        [.05, -11.18], [.86, -10.92], [1.12, -10.18], [1.12, -9.42],
        [1.14, -9.18], [1.30, -8.96], [1.18, -8.82],   // cute upturned button nose!
        [1.20, -8.68], [1.14, -8.54],                  // upper/lower lip curve
        [1.12, -8.24], [.92, -8.02], [.48, -7.98],     // rounded baby-fat chin
        [-.06, -8.14], [-.48, -8.65], [-.58, -9.40], [-.44, -10.35],
      ];
    } else if (vk === 'qback') {
      ctrl = [
        [.25, -10.95], [.98, -10.45], [1.40, -9.52], [1.44, -8.84], [1.12, -8.30],
        [.52, -8.08], [-.15, -8.25], [-.68, -8.82], [-.70, -9.85], [-.35, -10.75],
      ];
    } else {
      return null;
    }
    return closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J * .38), b * u + jit(J * .38)]);
  }

  function buildBackHairPts(vk, u, o = {}, J = 0) {
    const sway = Math.sin(bpOf(T) * Math.PI) * .04;
    let ctrl;
    if (vk === 'front') {
      ctrl = [
        [-.02, -12.06], [.54, -12.18], [1.42, -11.72], [1.98, -10.68], [2.20, -9.50],
        [2.34 + sway * .5, -8.72], [2.10 + sway * .6, -8.00], [2.18 + sway * .7, -7.22], [1.76 + sway * .5, -6.55],
        [1.12, -6.85], [0, -7.15], [-1.25, -6.65],
        [-2.20 + sway, -5.82], [-2.88 + sway * 1.2, -6.12], [-2.54 + sway, -6.42],
        [-2.96 + sway * 1.2, -6.86], [-2.68 + sway, -7.32], [-2.48 + sway * .8, -7.95],
        [-2.80 + sway * .6, -8.62], [-2.58 + sway * .4, -9.22],
        [-2.50, -10.25], [-1.98, -11.45], [-.64, -12.24],
      ];
    } else if (vk === 'q') {
      ctrl = [
        [.18, -12.06], [.72, -12.16], [1.46, -11.65], [1.85, -10.58], [1.96, -9.42],
        [2.02 + sway * .5, -8.58], [1.78 + sway * .6, -7.58], [1.36, -7.08],
        [0, -7.15], [-1.35, -6.45],
        [-2.22 + sway, -5.75], [-2.78 + sway * 1.2, -6.05], [-2.50 + sway, -6.48],
        [-2.78 + sway, -6.98], [-2.42 + sway * .7, -7.92], [-2.68 + sway * .5, -8.65],
        [-2.48, -9.35], [-2.34, -10.35], [-1.78, -11.48], [-.46, -12.24],
      ];
    } else if (vk === 'side') {
      ctrl = [
        [-.05, -12.12], [.52, -12.04], [.98, -11.48], [1.02, -10.55], [.65, -9.52],
        [.15, -8.22], [-.35, -6.75],
        [-1.18 + sway * .8, -5.52], [-1.88 + sway * 1.1, -5.40], [-2.46 + sway * 1.3, -5.86],
        [-2.18 + sway, -6.36], [-2.54 + sway * 1.1, -6.96], [-2.22 + sway * .8, -7.84],
        [-2.48 + sway * .5, -8.60], [-2.28, -9.38], [-2.14, -10.38], [-1.62, -11.52], [-.58, -12.22],
      ];
    } else if (vk === 'qback') {
      ctrl = [
        [-.15, -12.06], [.48, -12.20], [1.48, -11.62], [1.98, -10.48], [2.10, -9.35],
        [2.26 + sway * .5, -8.55], [2.08 + sway * .7, -7.72], [2.30 + sway * .9, -6.82],
        [1.95 + sway, -5.85], [1.32 + sway * .9, -5.45], [.72 + sway * .8, -5.78],
        [.16 + sway * .8, -5.32], [-.48 + sway * .8, -5.72], [-1.12 + sway * .9, -5.38],
        [-1.85 + sway, -5.68], [-2.42 + sway * 1.1, -6.32], [-2.20 + sway * .8, -7.02],
        [-2.48 + sway * .6, -7.82], [-2.32, -8.78], [-2.25, -9.98], [-1.76, -11.32], [-.70, -12.18],
      ];
    } else {
      ctrl = [
        [0, -12.06], [.58, -12.22], [1.66, -11.56], [2.28, -10.38], [2.44, -9.22],
        [2.64 + sway * .5, -8.48], [2.42 + sway * .7, -7.75], [2.68 + sway * .9, -6.88],
        [2.38 + sway * 1.1, -5.92], [1.72 + sway, -5.45], [1.16 + sway * .8, -5.82],
        [.58 + sway * .8, -5.30], [0 + sway * .8, -5.68], [-.58 + sway * .8, -5.30],
        [-1.16 + sway * .8, -5.82], [-1.72 + sway, -5.45], [-2.38 + sway * 1.1, -5.92],
        [-2.68 + sway * .9, -6.88], [-2.42 + sway * .7, -7.75], [-2.64 + sway * .5, -8.48],
        [-2.44, -9.22], [-2.28, -10.38], [-1.66, -11.56], [-.58, -12.22],
      ];
    }
    return closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J * .42), b * u + jit(J * .42)]);
  }

  function computeLegTransforms(V, u, o = {}) {
    const vk = viewKey(V);
    return V.legs.map(([lx, isFar, dir], i) => {
      let xOff = 0, yOff = 0, tilt = 0;
      if (o.walk != null) {
        const ph = (o.walk + i * .5) * TAU;
        xOff = Math.sin(ph) * (vk === 'side' ? .56 : .28);
        const lift = Math.max(0, Math.cos(ph));
        yOff = -lift * .44;
        tilt = Math.sin(ph) * .12;
      }
      return { lx, cx: (lx + xOff) * u, footY: yOff * u, xOff, yOff, isFar, dir, tilt, i };
    });
  }

  function buildShoePts(cx, footY, dir, tilt, vk, u, J = 0) {
    const w = vk === 'side' ? .64 : .58;
    const toeBias = vk === 'side' ? .28 : dir * .04;
    const raw = [
      [-w * .88 + toeBias * .25, -.40],
      [toeBias * .6, -.50],
      [w * .98 + toeBias, -.36],
      [w * 1.06 + toeBias, -.12],
      [w * .80 + toeBias * .5, 0],
      [0, .01],
      [-w * .82 + toeBias * .2, 0],
      [-w * 1.02 + toeBias * .2, -.14],
    ];
    const cos = Math.cos(tilt), sin = Math.sin(tilt);
    const pts = raw.map(([rx, ry]) => {
      const px = rx * u, py = (ry + .22) * u;
      return [cx + px * cos - py * sin, footY + (px * sin + py * cos) - .22 * u];
    });
    return closedThrough(pts, 2).map(([px, py]) => [px + jit(J * .28), py + jit(J * .28)]);
  }

  function mapHumanArmAngle(a) {
    const ac = clamp(a, -1.2, 1.65);
    if (ac <= .30) return lerp(.24, .52, (ac + 1.2) / 1.50);
    if (ac <= .78) return lerp(.52, 1.15, ease((ac - .30) / .48));
    return lerp(2.06, 2.56, ease((ac - .78) / .87));
  }

  // Computes arm & sleeve geometry.
  // Crucially: ALL sleeves are drawn in `P.body` seamlessly merged with the white T-shirt (UNDER hair in all 5 views!),
  // while bare forearms emerge FROM INSIDE the sleeve cuff (low arms under cuff in `P.body`, raised/bent forearms in `nearArms`).
  function buildArmGeom(vk, which, a, pointUpAmt, flip, u, J = 0) {
    const side = (vk === 'back' || vk === 'qback')
      ? (which === 'L' ? 1 : -1)
      : (vk === 'side' ? 1 : (which === 'L' ? -1 : 1));
    const isPointArm = !isAnatRightArm(which, flip) && (vk === 'front' || vk === 'q');
    const pAmt = isPointArm ? clamp(pointUpAmt || 0) : 0;

    let shX, shY;
    if (vk === 'front' || vk === 'back') {
      shX = side < 0 ? -1.42 : 1.24;
      shY = -7.36;
    } else if (vk === 'q') {
      shX = side < 0 ? -1.32 : 1.16;
      shY = -7.32;
    } else if (vk === 'qback') {
      shX = side < 0 ? -1.16 : 1.32;
      shY = -7.32;
    } else {
      shX = -.04;
      shY = -7.28;
    }

    let swingAng;
    if (vk === 'side') {
      swingAng = Math.PI / 2 - clamp(a, -1.0, 1.45) * .60;
    } else {
      const magFromDown = mapHumanArmAngle(a);
      swingAng = Math.PI / 2 - side * magFromDown;
    }
    const highPush = vk === 'side' ? 0 : Math.max(0, a - .65) * .54 * side;
    const effShX = shX + highPush;

    const dirX = Math.cos(swingAng), dirY = Math.sin(swingAng);
    // True outward unit normal: points left (-x) when side < 0, right (+x) when side > 0!
    const nx = dirY * side, ny = -dirX * side;

    // Flared oversized drop-shoulder short sleeve (interpolates armpit smoothly when arm raises!)
    const raiseK = vk === 'side' ? 0 : clamp((.20 - dirY) / 1.15, 0, 1);
    const isRaisedStd = pAmt <= .35 && a > .68 && vk !== 'side';
    const slvLen = vk === 'side' ? 1.86 : lerp(2.02, 1.82, raiseK);
    const flareOut = vk === 'side' ? .48 : lerp(.62, .44, raiseK);
    const flareIn = vk === 'side' ? .48 : lerp(.38, .44, raiseK);
    const cOut = [effShX + dirX * (slvLen - .08) + nx * flareOut, shY + dirY * (slvLen - .08) + ny * flareOut];
    const cIn = [effShX + dirX * (slvLen + .10) - nx * flareIn, shY + dirY * (slvLen + .10) - ny * flareIn];
    const sTopOut = vk === 'side' ? [effShX + nx * .38, shY - .18] : [effShX + nx * lerp(.18, .30, raiseK), shY - .18];
    const sTopIn = vk === 'side' ? [effShX - nx * .38, shY - .18] : [shX - side * .48, shY - .16];
    const sPitIn = vk === 'side'
      ? [cIn[0], cIn[1] - .45]
      : [lerp(shX - side * .38, effShX - nx * .42, raiseK), lerp(shY + 1.48, shY + .48, raiseK)];

    const slvStd8 = [
      sTopIn,
      sTopOut,
      [lerp(sTopOut[0], cOut[0], .52), lerp(sTopOut[1], cOut[1], .52)],
      cOut,
      [lerp(cOut[0], cIn[0], .5), lerp(cOut[1], cIn[1], .5)],
      cIn,
      [lerp(cIn[0], sPitIn[0], .45), lerp(cIn[1], sPitIn[1], .45)],
      sPitIn,
    ];

    // Gently curved natural feminine forearm + petite hand
    const wristDist = 3.60;
    const wrX = effShX + dirX * wristDist + nx * .05, wrY = shY + dirY * wristDist + ny * .05;
    const grav = clamp((dirY - .15) / .85, 0, 1) * .42;
    const handDirX = lerp(dirX, -side * .06, grav), handDirY = lerp(dirY, 1, grav);
    const hdLen = Math.hypot(handDirX, handDirY) || 1;
    const hx = handDirX / hdLen, hy = handDirY / hdLen;
    const hnx = hy * side, hny = -hx * side; // true outward hand normal!

    // Start raised bare forearm cleanly AT sleeve cuff opening so bare skin never covers white sleeve!
    const armStart = isRaisedStd ? (slvLen - .04) : 1.45;
    const uOut = [effShX + dirX * armStart + nx * (isRaisedStd ? .24 : .34), shY + dirY * armStart + ny * (isRaisedStd ? .24 : .34)];
    const uIn = [effShX + dirX * (armStart + .06) - nx * (isRaisedStd ? .20 : .12), shY + dirY * (armStart + .06) - ny * (isRaisedStd ? .20 : .12)];
    const wOut = [wrX + hnx * .19, wrY + hny * .19];
    const wIn = [wrX - hnx * .16, wrY - hny * .16];
    // Subtle natural organic curve at mid-forearm
    const bow = .05;
    const mOut1 = [lerp(uOut[0], wOut[0], .40) + hnx * bow, lerp(uOut[1], wOut[1], .40) + hny * bow];
    const mOut2 = [lerp(uOut[0], wOut[0], .74) + hnx * bow * .5, lerp(uOut[1], wOut[1], .74) + hny * bow * .5];
    const mIn1 = [lerp(wIn[0], uIn[0], .35) + hnx * bow * .4, lerp(wIn[1], uIn[1], .35) + hny * bow * .4];
    const mIn2 = [lerp(wIn[0], uIn[0], .70) + hnx * bow * .5, lerp(wIn[1], uIn[1], .70) + hny * bow * .5];

    const stdArm16 = [
      uIn,
      uOut,
      mOut1,
      mOut2,
      wOut,
      [wrX + hnx * .25 + hx * .32, wrY + hny * .25 + hy * .32],           // outer gentle palm curve
      [wrX + hnx * .21 + hx * .72, wrY + hny * .21 + hy * .72],           // outer finger curve
      [wrX + hnx * .07 + hx * .98, wrY + hny * .07 + hy * .98],           // soft rounded fingertips
      [wrX - hnx * .05 + hx * .92, wrY - hny * .05 + hy * .92],           // index finger inner tip
      [wrX - hnx * .06 + hx * .56, wrY - hny * .06 + hy * .56],           // soft narrow finger-thumb cleft
      [wrX - hnx * .15 + hx * .66, wrY - hny * .15 + hy * .66],           // dainty relaxed inner thumb tip
      [wrX - hnx * .20 + hx * .46, wrY - hny * .20 + hy * .46],           // inner thumb pad
      [wrX - hnx * .17 + hx * .20, wrY - hny * .17 + hy * .20],           // inner palm heel
      wIn,
      mIn1,
      mIn2,
    ];

    // 2) Refined 1:1 Reference "Point Up 1" Pose:
    //    - Diagonal right short sleeve in `P.body` overlaps upper arm (with dark sleeve-hole shadow!)
    //    - Petite, delicate Q-hand in `nearArms` with slender wrist, rounded folded thumb, slender index "1" & 3 stepped curled fingers!
    const qShift = vk === 'q' ? .16 : 0;
    const pointSlv8 = [
      [.65 + qShift, -7.42],
      [1.26 + qShift, -7.46],
      [1.64 + qShift, -6.94],
      [1.98 + qShift, -6.36],    // outer sleeve cuff clearly peeking above bent elbow!
      [1.64 + qShift, -6.02],    // mid diagonal cuff
      [1.24 + qShift, -5.78],    // inner sleeve cuff corner
      [.95 + qShift, -5.95],
      [.65 + qShift, -6.25],
    ];
    // Upper-arm stub tucked UNDER the diagonal sleeve cuff (`P.body` draws sleeve cuff OVER this join!)
    const pointUpperStub = [
      [1.16 + qShift, -6.08],
      [1.64 + qShift, -6.40],
      [1.68 + qShift, -5.58],
      [1.14 + qShift, -5.45],
    ];
    // Lower bent elbow + rising slender forearm + petite "1" hand (drawn in `nearArms` smoothly emerging from sleeve!)
    const pointArm16 = [
      [1.15 + qShift, -5.80],    // 0: inner forearm emerging just below sleeve cuff!
      [1.16 + qShift, -5.28],    // 1: inner-lower elbow curve
      [1.40 + qShift, -5.06],    // 2: smooth rounded elbow bottom
      [1.66 + qShift, -5.32],    // 3: outer-lower elbow curve
      [1.82 + qShift, -6.18],    // 4: outer forearm rising
      [1.84 + qShift, -7.18],    // 5: slender outer wrist!
      [2.16 + qShift, -7.50],    // 6: petite outer palm
      [2.32 + qShift, -7.76],    // 7: pinky outer arc
      [2.20 + qShift, -7.98],    // 8: ring knuckle arc
      [2.04 + qShift, -8.14],    // 9: middle knuckle arc
      [1.92 + qShift, -8.22],    // 10: index-middle web
      [2.24 + qShift, -8.86],    // 11: slender index right edge
      [2.20 + qShift, -9.06],    // 12: dainty rounded index fingertip ("1"!)
      [2.02 + qShift, -9.00],    // 13: slender index left edge
      [1.68 + qShift, -8.22],    // 14: index left base (tucks behind rounded thumb!)
      [1.48 + qShift, -7.24],    // 15: slender inner wrist!
    ];

    const armCtrl = pAmt > .001
      ? stdArm16.map((p, idx) => [lerp(p[0], pointArm16[idx][0], pAmt), lerp(p[1], pointArm16[idx][1], pAmt)])
      : stdArm16;
    const slvCtrl = pAmt > .001
      ? slvStd8.map((p, idx) => [lerp(p[0], pointSlv8[idx][0], pAmt), lerp(p[1], pointSlv8[idx][1], pAmt)])
      : slvStd8;

    const poly = closedThrough(armCtrl, 2).map(([px, py]) => [px * u + jit(J * .30), py * u + jit(J * .30)]);
    const sleevePoly = closedThrough(slvCtrl, 2).map(([px, py]) => [px * u + jit(J * .30), py * u + jit(J * .30)]);
    const tipPt = pAmt > .5
      ? [pointArm16[12][0] * u, pointArm16[12][1] * u]
      : [stdArm16[7][0] * u, stdArm16[7][1] * u];

    const wristInfo = {
      cx: lerp(wrX, 1.66 + qShift, pAmt) * u,
      cy: lerp(wrY, -7.21, pAmt) * u,
      hnx: hnx * u,
      hny: hny * u,
      hx: hx * u,
      hy: hy * u,
      side, pAmt, qShift, a,
    };

    return {
      root: [shX * u, shY * u],
      tip: tipPt,
      poly,
      armCtrl,
      pointUpperStub,
      sleevePoly,
      slvCtrl,
      wristInfo,
    };
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
      const widen = (kind === 'wide' || kind === 'scared') ? 1.06 : 1.0;
      const rx = (specPos ? specPos[2] : F.eyeRx) * widen * u;
      const ry = (specPos ? specPos[3] : F.eyeRy) * widen * (1 - sqz * .85) * u;
      const lx = clamp(o.lookX || 0, -1, 1) * rx * .24;
      const ly = clamp(o.lookY || 0, -1, 1) * ry * .22;
      return {
        side: s, kind, center: [cx, cy], rx, ry,
        pupil: [cx + lx, cy + ly],
        poly: ellPts(cx, cy, rx, Math.max(.06 * u, ry), 16),
      };
    });
  }

  // ---------- Layer Renderers ----------

  // Curved, dual-tapered lens sheen strokes following hair flow (zero blunt grey tape!)
  function drawTaperedHairSheen(u, strands) {
    for (const [p0, pm, p1, halfW, col] of strands) {
      const nX = -(p1[1] - p0[1]), nY = (p1[0] - p0[0]);
      const d = Math.hypot(nX, nY) || 1;
      const ux = (nX / d) * halfW, uy = (nY / d) * halfW;
      const lens = closedThrough([
        p0,
        [lerp(p0[0], pm[0], .5) + ux * .65, lerp(p0[1], pm[1], .5) + uy * .65],
        [pm[0] + ux, pm[1] + uy],
        [lerp(pm[0], p1[0], .5) + ux * .65, lerp(pm[1], p1[1], .5) + uy * .65],
        p1,
        [lerp(pm[0], p1[0], .5) - ux * .65, lerp(pm[1], p1[1], .5) - uy * .65],
        [pm[0] - ux, pm[1] - uy],
        [lerp(p0[0], pm[0], .5) - ux * .65, lerp(p0[1], pm[1], .5) - uy * .65],
      ], 2).map(([a, b]) => [a * u, b * u]);
      paint(lens, { wash: col || TYY_PAL.hairHi, washOp: 165, fill: col || TYY_PAL.hairHi, fillOp: 85, bleed: .08, ink: null });
    }
  }

  function drawFrontAndCrownHair(ctx) {
    const { V, u, sw, J, o, rs } = ctx;
    const vk = viewKey(V);
    const sway = Math.sin(bpOf(T) * Math.PI) * .038;
    rs('frontHair');

    if (vk === 'back' || vk === 'qback') {
      // Full wavy black hair cascading over back & inner shoulders of white T-shirt!
      const backPoly = buildBackHairPts(vk, u, o, J);
      paint(backPoly, { wash: TYY_PAL.hair, washOp: 255, ink: TYY_PAL.hairDk, sw: sw * 1.04 });

      const px = (vk === 'qback' ? -.22 : 0) * u;
      inkLine([[px, -12.06 * u], [px + .05 * u, -11.15 * u]], sw * .92, TYY_PAL.hairDk, 'ink', .3);
      for (const s of [-1, 1]) {
        inkLine([[px + s * .08 * u, -11.68 * u], [px + s * .95 * u, -11.18 * u], [px + s * 1.65 * u, -10.12 * u]], sw * .66, TYY_PAL.hairDk, 'inkfine', .5);
        inkLine([[px + s * .65 * u, -10.85 * u], [px + s * 1.15 * u, -9.25 * u], [px + s * (1.42 + sway * s) * u, -7.65 * u], [px + s * 1.12 * u, -5.95 * u]], sw * .62, TYY_PAL.hairDk, 'inkfine', .5);
        inkLine([[px + s * .35 * u, -9.85 * u], [px + s * (.58 + sway * s * .6) * u, -7.85 * u], [px + s * .42 * u, -5.75 * u]], sw * .56, TYY_PAL.hairDk, 'inkfine', .5);
      }
      const ox = vk === 'qback' ? -.10 : 0;
      drawTaperedHairSheen(u, [
        [[-1.42 + ox, -10.72], [-1.52 + ox, -10.32], [-1.56 + ox, -9.92], .075, TYY_PAL.hairHi],
        [[-1.08 + ox, -10.82], [-1.16 + ox, -10.42], [-1.20 + ox, -10.05], .062, TYY_PAL.hairHi2],
        [[1.08 + ox, -10.82], [1.16 + ox, -10.42], [1.20 + ox, -10.05], .062, TYY_PAL.hairHi2],
        [[1.42 + ox, -10.72], [1.52 + ox, -10.32], [1.56 + ox, -9.92], .075, TYY_PAL.hairHi],
        [[-1.32 + ox, -7.68], [-1.36 + ox, -7.30], [-1.30 + ox, -6.92], .065, TYY_PAL.hairHi],
        [[0 + ox, -7.58], [.02 + ox, -7.22], [0 + ox, -6.88], .060, TYY_PAL.hairHi2],
        [[1.32 + ox, -7.68], [1.36 + ox, -7.30], [1.30 + ox, -6.92], .065, TYY_PAL.hairHi],
      ]);
      return;
    }

    if (vk === 'side') {
      // Soft swept-back side S-bang & shoulder wavy lock (no helmet overhang in front of forehead!)
      const sideCrownLock = closedThrough([
        [-.58, -12.20], [.18, -12.10], [.82, -11.68], [1.08, -11.00], [1.04, -10.48],
        [.72, -10.38], [.36, -9.88], [.12, -9.18], [-.02, -8.40],
        [.12 + sway * .5, -7.25], [.28 + sway * .8, -6.10], [-.06 + sway * .8, -5.52],
        [-.54 + sway * .6, -6.18], [-.68, -7.60], [-.48, -8.80], [-.18, -9.30],
        [-.56, -9.30], [-.82, -8.72], [-1.24, -9.65], [-1.16, -11.18],
      ], 3).map(([a, b]) => [a * u + jit(J * .34), b * u + jit(J * .34)]);
      paint(sideCrownLock, { wash: TYY_PAL.hair, washOp: 255, ink: null });
      // Selective outer & bang ink lines (no seam cut across back hair!)
      inkLine([[1.04 * u, -10.48 * u], [.70 * u, -10.38 * u], [.34 * u, -9.85 * u], [.10 * u, -9.15 * u], [-.02 * u, -8.38 * u], [(.26 + sway * .8) * u, -6.08 * u], [(-.06 + sway * .8) * u, -5.52 * u], [(-.54 + sway * .6) * u, -6.18 * u]], sw * .95, TYY_PAL.hairDk, 'ink', .5);
      inkLine([[-.25 * u, -11.65 * u], [-.62 * u, -10.15 * u], [-.42 * u, -7.85 * u], [-.15 * u, -5.95 * u]], sw * .62, TYY_PAL.hairDk, 'inkfine', .5);
      drawTaperedHairSheen(u, [
        [[-.82, -10.75], [-.92, -10.35], [-.96, -9.98], .072, TYY_PAL.hairHi],
        [[-.52, -10.80], [-.60, -10.42], [-.62, -10.08], .058, TYY_PAL.hairHi2],
        [[-.32, -7.52], [-.30, -7.18], [-.26, -6.86], .060, TYY_PAL.hairHi],
      ]);
      return;
    }

    // FRONT & 3/4 ('q'):
    //   - Smooth rounded forehead hairline (only a tiny gentle dip at center part — NO cat-ear M humps!)
    //   - NO closed horizontal cut line above left ear (wash with `ink: null` + continuous organic S-bang & curl inkLines!)
    //   - Dainty wispy strand skimming outer third of left eyebrow!
    //   - Right S-bang tucked slightly inward at y=-9.1..-8.8 so dainty right ear rim peeks out!
    //   - Multi-pronged pointed feathery curl tips on both chest locks!
    const q = vk === 'q' ? 1 : 0;
    const partX = q ? .32 : -.02;

    // 1) Left Crown + S-Bang + 3-Plume Pointed Wavy Chest Lock (outer chest lock stays >= -1.52u so white sleeve flares cleanly!)
    const leftWashCtrl = q ? [
      [partX, -12.06], [-.38, -12.22], [-1.42, -11.58], [-1.98, -10.45], [-2.12, -9.28],
      [-1.48, -9.24], [-1.22, -8.72], [-1.32, -7.65],
      [-1.44 + sway * .6, -6.38], [-1.34 + sway * .8, -5.65], [-1.12 + sway * .8, -5.92],
      [-.94 + sway * .8, -5.38], [-.70 + sway * .7, -5.82], [-.44 + sway * .5, -6.28],
      [-.58, -7.62], [-.94, -8.42], [-1.08, -9.18],
      [-.92, -9.95], [-.56, -10.72], [-.22, -10.96], [partX, -10.95],
    ] : [
      [partX, -12.06], [-.62, -12.24], [-1.72, -11.58], [-2.28, -10.38], [-2.32, -9.32],
      // Arches cleanly ABOVE left ear (`y = -9.24`) so full cute rounded left ear shows underneath!
      [-1.85, -9.24], [-1.42, -9.14], [-1.38, -8.52], [-1.44, -7.65],
      // Silky S-wave outer chest lock contour curving smoothly into soft wavy tips (no sawtooth spikes!)
      [-1.44, -7.65], [-1.52 + sway * .5, -6.72], [-1.48 + sway * .7, -6.05], [-1.32 + sway * .7, -6.00],
      [-1.18 + sway * .8, -5.58], [-1.02 + sway * .85, -5.36], [-.86 + sway * .75, -5.78],
      [-.68 + sway * .6, -6.12], [-.52 + sway * .5, -6.24], [-.44 + sway * .4, -6.78],
      [-.60, -7.58], [-1.02, -8.32], [-1.36, -8.98],
      // Smooth rounded forehead dome + S-bang hugging closer to outer brow!
      [-1.24, -9.68], [-.92, -10.42], [-.52, -10.88], [-.18, -10.99], [partX, -10.96],
    ];
    paint(closedThrough(leftWashCtrl, 3).map(([a, b]) => [a * u + jit(J * .32), b * u + jit(J * .32)]), { wash: TYY_PAL.hair, washOp: 255, ink: null });

    // 2) Right Crown + S-Bang (clear peek window for right ear & right white sleeve!) + Silky Wavy Chest Lock!
    const rightWashCtrl = q ? [
      [partX, -12.06], [.82, -12.14], [1.52, -11.54], [1.86, -10.35], [1.84, -9.20],
      [1.62, -8.32], [1.36 + sway * .5, -7.12], [1.18 + sway * .7, -5.92], [.84 + sway * .7, -5.54],
      [.56 + sway * .5, -6.12], [.72, -7.22], [1.14, -8.22],
      [1.48, -9.04], [1.42, -9.86], [1.08, -10.62], [.66, -10.94], [partX, -10.95],
    ] : [
      [partX, -12.06], [.52, -12.16], [1.50, -11.52], [1.96, -10.32], [2.00, -9.14],
      [1.68, -8.25], [1.22 + sway * .5, -7.05],
      // Silky inward-curving chest wave (tucked slightly inward at y=-6.5..-5.8 so white right sleeve peeks cleanly!)
      [1.06 + sway * .7, -6.08], [.82 + sway * .8, -5.50], [.68 + sway * .7, -5.88],
      [.50 + sway * .5, -6.18], [.44 + sway * .4, -6.68], [.52, -7.38], [.44, -7.82],
      [.94, -8.32],
      [1.50, -8.80], [1.54, -9.14],
      [1.24, -9.68], [.90, -10.42], [.52, -10.88], [.18, -10.99], [partX, -10.96],
    ];
    paint(closedThrough(rightWashCtrl, 3).map(([a, b]) => [a * u + jit(J * .32), b * u + jit(J * .32)]), { wash: TYY_PAL.hair, washOp: 255, ink: null });

    // Soft curved S-wave curl tips (smooth organic flicks, zero sharp sawtooth triangles!)
    if (!q) {
      const curlArcs = [
        [[-1.44 + sway * .6, -6.48], [-1.52 + sway * .75, -6.08], [-1.62 + sway * .8, -5.86]],
        [[-1.18 + sway * .7, -5.88], [-1.06 + sway * .85, -5.52], [-.92 + sway * .9, -5.32]],
        [[1.06 + sway * .65, -6.22], [.94 + sway * .75, -5.75], [.76 + sway * .82, -5.46]],
      ];
      for (const ca of curlArcs) {
        paint(ribbon(ca.map(([a, b]) => [a * u, b * u]), .24 * u, .03 * u), { wash: TYY_PAL.hair, washOp: 255, ink: null });
      }
    }

    // 3) Continuous Sculpted Hair Ink Contours (ZERO horizontal cut above left ear!)
    inkLine([[partX * u, -12.06 * u], [(partX + .02) * u, -11.50 * u], [partX * u, -10.96 * u]], sw * 1.02, TYY_PAL.hairDk, 'ink', .35);
    inkLine([[(partX - .05) * u, -11.62 * u], [(partX - .62) * u, -11.78 * u], [(partX - 1.24) * u, -11.20 * u]], sw * .72, TYY_PAL.hairDk, 'inkfine', .55);
    inkLine([[(partX + .05) * u, -11.60 * u], [(partX + .58) * u, -11.74 * u], [(partX + 1.12) * u, -11.16 * u]], sw * .72, TYY_PAL.hairDk, 'inkfine', .55);

    if (!q) {
      // Smooth rounded forehead hairline + Left S-bang sweeping continuously past temple & ear into inner chest curl!
      inkLine([
        [partX * u, -10.96 * u], [-.20 * u, -10.99 * u], [-.54 * u, -10.88 * u],
        [-.92 * u, -10.42 * u], [-1.24 * u, -9.68 * u], [-1.36 * u, -8.98 * u],
        [-1.02 * u, -8.32 * u], [-.60 * u, -7.58 * u],
        [(-.44 + sway * .4) * u, -6.72 * u], [(-.52 + sway * .5) * u, -6.22 * u],
      ], sw * .90, TYY_PAL.hairDk, 'ink', .55);

      // Left S-bang outer wave sweeping smoothly behind ear down along outer chest curl
      inkLine([
        [-.82 * u, -11.12 * u], [-1.38 * u, -10.22 * u], [-1.72 * u, -9.24 * u],
        [-1.44 * u, -8.35 * u], [-1.46 * u, -7.55 * u],
        [(-1.52 + sway * .6) * u, -6.62 * u], [(-1.60 + sway * .8) * u, -5.88 * u],
      ], sw * .86, TYY_PAL.hairDk, 'ink', .55);
      // Left main chest plume silky S-curl ink
      inkLine([
        [-1.18 * u, -8.15 * u], [(-1.22 + sway * .6) * u, -6.68 * u],
        [(-1.08 + sway * .8) * u, -5.62 * u], [(-.92 + sway * .9) * u, -5.32 * u],
      ], sw * .80, TYY_PAL.hairDk, 'ink', .55);

      // Dainty wispy strand skimming outer 1/3 of left eyebrow toward outer eye corner!
      inkLine([
        [-.76 * u, -10.58 * u], [-.88 * u, -10.05 * u], [-1.06 * u, -9.68 * u], [-1.26 * u, -9.42 * u],
      ], sw * .46, TYY_PAL.hairDk, 'inkfine', .55);

      // Right rounded hairline + S-bang framing right temple, curving outside peeking right ear, down into silky chest curls!
      inkLine([
        [partX * u, -10.96 * u], [.20 * u, -10.99 * u], [.54 * u, -10.88 * u],
        [.90 * u, -10.42 * u], [1.24 * u, -9.68 * u], [1.54 * u, -9.14 * u], [1.50 * u, -8.80 * u],
        [.94 * u, -8.32 * u], [.44 * u, -7.82 * u], [.52 * u, -7.32 * u],
        [(.44 + sway * .4) * u, -6.62 * u], [(.50 + sway * .5) * u, -6.16 * u],
      ], sw * .90, TYY_PAL.hairDk, 'ink', .55);
      // Right outer chest lock curve & silky inward-sweeping curl tip (leaves right white sleeve peeking!)
      inkLine([
        [.76 * u, -11.10 * u], [1.32 * u, -10.18 * u], [1.62 * u, -8.95 * u],
        [(1.22 + sway * .5) * u, -7.05 * u], [(1.06 + sway * .7) * u, -6.08 * u], [(.76 + sway * .82) * u, -5.46 * u],
      ], sw * .86, TYY_PAL.hairDk, 'ink', .55);
      inkLine([
        [.96 * u, -8.15 * u], [(.94 + sway * .6) * u, -6.85 * u], [(.76 + sway * .82) * u, -5.48 * u],
      ], sw * .60, TYY_PAL.hairDk, 'inkfine', .5);
    } else {
      // 'q' 3/4 view clean bang & chest curl lines
      inkLine([[partX * u, -10.95 * u], [-.42 * u, -10.82 * u], [-.96 * u, -9.85 * u], [-1.08 * u, -9.15 * u], [-.58 * u, -7.62 * u], [(-.46 + sway * .5) * u, -6.22 * u]], sw * .88, TYY_PAL.hairDk, 'ink', .55);
      inkLine([[-1.48 * u, -8.75 * u], [(-1.56 + sway * .6) * u, -6.42 * u], [(-.98 + sway * .8) * u, -5.38 * u]], sw * .85, TYY_PAL.hairDk, 'ink', .55);
      inkLine([[partX * u, -10.95 * u], [.88 * u, -10.78 * u], [1.42 * u, -9.85 * u], [1.48 * u, -9.04 * u], [.72 * u, -7.22 * u], [(.86 + sway * .7) * u, -5.54 * u]], sw * .88, TYY_PAL.hairDk, 'ink', .55);
    }

    // 4) Curved, Dual-Tapered Watercolor Hair Sheen Lenses following hair arc!
    const sOff = q ? .18 : 0;
    drawTaperedHairSheen(u, [
      [[-1.76 + sOff, -10.72], [-1.92 + sOff, -10.32], [-2.00 + sOff, -9.92], .076, TYY_PAL.hairHi],
      [[-1.50 + sOff, -10.82], [-1.64 + sOff, -10.42], [-1.72 + sOff, -10.04], .062, TYY_PAL.hairHi2],
      [[-1.26 + sOff, -10.62], [-1.38 + sOff, -10.28], [-1.44 + sOff, -9.96], .052, TYY_PAL.hairHi],
      [[1.20 + sOff * .6, -10.62], [1.32 + sOff * .6, -10.26], [1.38 + sOff * .6, -9.94], .056, TYY_PAL.hairHi],
      [[1.46 + sOff * .6, -10.78], [1.60 + sOff * .6, -10.36], [1.68 + sOff * .6, -9.96], .074, TYY_PAL.hairHi2],
      [[-1.40 + sOff, -7.32], [-1.44 + sOff, -6.96], [-1.36 + sOff, -6.62], .060, TYY_PAL.hairHi],
      [[-1.08 + sOff, -7.22], [-1.10 + sOff, -6.90], [-1.04 + sOff, -6.60], .048, TYY_PAL.hairHi2],
      [[.84 + sOff * .6, -7.24], [.88 + sOff * .6, -6.90], [.82 + sOff * .6, -6.58], .058, TYY_PAL.hairHi],
    ]);
  }

  // Delicate sculpted eyebrows: soft inner head, gentle arch, needle-fine outer tip blending toward bangs!
  function drawEyebrows(ctx) {
    const { V, u, o } = ctx;
    const vk = viewKey(V);
    const kind = Array.isArray(o.eyes) ? o.eyes[0] : (o.eyes || 'normal');

    let liftIn = 0, liftOut = 0;
    if (kind === 'angry' || kind === 'determined' || kind === 'red') { liftIn = .18; liftOut = -.10; }
    else if (kind === 'sad' || kind === 'teary' || kind === 'cry') { liftIn = -.15; liftOut = .15; }
    else if (kind === 'wide' || kind === 'scared' || kind === 'shine') { liftIn = -.07; liftOut = -.05; }

    const paintTaperedBrow = (pIn, pMid, pOut) => {
      const poly = closedThrough([
        [pIn[0], pIn[1] + .022],
        [pIn[0], pIn[1] - .032],
        [pMid[0], pMid[1] - .042],
        pOut,                           // needle-fine outer tip!
        [pMid[0], pMid[1] + .028],
      ], 2).map(([a, b]) => [a * u, b * u]);
      paint(poly, { wash: TYY_PAL.brow, washOp: 205, ink: null });
    };

    if (vk === 'side') {
      paintTaperedBrow([1.02, -10.04 + liftIn], [.76, -10.12 + (liftIn + liftOut) * .5], [.46, -10.04 + liftOut]);
      return;
    }
    const q = vk === 'q';
    if (q) {
      paintTaperedBrow([.16, -10.04 + liftIn], [-.20, -10.12], [-.62, -10.02 + liftOut]);
      paintTaperedBrow([.76, -10.05 + liftIn], [1.08, -10.12], [1.38, -10.02 + liftOut]);
    } else {
      paintTaperedBrow([-.26, -10.04 + liftIn], [-.68, -10.12], [-1.14, -10.01 + liftOut]);
      paintTaperedBrow([.38, -10.05 + liftIn], [.78, -10.12], [1.20, -10.02 + liftOut]);
    }
  }

  function drawEyes(ctx) {
    const { V, u, sw, o, cols } = ctx;
    const geom = buildEyeGeometry(V, u, o);
    const sqz = clamp(o.squint || 0);
    const sm = clamp(o.smear || 0);
    const fSw = Math.min(sw, u * .038);
    const kinds = Array.isArray(o.eyes) ? o.eyes : o.eyes === 'wink' ? ['happy', 'normal'] : [o.eyes || 'normal', o.eyes || 'normal'];

    if (sm > .5 || sqz > .82) {
      for (const e of geom) {
        const [cx, cy] = e.center, rx = e.rx;
        inkLine([[cx - rx * .85, cy + .04 * u], [cx, cy - .05 * u], [cx + rx * .85, cy + .04 * u]], fSw * 1.15, TYY_PAL.eyeInk, 'ink', .4);
      }
      return;
    }

    if (kinds[0] === 'shades' && geom.length) {
      if (geom.length > 1) {
        const L = geom[0], R = geom[1];
        inkLine([[L.center[0] + L.rx, L.center[1] - .06 * u], [(L.center[0] + R.center[0]) * .5, L.center[1] - .14 * u], [R.center[0] - R.rx, R.center[1] - .06 * u]], fSw * .9, PAL.ink, 'ink', .4);
      }
      for (const e of geom) {
        const rx = e.rx * 1.16, ry = e.ry * 1.12;
        paint(rrPts(e.center[0] - rx, e.center[1] - ry, rx * 2, ry * 2, ry * .55), { wash: '#242234', ink: PAL.ink, sw: fSw * .9 });
        inkLine([[e.center[0] - rx * .48, e.center[1] - ry * .15], [e.center[0] - rx * .08, e.center[1] - ry * .55]], fSw * .55, PAL.cream, 'inkfine', 0);
      }
      return;
    }

    const vk = viewKey(V);
    for (const e of geom) {
      const [cx, cy] = e.center;
      const rx = e.rx, ry = e.ry;
      const kind = e.kind;
      const s = e.side;
      const wingDir = vk === 'side' ? -1 : s;

      const blinkPhase = (T * .85 + (o.seed || 0) * 1.37 + .42) % 3.7;
      const blinkOn = ['normal', 'look'].includes(kind) && Math.abs(T) > .05 && Math.abs(T - 1.0) > .08 && blinkPhase < .10;
      if (blinkOn) {
        inkLine([[cx - rx * .92, cy + ry * .12], [cx, cy + ry * .32], [cx + rx * .92, cy + ry * .12]], fSw * 1.15, TYY_PAL.eyeInk, 'ink', .5);
        continue;
      }

      // Soulful Big Dewy Rounded-Almond Eye (aspect ~0.73, lush dark iris, bright 10:30 catchlight + 4:30 pinpoint, smooth wing!)
      const drawSoulEye = (irisScale = 1.0, extraShine = false, jitterAmt = 0) => {
        // 1) Delicate double-eyelid crease arc
        inkLine([
          [cx - wingDir * rx * .54, cy - ry * 1.16],
          [cx + wingDir * rx * .06, cy - ry * 1.28],
          [cx + wingDir * rx * .74, cy - ry * 1.06],
        ], fSw * .38, '#755C60', 'inkfine', .55);

        // 2) Full rounded-almond warm off-white sclera
        const almond = closedThrough([
          [cx - rx * 1.02, cy + ry * .12],
          [cx - rx * .58, cy - ry * .86],
          [cx, cy - ry * .98],
          [cx + rx * .58, cy - ry * .86],
          [cx + rx * 1.02, cy + ry * .08],
          [cx + rx * .56, cy + ry * .90],
          [cx, cy + ry * .98],
          [cx - rx * .56, cy + ry * .90],
        ], 2);
        paint(almond, { wash: TYY_PAL.sclera, washOp: 255, ink: null });

        // 3) Lush round-oval dark-obsidian iris filling the eye warmly
        const jx = jitterAmt ? Math.sin(T * 40 + s) * jitterAmt * u : 0;
        const jy = jitterAmt ? Math.cos(T * 35 + s) * jitterAmt * u : 0;
        const px = e.pupil[0] + jx, py = e.pupil[1] - ry * .02 + jy;
        const irx = rx * .77 * irisScale, iry = ry * .97 * irisScale;
        paint(ellPts(px, py, irx, iry, 20), { wash: TYY_PAL.eyeInk, washOp: 255, ink: null });

        // Subtle warm lower-iris crescent & deep jet core
        paint(ellPts(px, py + iry * .34, irx * .58, iry * .34, 12), { wash: TYY_PAL.irisGlow, washOp: 185, ink: null });
        paint(ellPts(px, py - iry * .04, irx * .46, iry * .48, 12), { wash: '#09080C', washOp: 255, ink: null });

        // 4) Single smooth calligraphic upper eyelash + sleek upturned outer wing tip (no fork kink!)
        const lashPoly = closedThrough([
          [cx - wingDir * rx * 1.02, cy + ry * .20],      // delicate inner corner taper
          [cx - wingDir * rx * .58, cy - ry * .82],
          [cx, cy - ry * 1.10],                           // smooth bold upper arch
          [cx + wingDir * rx * .64, cy - ry * .92],
          [cx + wingDir * rx * .98, cy - ry * .42],
          [cx + wingDir * rx * 1.24, cy - ry * .48],      // sleek upturned cat-wing tip!
          [cx + wingDir * rx * 1.00, cy - ry * .08],      // smooth outer corner underside
          [cx + wingDir * rx * .56, cy - ry * .64],
          [cx, cy - ry * .80],
          [cx - wingDir * rx * .55, cy - ry * .62],
        ], 2);
        paint(lashPoly, { wash: TYY_PAL.eyeInk, washOp: 255, ink: null });

        // 5) Sparkling dual white catchlights: bright 10:30 upper-left dot (~0.25*irx) + crisp 4:30 lower-right pinpoint!
        const hiMul = extraShine ? 1.22 : 1.0;
        paint(ellPts(px - irx * .28, py - iry * .24, irx * .25 * hiMul, iry * .23 * hiMul, 14), { wash: '#FFFFFF', washOp: 255, ink: null });
        paint(ellPts(px + irx * .28, py + iry * .30, irx * .105 * hiMul, iry * .105 * hiMul, 10), { wash: '#FFFFFF', washOp: 250, ink: null });
        if (extraShine) {
          paint(ellPts(px + irx * .24, py - iry * .26, irx * .09, iry * .09, 8), { wash: '#FFFFFF', washOp: 245, ink: null });
        }

        // 6) Soft outer-lower lid shadow line + 2 ultra-fine outward-sweeping lower eyelashes (no vertical bottom spikes!)
        inkLine([
          [cx + wingDir * rx * .10, cy + ry * .96],
          [cx + wingDir * rx * .55, cy + ry * .88],
          [cx + wingDir * rx * .90, cy + ry * .58],
        ], fSw * .36, '#645054', 'inkfine', .5);
        if (u > 15) {
          inkLine([[cx + wingDir * rx * .62, cy + ry * .84], [cx + wingDir * rx * .78, cy + ry * .96]], fSw * .32, TYY_PAL.eyeInk, 'inkfine', .2);
          inkLine([[cx + wingDir * rx * .82, cy + ry * .68], [cx + wingDir * rx * 1.00, cy + ry * .80]], fSw * .32, TYY_PAL.eyeInk, 'inkfine', .2);
        }
      };

      switch (kind) {
        case 'normal': case 'look':
          drawSoulEye(1.0, false, 0);
          break;
        case 'shine':
          drawSoulEye(1.03, true, 0);
          break;
        case 'wide':
          drawSoulEye(.86, false, .015);
          break;
        case 'scared':
          drawSoulEye(.74, false, .03);
          break;
        case 'blank':
          paint(ellPts(cx, cy, rx, ry, 16), { wash: TYY_PAL.sclera, ink: TYY_PAL.eyeInk, sw: fSw * .95 });
          break;
        case 'happy':
          inkLine([[cx - rx * .85, cy + ry * .22], [cx, cy - ry * .62], [cx + rx * .85, cy + ry * .20]], fSw * 1.25, TYY_PAL.eyeInk, 'ink', .6);
          inkLine([[cx + wingDir * rx * .72, cy + ry * .05], [cx + wingDir * rx * 1.06, cy - ry * .12]], fSw * .50, TYY_PAL.eyeInk, 'inkfine', .2);
          break;
        case 'closed':
          inkLine([[cx - rx * .85, cy - ry * .04], [cx, cy + ry * .48], [cx + rx * .85, cy - ry * .06]], fSw * 1.18, TYY_PAL.eyeInk, 'ink', .55);
          inkLine([[cx + wingDir * rx * .72, cy + ry * .06], [cx + wingDir * rx * 1.06, cy + ry * .20]], fSw * .48, TYY_PAL.eyeInk, 'inkfine', .2);
          break;
        case 'squeeze':
          inkLine([[cx - rx * .55 * -s, cy - ry * .55], [cx + rx * .52 * -s, cy], [cx - rx * .55 * -s, cy + ry * .55]], fSw * 1.15, TYY_PAL.eyeInk, 'ink', 0);
          break;
        case 'sleepy':
          drawSoulEye(.95);
          paint([[cx - rx * 1.06, cy - ry * .02], [cx - rx * .8, cy - ry * 1.08], [cx + rx * .8, cy - ry * 1.08], [cx + rx * 1.06, cy - ry * .02]], { wash: cols.col, ink: null });
          inkLine([[cx - rx * 1.02, cy], [cx + rx * 1.05, cy + ry * .06]], fSw * 1.12, TYY_PAL.eyeInk, 'ink', .2);
          break;
        case 'narrow':
          drawSoulEye(.92);
          paint([[cx - rx * 1.08, cy - ry * .20], [cx - rx * .9, cy - ry * 1.12], [cx + rx * .9, cy - ry * 1.12], [cx + rx * 1.08, cy - ry * .20]], { wash: cols.col, ink: null });
          inkLine([[cx - rx * 1.02, cy - ry * .18], [cx + rx * 1.06, cy - ry * .20]], fSw * 1.15, TYY_PAL.eyeInk, 'ink', .1);
          break;
        case 'angry': case 'determined': {
          drawSoulEye(1.0);
          const tilt = kind === 'angry' ? .58 : .38;
          const yIn = cy - ry * (.22 - tilt * .45), yOut = cy - ry * .92;
          paint([[cx - rx * 1.08, s < 0 ? yOut : yIn], [cx + rx * 1.08, s < 0 ? yIn : yOut], [cx + rx, cy - ry * 1.24], [cx - rx, cy - ry * 1.24]], { wash: cols.col, ink: null });
          inkLine([[cx - rx * 1.04, s < 0 ? yOut : yIn], [cx + rx * 1.04, s < 0 ? yIn : yOut]], fSw * 1.18, TYY_PAL.eyeInk, 'ink', 0);
          break;
        }
        case 'sad': case 'teary': {
          drawSoulEye(1.02);
          const yIn = cy - ry * .92, yOut = cy - ry * .16;
          paint([[cx - rx * 1.08, s < 0 ? yOut : yIn], [cx + rx * 1.08, s < 0 ? yIn : yOut], [cx + rx, cy - ry * 1.24], [cx - rx, cy - ry * 1.24]], { wash: cols.col, ink: null });
          inkLine([[cx - rx * 1.02, s < 0 ? yOut : yIn], [cx + rx * 1.02, s < 0 ? yIn : yOut]], fSw * 1.12, TYY_PAL.eyeInk, 'ink', .2);
          if (kind === 'teary') {
            const w = Math.sin(T * 9 + s) * .03 * u;
            paint(ellPts(cx, cy + ry * .68 + w, rx * .72, ry * .34, 12), { wash: PAL.sky, washOp: 220, fill: '#FFFFFF', fillOp: 80, ink: null });
          }
          break;
        }
        case 'cry': {
          inkLine([[cx - rx * .78, cy + ry * .18], [cx, cy - ry * .35], [cx + rx * .78, cy + ry * .18]], fSw * 1.2, TYY_PAL.eyeInk, 'ink', .4);
          const streamX = cx + s * rx * .42;
          const R = []; for (let k = 0; k <= 4; k++) R.push([streamX + s * k * .08 * u + Math.sin(T * 8 + k + s) * .05 * u, cy + (.22 + k * .48) * u]);
          paint(ribbon(R, .24 * u, .44 * u), { wash: PAL.sky, washOp: 215, ink: PAL.ink, sw: fSw * .45 });
          break;
        }
        case 'spark':
          drawSoulEye(.95);
          paint(starPts(cx, cy, Math.min(rx, ry) * .96 * (1 + .1 * Math.sin(T * 14))), { wash: PAL.ochre, fill: PAL.cream, fillOp: 90, ink: PAL.ink, sw: fSw * .48 });
          break;
        case 'red':
          drawSoulEye(.95);
          paint(ellPts(e.pupil[0], e.pupil[1], rx * .42, ry * .52, 10), { wash: '#E0283F', ink: null });
          break;
        case 'heart':
          paint(ellPts(cx, cy, rx, ry, 14), { wash: TYY_PAL.sclera, ink: TYY_PAL.eyeInk, sw: fSw * 1.0 });
          paint(heartPts(cx, cy + .04 * u, Math.min(rx, ry) * .92 * (1 + .1 * pulse(T))), { wash: '#E2476E', ink: PAL.ink, sw: fSw * .45 });
          break;
        case 'x':
          inkLine([[cx - rx * .62, cy - ry * .62], [cx + rx * .62, cy + ry * .62]], fSw * 1.15, TYY_PAL.eyeInk, 'ink', 0);
          inkLine([[cx + rx * .62, cy - ry * .62], [cx - rx * .62, cy + ry * .62]], fSw * 1.15, TYY_PAL.eyeInk, 'ink', 0);
          break;
        case 'swirl': {
          paint(ellPts(cx, cy, rx, ry, 14), { wash: TYY_PAL.sclera, ink: TYY_PAL.eyeInk, sw: fSw * .95 });
          const sp = [];
          for (let k = 0; k < 13; k++) {
            const a = k * .78 + T * 6 * s, r = k * .048 * Math.min(rx, ry) / .65;
            sp.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
          }
          inkLine(sp, fSw * .6, TYY_PAL.eyeInk, 'inkfine', .6);
          break;
        }
        default:
          drawSoulEye(1.0);
      }
    }
  }

  function drawNoseAndMouth(ctx) {
    const { V, u, sw, o } = ctx;
    const vk = viewKey(V);
    const fSw = Math.min(sw, u * .038);
    const m = o.mouth === undefined ? 'smile' : o.mouth;

    // 1) Ultra-delicate warm peach nose blush + tiny micro-pinpoint shadow (NO black ')' hook!)
    if (vk === 'side') {
      paint(ellPts(1.20 * u, -8.94 * u, .07 * u, .045 * u, 8), { fill: TYY_PAL.earIn, fillOp: 115, bleed: .22, border: .02, ink: null });
    } else {
      const nx = (vk === 'q' ? .68 : .14) * u;
      const ny = -8.96 * u;
      paint(ellPts(nx - .02 * u, ny, .09 * u, .065 * u, 10), { fill: TYY_PAL.earIn, fillOp: 130, bleed: .28, border: .02, ink: null });
      paint(ellPts(nx + .032 * u, ny + .012 * u, .024 * u, .034 * u, 8, 0, .25), { wash: '#8B5E5B', washOp: 195, ink: null });
    }

    // 2) Soft Dewy Coral-Pink Gradient Smile Lips (no stark white rice-grain pill, no harsh wide black corner lines!)
    const mx = (vk === 'side' ? 1.12 : vk === 'q' ? .64 : .06) * u;
    const my = -8.62 * u;
    const mw = (vk === 'side' ? .16 : vk === 'q' ? .28 : .30) * u;

    const drawDewySmileLips = (smileLift = 1.0) => {
      if (vk === 'side') {
        paint(ellPts(mx + mw * .15, my + .02 * u, mw * .65, .075 * u, 10), { wash: TYY_PAL.lipTop, washOp: 205, ink: null });
        inkLine([[mx - mw * .65, my - .02 * u * smileLift], [mx + mw * .15, my + .015 * u], [mx + mw * .65, my]], fSw * .58, '#4E2429', 'inkfine', .45);
        return;
      }
      // Soft outer rose-peach lip cushion
      paint(ellPts(mx, my + .03 * u, mw * .84, .10 * u, 14), { wash: '#F0A8A0', washOp: 165, fill: '#F0A8A0', fillOp: 95, bleed: .18, ink: null });

      // Upper cupid's bow coral-rose wash
      const upLip = closedThrough([
        [mx - mw * .76, my - .005 * u],
        [mx - mw * .28, my - .088 * u],
        [mx, my - .052 * u],
        [mx + mw * .28, my - .088 * u],
        [mx + mw * .76, my - .005 * u],
        [mx + mw * .30, my + .020 * u],
        [mx - mw * .30, my + .020 * u],
      ], 2);
      paint(upLip, { wash: TYY_PAL.lipTop, washOp: 220, ink: null });

      // Berry-coral center gradient lower lip wash
      const lowLip = closedThrough([
        [mx - mw * .66, my + .01 * u],
        [mx, my + .020 * u],
        [mx + mw * .66, my + .01 * u],
        [mx + mw * .40, my + .120 * u],
        [mx, my + .142 * u],
        [mx - mw * .40, my + .120 * u],
      ], 2);
      paint(lowLip, { wash: TYY_PAL.lipBot, washOp: 225, ink: null });

      // Soft coral-pink translucent water-gloss sheen on lower lip (replaces stark white rice grain!)
      paint(ellPts(mx - mw * .06, my + .078 * u, mw * .28, .032 * u, 10), { wash: TYY_PAL.lipGlow, washOp: 175, fill: '#FFD8D4', fillOp: 110, bleed: .16, ink: null });

      // Dainty warm-berry smile cleft line, gently upturned at corners without harsh long black extensions!
      inkLine([
        [mx - mw * .88, my - .032 * u * smileLift],
        [mx - mw * .40, my + .012 * u],
        [mx, my + .022 * u],
        [mx + mw * .40, my + .012 * u],
        [mx + mw * .88, my - .038 * u * smileLift],
      ], fSw * .54, '#4B2126', 'inkfine', .55);
    };

    if (!m || m === 'smile') {
      drawDewySmileLips(1.0);
    } else if (m === 'smirk') {
      drawDewySmileLips(.5);
      inkLine([[mx + mw * .68, my - .01 * u], [mx + mw * 1.05, my - .10 * u]], fSw * .58, '#4B2126', 'inkfine', .3);
    } else if (m === 'flat') {
      paint(ellPts(mx, my + .03 * u, mw * .60, .065 * u, 12), { wash: TYY_PAL.lipTop, washOp: 175, ink: null });
      inkLine([[mx - mw * .80, my], [mx + mw * .80, my]], fSw * .65, '#4B2126', 'inkfine', 0);
    } else if (m === 'frown') {
      paint(ellPts(mx, my + .04 * u, mw * .58, .065 * u, 12), { wash: TYY_PAL.lipTop, washOp: 175, ink: null });
      inkLine([[mx - mw * .85, my + .08 * u], [mx, my - .04 * u], [mx + mw * .85, my + .08 * u]], fSw * .68, '#4B2126', 'inkfine', .55);
    } else if (m === 'pout') {
      paint(ellPts(mx, my + .02 * u, mw * .42, .085 * u, 12), { wash: TYY_PAL.lipBot, washOp: 215, ink: null });
      inkLine([[mx - mw * .50, my + .05 * u], [mx, my - .06 * u], [mx + mw * .50, my + .05 * u]], fSw * .65, '#4B2126', 'inkfine', .5);
    } else if (m === 'wobble') {
      inkLine([[mx - mw * .9, my + .03 * u], [mx - mw * .45, my - .06 * u], [mx, my + .05 * u], [mx + mw * .45, my - .06 * u], [mx + mw * .9, my + .03 * u]], fSw * .65, '#4B2126', 'inkfine', .45);
    } else if (m === 'cat') {
      paint(ellPts(mx, my + .05 * u, mw * .52, .065 * u, 10), { wash: TYY_PAL.lipTop, washOp: 185, ink: null });
      inkLine([[mx - mw * .90, my - .03 * u], [mx - mw * .42, my + .08 * u], [mx, my - .03 * u], [mx + mw * .42, my + .08 * u], [mx + mw * .90, my - .03 * u]], fSw * .65, '#4B2126', 'inkfine', .5);
    } else if (m === 'o' || m === 'O' || m === 'yawn') {
      const rx = m === 'o' ? mw * .42 : mw * .65;
      const ry = m === 'o' ? .12 * u : .22 * u;
      paint(ellPts(mx, my + .04 * u, rx, ry, 14), { wash: TYY_PAL.mouthDark, ink: '#341A1F', sw: fSw * .72 });
      if (m !== 'o') paint(ellPts(mx, my + .04 * u + ry * .42, rx * .65, ry * .42, 10), { wash: TYY_PAL.tongue, ink: null });
    } else if (m === 'open' || m === 'grin' || m === 'laugh' || m === 'wail') {
      const h = m === 'grin' ? .20 * u : m === 'open' ? .25 * u : .30 * u;
      const flipDown = m === 'wail';
      const cav = flipDown ? [
        [mx - mw * .95, my + h * .75], [mx, my - .06 * u], [mx + mw * .95, my + h * .75], [mx, my + h * .55],
      ] : [
        [mx - mw * 1.02, my - .03 * u], [mx, my - .01 * u], [mx + mw * 1.02, my - .03 * u],
        [mx + mw * .68, my + h], [mx, my + h * 1.12], [mx - mw * .68, my + h],
      ];
      paint(closedThrough(cav, 2), { wash: TYY_PAL.mouthDark, ink: '#341A1F', sw: fSw * .72 });
      paint(ellPts(mx, my + h * .72, mw * .52, h * .34, 10), { wash: TYY_PAL.tongue, ink: null });
      if (m === 'grin' || m === 'laugh') {
        paint(rectPts(mx - mw * .68, my - .02 * u, mw * 1.36, h * .32), { wash: '#FCF9F5', ink: null });
      }
    } else if (m === 'teeth') {
      paint(rrPts(mx - mw * .95, my - .08 * u, mw * 1.9, .20 * u, .06 * u), { wash: '#FCF9F5', ink: '#341A1F', sw: fSw * .68 });
      inkLine([[mx - mw * .88, my + .02 * u], [mx + mw * .88, my + .02 * u]], fSw * .40, '#341A1F', 'inkfine', 0);
    } else if (m === 'tongue') {
      drawDewySmileLips(1.0);
      paint(closedThrough([
        [mx - mw * .18, my + .03 * u], [mx + mw * .48, my + .03 * u],
        [mx + mw * .44, my + .26 * u], [mx + mw * .15, my + .30 * u], [mx - mw * .12, my + .22 * u],
      ], 2), { wash: TYY_PAL.tongue, ink: '#341A1F', sw: fSw * .52 });
    } else {
      drawDewySmileLips(1.0);
    }
  }

  // Draws bare skin forearm + hand + delicate right-wrist bracelet (with knot on inner/thigh side!).
  // Called in `P.body` BEFORE the T-shirt sleeve cuff for low/hanging arms (so sleeve cuff overlaps arm root!),
  // and in `P.nearArms` for raised/point_up arms (where upper-arm stub was already tucked under sleeve in `P.body`!).
  function drawBareArmAndHand(ctx, which, layer, mode) {
    const { V, u, sw, J, o, cols, rs } = ctx;
    const vk = viewKey(V);
    const flip = !!o.flip;
    const a = which === 'L' ? (o.aL ?? -.68) : (o.aR ?? -.68);
    const arm = buildArmGeom(vk, which, a, o.pointUp || 0, flip, u, J);
    const wInfo = arm.wristInfo;
    const pAmt = wInfo.pAmt;
    const isRaised = pAmt > .35 || (a > .68 && vk !== 'side');

    if (mode === 'underSleeve' && isRaised) {
      // If `point_up`, draw ONLY the upper-arm stub entering the sleeve so the white sleeve cuff overlaps it!
      if (pAmt > .35) {
        rs('armStub' + which);
        const stubPts = arm.pointUpperStub.map(([px, py]) => [px * u, py * u]);
        paint(stubPts, { wash: cols.col, washOp: 255, ink: PAL.ink, sw: sw * .88 });
        paint([stubPts[0], stubPts[1], [lerp(stubPts[1][0], stubPts[2][0], .45), lerp(stubPts[1][1], stubPts[2][1], .45)], [lerp(stubPts[0][0], stubPts[3][0], .45), lerp(stubPts[0][1], stubPts[3][1], .45)]], { wash: cols.dk, washOp: 185, ink: null });
      }
      return;
    }
    if (mode === 'overHair' && !isRaised) return;

    rs('arm' + which);
    const skinWash = layer === 2 ? mixCol(cols.col, cols.dk, .26) : cols.col;

    // 1) Main forearm + hand wash
    paint(arm.poly, { wash: skinWash, washOp: 255, ink: null });

    if (pAmt > .45) {
      const qs = wInfo.qShift;
      // Soft peach elbow curve shadow
      paint(closedThrough([
        [(1.18 + qs) * u, -5.32 * u], [(1.40 + qs) * u, -5.12 * u], [(1.62 + qs) * u, -5.36 * u], [(1.40 + qs) * u, -5.26 * u],
      ], 2), { wash: cols.dk, washOp: 195 * pAmt, ink: null });
    } else {
      // Soft under-sleeve & inner-forearm cast shadow locked well inside forearm shaft
      const c = arm.armCtrl;
      const in0 = [lerp(c[15][0], c[2][0], .18) * u, lerp(c[15][1], c[2][1], .18) * u];
      const out0 = [lerp(c[15][0], c[2][0], .70) * u, lerp(c[15][1], c[2][1], .70) * u];
      const midIn = [lerp(c[14][0], c[3][0], .32) * u, lerp(c[14][1], c[3][1], .32) * u];
      const lowIn = [lerp(c[14][0], c[3][0], .18) * u, lerp(c[14][1], c[3][1], .18) * u];
      paint([in0, out0, midIn, lowIn], { wash: cols.dk, washOp: 160, ink: null });
    }

    // 2) Forearm + Hand Outline (for `point_up`, leave top-inner sleeve entry un-closed so it flows out of sleeve seamlessly!)
    if (pAmt > .45) {
      const hSw = Math.min(sw, u * .042);
      const qs = wInfo.qShift;
      // Continuous outer + elbow + inner forearm + index finger + outer palm contour
      const openContour = [
        [1.15 + qs, -5.84], [1.16 + qs, -5.28], [1.40 + qs, -5.06], [1.66 + qs, -5.32],
        [1.82 + qs, -6.18], [1.84 + qs, -7.18], [2.16 + qs, -7.50], [2.32 + qs, -7.76],
        [2.20 + qs, -7.98], [2.04 + qs, -8.14], [1.92 + qs, -8.22],
        [2.24 + qs, -8.86], [2.20 + qs, -9.06], [2.02 + qs, -9.00], [1.68 + qs, -8.22],
      ].map(([px, py]) => [px * u + jit(J * .25), py * u + jit(J * .25)]);
      inkLine(openContour, sw * .90, PAL.ink, 'ink', .5);
      // Inner rising forearm line from wrist down into sleeve
      inkLine([[(1.48 + qs) * u, -7.26 * u], [(1.28 + qs) * u, -6.45 * u], [(1.15 + qs) * u, -5.80 * u]], sw * .90, PAL.ink, 'ink', .4);

      // 3) Sculpted Petite Curled Fingers (middle, ring, pinky as 3 clear stepped rounded ovals!)
      const fingers = [
        // Middle finger curled pad
        [[1.92, -8.20], [2.08, -8.18], [1.92, -7.84], [1.76, -7.86], [1.78, -8.06]],
        // Ring finger curled pad
        [[2.08, -8.06], [2.22, -8.00], [2.06, -7.70], [1.92, -7.74], [1.94, -7.92]],
        // Pinky finger curled pad
        [[2.20, -7.90], [2.32, -7.80], [2.18, -7.56], [2.04, -7.60], [2.06, -7.76]],
      ];
      for (const fp of fingers) {
        const fPts = closedThrough(fp.map(([fx, fy]) => [(fx + qs) * u, fy * u]), 2);
        paint(fPts, { wash: skinWash, washOp: 255, fill: cols.dk, fillOp: 45, ink: PAL.ink, sw: hSw * .72 });
      }

      // 4) Distinct, Cute Rounded THUMB Polygon folded across palm over middle finger base (replaces boxy mitten!)
      const thumbPoly = closedThrough([
        [(1.48 + qs) * u, -7.28 * u],    // slender inner wrist base
        [(1.36 + qs) * u, -7.62 * u],    // rounded left thumb base
        [(1.38 + qs) * u, -7.98 * u],    // rounded upper-left thumb knuckle
        [(1.62 + qs) * u, -8.12 * u],    // thumb top curve
        [(1.82 + qs) * u, -8.02 * u],    // cute rounded thumb tip resting over curled middle finger!
        [(1.76 + qs) * u, -7.82 * u],    // thumb underside pad
        [(1.58 + qs) * u, -7.74 * u],    // inner thumb crease
      ], 2);
      paint(thumbPoly, { wash: skinWash, washOp: 255, ink: null });
      inkLine([
        [(1.48 + qs) * u, -7.28 * u], [(1.36 + qs) * u, -7.62 * u], [(1.38 + qs) * u, -7.98 * u],
        [(1.62 + qs) * u, -8.12 * u], [(1.82 + qs) * u, -8.02 * u], [(1.74 + qs) * u, -7.82 * u], [(1.58 + qs) * u, -7.76 * u],
      ], hSw * .80, PAL.ink, 'ink', .55);
      // Dainty palm crease arc below thumb
      inkLine([[(1.62 + qs) * u, -7.76 * u], [(1.70 + qs) * u, -7.54 * u]], hSw * .56, PAL.ink, 'inkfine', .4);
    } else {
      paint(arm.poly, { ink: PAL.ink, sw: sw * .90 });
      // If raised cheer arm (`isRaised`), re-paint white sleeve cuff edge cleanly over upper-arm root!
      if (isRaised) {
        const cOut = arm.slvCtrl[3], cMid = arm.slvCtrl[4], cIn = arm.slvCtrl[5];
        inkLine([[cOut[0] * u, cOut[1] * u], [cMid[0] * u, cMid[1] * u], [cIn[0] * u, cIn[1] * u]], sw * .92, PAL.ink, 'ink', .3);
      }
      if (u > 14) {
        const { cx, cy, hnx, hny, hx, hy } = wInfo;
        inkLine([
          [cx + hnx * .06 + hx * .64, cy + hny * .06 + hy * .64],
          [cx + hnx * .04 + hx * .92, cy + hny * .04 + hy * .92],
        ], sw * .40, PAL.ink, 'inkfine', .2);
      }
    }

    // 5) Delicate Right-Wrist Red-and-Black Braided Thin Cord Bracelet — KNOT ON INNER/THIGH EDGE (screen-right in front)!
    if (isAnatRightArm(which, flip)) {
      const { cx, cy, hnx, hny, side } = wInfo;
      const bSw = Math.min(sw, u * .038);
      // `hnx` points OUTWARD (`-x` on screen-left arm); `-hnx` points INWARD toward thigh (`+x` on screen-left arm, matching reference!)
      const pOut = [cx + hnx * .21, cy + hny * .21];
      const pIn = [cx - hnx * .18, cy - hny * .18];
      const mid = [(pOut[0] + pIn[0]) * .5, (pOut[1] + pIn[1]) * .5 + .022 * u];
      // Ultra-slender braided red & black strands
      inkLine([pOut, [mid[0], mid[1] - .016 * u], pIn], bSw * .68, TYY_PAL.cordRed, 'inkfine', .45);
      inkLine([[pOut[0], pOut[1] + .022 * u], [mid[0], mid[1] + .018 * u], [pIn[0], pIn[1] - .012 * u]], bSw * .56, TYY_PAL.cordBlk, 'inkfine', .45);
      // Petite round knot + tiny tail loops on INNER wrist edge (`pIn`, facing thigh — exact 1:1 match to reference!)
      const inDir = -side; // +1 in standard front view (pointing toward thigh!)
      const kx = pIn[0] + inDir * .035 * u;
      const ky = pIn[1] + .018 * u;
      paint(ellPts(kx, ky, .038 * u, .032 * u, 8), { wash: TYY_PAL.cordRed, ink: TYY_PAL.cordBlk, sw: bSw * .42 });
      inkLine([[kx, ky], [kx + inDir * .065 * u, ky + .065 * u]], bSw * .42, TYY_PAL.cordBlk, 'inkfine', .3);
      inkLine([[kx, ky], [kx + inDir * .035 * u, ky + .085 * u]], bSw * .42, TYY_PAL.cordRed, 'inkfine', .3);
    }

    const hook = which === 'L' ? o.armL : o.armR;
    if (hook) {
      push();
      translate(arm.tip[0], arm.tip[1]);
      if (which === 'L') scale(-1, 1);
      hook(u, sw);
      pop();
    }
  }

  // Draws unified seamless white T-shirt + drop-shoulder sleeves in `P.body` (zero shoulder black box, under all hair!)
  function drawSeamlessShirtAndSleeves(ctx) {
    const { V, u, sw, J, o, rs } = ctx;
    const vk = viewKey(V);
    const flip = !!o.flip;
    rs('shirt');

    const armGeoms = V.arms.map(([, , which, layer]) => {
      const a = which === 'L' ? (o.aL ?? -.68) : (o.aR ?? -.68);
      return { which, layer, geom: buildArmGeom(vk, which, a, o.pointUp || 0, flip, u, J) };
    });

    // 1) Build torso contour
    let torsoPts;
    const isBack = vk === 'back' || vk === 'qback';
    const lowSign = (isBack ? 1 : -1) * (flip && vk !== 'front' && vk !== 'back' ? -1 : 1);

    if (vk === 'side') {
      const lowSide = !flip;
      const ctrl = lowSide ? [
        [-.38, -7.52], [.42, -7.46], [.78, -6.78], [.90, -5.35], [.94, -3.72],
        [.76, -3.32], [-.05, -3.28], [-.78, -3.36], [-.92, -4.18], [-.90, -5.65], [-.78, -6.90],
      ] : [
        [-.38, -7.52], [.42, -7.46], [.78, -6.78], [.90, -5.35], [.98, -4.35],
        [.72, -4.18], [-.05, -4.25], [-.78, -4.05], [-.90, -4.65], [-.88, -5.85], [-.78, -6.90],
      ];
      torsoPts = closedThrough(ctrl, 3).map(([a, b]) => [a * u + jit(J * .36), b * u + jit(J * .36)]);
    } else {
      const sx = vk === 'q' ? .08 : vk === 'qback' ? -.08 : 0;
      const wScale = (vk === 'q' || vk === 'qback') ? .92 : 1.0;
      const raw = [
        [-.52, -7.54],
        [0, -7.40],        // clean U-collar bottom!
        [.48, -7.52],
        [1.22, -7.46],
        [1.14, -5.95],
        [1.26, -4.92],
        [1.48, -4.38],     // rounded plump French-tuck overhang pouf (`右腰小鼓包`)!
        [1.52, -4.16],
        [1.34, -4.08],
        [.74, -4.52],      // crisp French-tuck waist apex!
        [.22, -4.20],
        [-.28, -3.78],
        [-.88, -3.38],
        [-1.34, -3.28],    // low droopy right hem!
        [-1.46, -3.52],
        [-1.40, -4.32],
        [-1.42, -5.52],
        [-1.50, -7.46],
      ];
      const pts = raw.map(([rx, ry]) => [(rx * (-lowSign) * wScale + sx), ry]);
      if (lowSign > 0) pts.reverse();
      torsoPts = closedThrough(pts, 3).map(([a, b]) => [a * u + jit(J * .36), b * u + jit(J * .36)]);
    }

    // 2) Draw subtle interior sleeve-hole shadow strictly tucked inside cuff line (never overlapping skin below cuff!)
    for (const { geom } of armGeoms) {
      const cOut = geom.slvCtrl[3], cIn = geom.slvCtrl[5];
      const midX = (cOut[0] + cIn[0]) * .5 * u, midY = (cOut[1] + cIn[1]) * .5 * u;
      paint(ellPts(midX, midY - .03 * u, .28 * u, .07 * u, 10), { wash: TYY_PAL.shirtHole, washOp: 185, ink: null });
    }

    // 3) Paint unified white wash for torso + all sleeves FIRST (eliminates ALL internal black shoulder box lines!)
    for (const { geom } of armGeoms) {
      paint(geom.sleevePoly, { wash: TYY_PAL.shirt, washOp: 255, ink: null });
    }
    paint(torsoPts, { wash: TYY_PAL.shirt, washOp: 255, ink: null });

    // 4) Soft cool-grey fabric drape shadows along sleeve cuffs, low hem & French-tuck waist gather
    for (const { geom } of armGeoms) {
      const cOut = geom.slvCtrl[3], cIn = geom.slvCtrl[5], sOut = geom.slvCtrl[1];
      const dx = sOut[0] - cOut[0], dy = sOut[1] - cOut[1], len = Math.hypot(dx, dy) || 1;
      const ox = (dx / len) * .20, oy = (dy / len) * .20;
      paint([
        [cOut[0] * u, cOut[1] * u], [cIn[0] * u, cIn[1] * u],
        [(cIn[0] + ox) * u, (cIn[1] + oy) * u], [(cOut[0] + ox) * u, (cOut[1] + oy) * u],
      ], { wash: TYY_PAL.shirtDk, washOp: 155, ink: null });
    }
    if (vk !== 'side') {
      const wS = (vk === 'q' || vk === 'qback') ? .92 : 1.0;
      const fS = -lowSign;
      // Low left hem shadow
      paint(closedThrough([
        [-fS * 1.36 * wS * u, -4.45 * u], [-fS * 1.30 * wS * u, -3.38 * u],
        [-fS * .72 * wS * u, -3.50 * u], [-fS * .15 * wS * u, -3.92 * u], [-fS * .88 * wS * u, -3.82 * u],
      ], 2), { wash: TYY_PAL.shirtDk, washOp: 210, ink: null });
      // Right French-tuck & bloused pouf shadow
      paint(closedThrough([
        [fS * .12 * wS * u, -4.25 * u], [fS * .74 * wS * u, -4.54 * u],
        [fS * 1.40 * wS * u, -4.16 * u], [fS * 1.18 * wS * u, -4.55 * u], [fS * .68 * wS * u, -4.78 * u],
      ], 2), { wash: TYY_PAL.shirtDk, washOp: 195, ink: null });
      // Soft diagonal fold shadow ribbon across tummy
      paint(closedThrough([
        [fS * -.32 * wS * u, -5.65 * u], [fS * .08 * wS * u, -5.02 * u],
        [fS * .62 * wS * u, -4.60 * u], [fS * .42 * wS * u, -4.78 * u], [fS * -.08 * wS * u, -5.22 * u],
      ], 2), { wash: TYY_PAL.shirtDk, washOp: 165, ink: null });
    }

    // 5) Selective Crisp Exterior Ink Outlines (ONLY outer sleeve edges + cuff + lower torso + collar — ZERO shoulder box!)
    for (const { geom } of armGeoms) {
      const s1 = geom.slvCtrl[1], s2 = geom.slvCtrl[2], cOut = geom.slvCtrl[3], cMid = geom.slvCtrl[4], cIn = geom.slvCtrl[5];
      // Outer shoulder-to-cuff + cuff opening + short armpit return
      inkLine([
        [s1[0] * u, s1[1] * u], [s2[0] * u, s2[1] * u], [cOut[0] * u, cOut[1] * u],
        [cMid[0] * u, cMid[1] * u], [cIn[0] * u, cIn[1] * u],
      ], sw * .95, PAL.ink, 'ink', .25);
      // Double-stitched sleeve cuff trim line!
      const dx = s1[0] - cOut[0], dy = s1[1] - cOut[1], len = Math.hypot(dx, dy) || 1;
      const ox = (dx / len) * .17, oy = (dy / len) * .17;
      inkLine([[(cIn[0] + ox) * u, (cIn[1] + oy) * u], [(cOut[0] + ox) * u, (cOut[1] + oy) * u]], sw * .50, TYY_PAL.shirtLine, 'inkfine', .1);
      // Dainty short armpit diagonal fold tick (matches reference!)
      if (vk !== 'side') {
        inkLine([[cIn[0] * u, cIn[1] * u], [(cIn[0] - (cOut[0] - cIn[0]) * .12) * u, (cIn[1] - .48) * u]], sw * .62, TYY_PAL.shirtLine, 'inkfine', .2);
      }
    }

    if (vk === 'side') {
      // Side torso front/back/hem outline (leaving center shoulder open for seamless drop sleeve!)
      const lowH = !flip ? -3.32 : -4.20;
      inkLine([[.42 * u, -7.46 * u], [.82 * u, -6.65 * u], [.94 * u, (lowH - .25) * u], [.76 * u, lowH * u], [-.78 * u, (lowH - .05) * u], [-.92 * u, -4.35 * u], [-.82 * u, -6.75 * u]], sw * .95, PAL.ink, 'ink', .45);
    } else {
      const sx = vk === 'q' ? .08 : vk === 'qback' ? -.08 : 0;
      const wS = (vk === 'q' || vk === 'qback') ? .92 : 1.0;
      const fS = -lowSign;
      const X = v => (v * fS * wS + sx) * u;
      // Left ribcage -> low droopy hem -> diagonal French tuck -> right pouf -> right ribcage (no shoulder box!)
      inkLine([
        [X(-1.42), -5.62 * u], [X(-1.40), -4.32 * u], [X(-1.46), -3.52 * u], [X(-1.34), -3.28 * u],
        [X(-.88), -3.38 * u], [X(-.28), -3.78 * u], [X(.22), -4.20 * u], [X(.74), -4.52 * u],
        [X(1.34), -4.08 * u], [X(1.52), -4.16 * u], [X(1.48), -4.38 * u],
        [X(1.26), -4.92 * u], [X(1.16), -5.92 * u],
      ], sw * .96, PAL.ink, 'ink', .48);

      // 6) Delicate, staggered curved grey-ink fabric folds (replaces stiff thick black stick!)
      if (vk === 'front' || vk === 'q') {
        inkLine([[X(-.30), -5.68 * u], [X(.04), -5.04 * u], [X(.54), -4.62 * u]], sw * .48, TYY_PAL.shirtLine, 'inkfine', .55);
        inkLine([[X(.20), -5.10 * u], [X(.46), -4.82 * u], [X(.72), -4.64 * u]], sw * .40, TYY_PAL.shirtLine, 'inkfine', .5);
        inkLine([[X(-1.02), -3.60 * u], [X(-.42), -3.90 * u], [X(.16), -4.30 * u]], sw * .44, TYY_PAL.shirtLine, 'inkfine', .5);
        inkLine([[X(.32), -4.40 * u], [X(.76), -4.58 * u], [X(1.18), -4.36 * u]], sw * .48, TYY_PAL.shirtLine, 'inkfine', .5);
      }
    }

    // 7) Clean Single-Line White Ribbed Crew-Neck Collar (NO thick black choker band!)
    if (vk === 'front' || vk === 'q') {
      const nx = (vk === 'q' ? .22 : -.02) * u;
      // Single crisp inner U-collar edge
      inkLine([
        [nx - .48 * u, -7.62 * u], [nx - .26 * u, -7.42 * u],
        [nx, -7.37 * u], [nx + .26 * u, -7.42 * u], [nx + .46 * u, -7.60 * u],
      ], sw * .82, PAL.ink, 'ink', .55);
      // Soft cool-grey outer ribbed collar seam line
      inkLine([
        [nx - .56 * u, -7.46 * u], [nx - .30 * u, -7.22 * u],
        [nx, -7.16 * u], [nx + .30 * u, -7.22 * u], [nx + .54 * u, -7.44 * u],
      ], sw * .48, TYY_PAL.shirtLine, 'inkfine', .55);
    } else if (vk === 'back' || vk === 'qback') {
      inkLine([[-.46 * u, -7.56 * u], [0, -7.44 * u], [.46 * u, -7.56 * u]], sw * .78, PAL.ink, 'ink', .5);
    }
  }

  function drawGloom(u, sw, V, g) {
    const L = -1.35 * u, R = 1.35 * u;
    paint(ellPts(0, -10.8 * u, 1.3 * u, .75 * u, 16), { fill: PAL.indigo, fillOp: 135 * g, bleed: .1, tex: .5, ink: null });
    for (let i = 0; i < 6; i++) {
      const gx = lerp(L + .25 * u, R - .25 * u, i / 5);
      inkLine([[gx, -11.35 * u], [gx + jit(u * .03), (-11.35 + 1.45 * g * (.7 + .3 * hash(i))) * u]], sw * .45, PAL.ink, 'inkfine', 0);
    }
  }

  // ---------- Blueprint Registration ----------
  const pointUpEmotion = {
    eyes: 'normal', mouth: 'smile', blush: .64, take: .45,
    body: t => {
      const b = _b(t);
      const gentle = Math.abs(T) < .05 ? 0 : b.ab;
      return {
        dy: -.14 * gentle,
        sq: .018 * (Math.abs(T) < .05 ? 0 : b.hit),
        aL: -.68 + .03 * (Math.abs(T) < .05 ? 0 : b.s1),
        pointUp: 1,
        blush: .64,
      };
    }
  };

  CharacterRegistry.register('tuyiyi', {
    id: 'tuyiyi',
    name: '兔一一',
    palette: TYY_PAL,
    metrics: {
      width: 5.7, height: 12.24,
      shadowWidth: 5.6, shadowRx: 2.35, shadowRy: .56,
      hatY: -11.88, hatW: .72,
      emoteTop: [0, -14.3], emoteSide: [3.15, -10.8],
      jitter: .030, swScale: .76,
    },
    views: VIEWS,
    emotionChannels: ['pointUp'],
    emotionOverrides: {
      neutral: {
        eyes: 'normal', mouth: 'smile', blush: .58, take: .3,
        body: t => {
          const b = _b(t);
          return { dy: -.18 * b.ab, sq: .022 * b.hit, aL: -.68 + .05 * b.s1, aR: -.68 - .05 * b.s1, blush: .58 };
        }
      },
      happy: {
        eyes: 'happy', mouth: 'smile', blush: .68, take: .55,
        body: t => {
          const b = _b(t);
          return { dy: -.82 * b.ab, sq: .065 * b.hit, aL: -.35 + .22 * b.s1, aR: -.35 - .22 * b.s1, blush: .68 };
        }
      },
      hopeful: {
        eyes: 'shine', mouth: 'smile', blush: .64, take: .5,
        body: t => {
          const b = _b(t);
          return { sq: -.04 - .02 * b.ab, dy: -.22 * b.ab, lookY: -.26, aL: -.52 + .08 * b.s1, aR: -.52 - .08 * b.s1, blush: .64 };
        }
      },
      // Cute rosy-pink girl flush instead of muddy dark-red pigment mix on `angry` & `furious`!
      angry: {
        eyes: 'angry', mouth: 'teeth', tint: '#FF9EA4', tintK: .28, blush: .82, emote: 'anger', take: .8,
        body: t => {
          const b = _b(t);
          return { dx: .10 * Math.sin(t * TAU * 18), sq: .12 * b.hit, aL: -.30 + .10 * b.hit, aR: -.30 + .10 * b.hit, blush: .82 };
        }
      },
      furious: {
        eyes: 'red', mouth: 'wail', tint: '#FF8E98', tintK: .42, blush: .96, emote: 'steam', take: 1.2,
        body: t => {
          const b = _b(t);
          return { dx: .20 * Math.sin(t * TAU * 20), rot: .025 * Math.sin(t * TAU * 13), sq: .18 * b.hit, dy: -.75 * Math.sin(b.f * Math.PI) * (1 - b.f), aL: 1.0 + .2 * Math.sin(t * TAU * 9), aR: 1.0 - .2 * Math.sin(t * TAU * 9), blush: .96 };
        }
      },
      point_up: pointUpEmotion,
      one: { ...pointUpEmotion, emote: 'spark' },
      sweet_wave: {
        eyes: 'happy', mouth: 'grin', blush: .74, emote: 'hearts', take: .55,
        body: t => {
          const b = _b(t);
          return {
            dy: -.45 * b.ab,
            rot: .04 * b.s1,
            sq: .04 * b.hit,
            aL: -.68 + .06 * b.s1,
            aR: 1.18 + .26 * Math.sin(b.bp * TAU),
            blush: .74,
          };
        }
      },
    },
    parts: {
      backAppendages: ctx => {
        const { V, u, sw, J, o, rs } = ctx;
        const vk = viewKey(V);
        if (vk === 'back' || vk === 'qback') return;
        rs('backHair');
        const pts = buildBackHairPts(vk, u, o, J);
        paint(pts, { wash: TYY_PAL.hair, washOp: 255, ink: TYY_PAL.hairDk, sw: sw * 1.04 });
        if (vk === 'front' || vk === 'q') {
          inkLine([[-2.32 * u, -9.25 * u], [-2.52 * u, -7.85 * u], [-2.38 * u, -6.42 * u]], sw * .66, TYY_PAL.hairDk, 'inkfine', .5);
          inkLine([[-1.96 * u, -8.65 * u], [-2.12 * u, -7.35 * u], [-2.02 * u, -6.18 * u]], sw * .58, TYY_PAL.hairDk, 'inkfine', .5);
          drawTaperedHairSheen(u, [[[-2.14, -8.35], [-2.22, -7.95], [-2.20, -7.55], .055, TYY_PAL.hairHi]]);
        }
      },
      farArms: ctx => {
        // Far arms in 3/4 views (`layer !== 1`): bare forearm drawn behind legs & shirt sleeve!
        ctx.V.arms.filter(a => a[3] !== 1).forEach(([, , which, layer]) => drawBareArmAndHand(ctx, which, layer, 'underSleeve'));
      },
      legs: ctx => {
        const { V, u, sw, J, o, rs } = ctx;
        const vk = viewKey(V);
        const legs = computeLegTransforms(V, u, o);

        // 1) Plump rounded cool-grey-white casual sneakers
        for (const lg of legs) {
          rs('shoe' + lg.i);
          const shoePoly = buildShoePts(lg.cx, lg.footY, lg.dir, lg.tilt, vk, u, J);
          const sCol = lg.isFar ? mixCol(TYY_PAL.shoe, TYY_PAL.shoeDk, .38) : TYY_PAL.shoe;
          paint(shoePoly, { wash: sCol, washOp: 255, ink: null });
          paint(ellPts(lg.cx, lg.footY - .24 * u, .34 * u, .12 * u, 10), { wash: TYY_PAL.shoeLt, washOp: 205, ink: null });
          paint(shoePoly, { ink: PAL.ink, sw: sw * .95 });
        }

        // 2) Wide-leg black casual trousers (smooth hip join, gentle inverted-V inner leg gap & soft rounded hem arches!)
        rs('pants');
        if (vk === 'side') {
          for (const lg of legs) {
            const xShift = lg.xOff * u;
            const yShift = lg.yOff * u;
            const pCtrl = [
              [-.74, -4.35], [.74, -4.35], [.84 + lg.xOff * .85, -1.85 + lg.yOff * .5],
              [.86 + lg.xOff, -.34 + lg.yOff], [.20 + lg.xOff, -.36 + lg.yOff],
              [-.76 + lg.xOff, -.26 + lg.yOff], [-.78 + lg.xOff * .75, -2.05 + lg.yOff * .5],
            ].map(([a, b]) => [a * u + jit(J * .30), b * u + jit(J * .30)]);
            const pCol = lg.isFar ? TYY_PAL.pantsDk : TYY_PAL.pants;
            paint(closedThrough(pCtrl, 2), { wash: pCol, washOp: 255, ink: PAL.ink, sw: sw * .96 });
            inkLine([[xShift - .48 * u, yShift - .48 * u], [xShift, yShift - .53 * u], [xShift + .48 * u, yShift - .46 * u]], sw * .52, TYY_PAL.pantsSeam, 'inkfine', .5);
          }
        } else {
          const L0 = legs[0], L1 = legs[1];
          const lOx = L0.xOff, lOy = L0.yOff;
          const rOx = L1.xOff, rOy = L1.yOff;
          const wS = (vk === 'q' || vk === 'qback') ? .90 : 1.0;
          const crotchX = vk === 'q' ? .22 : vk === 'qback' ? -.18 : .10;
          const pantsCtrl = [
            [-1.34 * wS, -4.55],
            [1.36 * wS, -4.55],
            [1.38 * wS + rOx * .35, -3.25],     // wider smooth hip contour meeting French tuck!
            [1.38 * wS + rOx * .85, -1.45 + rOy * .5],
            [1.38 * wS + rOx, -.34 + rOy],
            [1.18 * wS + rOx, -.25 + rOy],      // soft rounded outer-right hem corner
            [.68 * wS + rOx, -.35 + rOy],       // gentle wide arch over right sneaker (no sharp triangle notch!)
            [.16 * wS + rOx, -.24 + rOy],       // soft rounded inner-right hem corner
            [.14 * wS + rOx * .5, -1.68 + rOy * .3],
            [crotchX, -3.08],                   // natural inverted-V inner-thigh separation!
            [-.22 * wS + lOx * .5, -1.68 + lOy * .3],
            [-.44 * wS + lOx, -.24 + lOy],      // soft rounded inner-left hem corner
            [-1.08 * wS + lOx, -.35 + lOy],     // gentle wide arch over left sneaker!
            [-1.68 * wS + lOx, -.25 + lOy],     // soft rounded outer-left hem corner
            [-1.78 * wS + lOx, -.38 + lOy],
            [-1.56 * wS + lOx * .85, -1.65 + lOy * .5],
            [-1.38 * wS + lOx * .35, -3.30],
          ];
          const pantsPts = closedThrough(pantsCtrl, 2).map(([a, b]) => [a * u + jit(J * .32), b * u + jit(J * .32)]);
          paint(pantsPts, { wash: TYY_PAL.pants, washOp: 255, ink: TYY_PAL.pantsDk, sw: sw * 1.02 });

          if (vk === 'front' || vk === 'q') {
            inkLine([[(crotchX + .05) * u, -4.35 * u], [(crotchX + .01) * u, -3.15 * u], [(crotchX - .14) * u, -2.72 * u]], sw * .56, TYY_PAL.pantsSeam, 'inkfine', .4);
            inkLine([[(crotchX + .50) * u, -4.35 * u], [(crotchX + .64) * u, -3.72 * u]], sw * .50, TYY_PAL.pantsSeam, 'inkfine', .3);
          }
          // Gentle curved stack folds above both wide pant hems
          inkLine([[(-1.54 * wS + lOx) * u, (-.48 + lOy) * u], [(-1.08 * wS + lOx) * u, (-.56 + lOy) * u], [(-.58 * wS + lOx) * u, (-.46 + lOy) * u]], sw * .54, TYY_PAL.pantsSeam, 'inkfine', .5);
          inkLine([[(.28 * wS + rOx) * u, (-.46 + rOy) * u], [(.68 * wS + rOx) * u, (-.56 + rOy) * u], [(1.14 * wS + rOx) * u, (-.48 + rOy) * u]], sw * .54, TYY_PAL.pantsSeam, 'inkfine', .5);
        }
      },
      body: ctx => {
        const { V, u, sw, J, o, cols, rs } = ctx;
        const vk = viewKey(V);

        // 1) Slender Neck + Warm Chin Shadow DRAWN FIRST (so T-shirt U-collar sits cleanly over lower neck with ONE single crisp line!)
        rs('neck');
        const nx = (vk === 'q' ? .22 : vk === 'side' ? .14 : vk === 'qback' ? -.18 : -.02) * u;
        const neckPts = closedThrough([
          [nx - .34 * u, -8.32 * u],
          [nx + .34 * u, -8.32 * u],
          [nx + .44 * u, -7.25 * u],
          [nx - .44 * u, -7.25 * u],
        ], 2);
        paint(neckPts, { wash: cols.col, washOp: 255, ink: null });
        paint(closedThrough([
          [nx - .34 * u, -8.28 * u], [nx + .34 * u, -8.28 * u],
          [nx + .36 * u, -7.64 * u], [nx - .32 * u, -7.86 * u],
        ], 2), { wash: cols.dk, washOp: 215, ink: null });
        inkLine([[nx - .33 * u, -8.12 * u], [nx - .36 * u, -7.56 * u]], sw * .82, PAL.ink, 'ink', .2);
        inkLine([[nx + .33 * u, -8.12 * u], [nx + .35 * u, -7.56 * u]], sw * .82, PAL.ink, 'ink', .2);

        // 2) Bare hanging arms (or upper-arm stub for `point_up`) drawn BEFORE seamless T-shirt sleeves so sleeve cuffs overlap arm roots!
        V.arms.filter(a => a[3] === 1).forEach(([, , which, layer]) => drawBareArmAndHand(ctx, which, layer, 'underSleeve'));

        // 3) Unified Seamless White Crew-Neck T-Shirt + Drop-Shoulder Sleeves (UNDER all chest & back hair!)
        drawSeamlessShirtAndSleeves(ctx);

        // 4) Cute Rounded Left & Right Ears + Baby-Fat Plush Q-Girl Face Skin + Creamy Blush!
        rs('headSkin');
        if (vk === 'front') {
          const earL = closedThrough([[-1.38, -9.20], [-1.78, -9.14], [-1.92, -8.90], [-1.74, -8.66], [-1.34, -8.70]], 2).map(([a, b]) => [a * u, b * u]);
          paint(earL, { wash: cols.col, fill: cols.dk, fillOp: 85, ink: PAL.ink, sw: sw * .84 });
          inkLine([[-1.70 * u, -9.00 * u], [-1.52 * u, -8.93 * u], [-1.56 * u, -8.78 * u]], sw * .48, PAL.ink, 'inkfine', .5);

          // Peeking dainty right ear rim at y=-9.18..-8.76 (`x` reaches +1.50u so it peeks cleanly inside right bang!)
          const earR = closedThrough([[1.24, -9.18], [1.46, -9.12], [1.52, -8.94], [1.40, -8.76], [1.20, -8.78]], 2).map(([a, b]) => [a * u, b * u]);
          paint(earR, { wash: cols.col, fill: cols.dk, fillOp: 95, ink: PAL.ink, sw: sw * .82 });
          inkLine([[1.40 * u, -9.00 * u], [1.32 * u, -8.92 * u]], sw * .42, PAL.ink, 'inkfine', .4);
        } else if (vk === 'q') {
          const earL = closedThrough([[-1.04, -9.24], [-1.44, -9.16], [-1.54, -8.92], [-1.38, -8.70], [-1.00, -8.74]], 2).map(([a, b]) => [a * u, b * u]);
          paint(earL, { wash: cols.col, fill: cols.dk, fillOp: 85, ink: PAL.ink, sw: sw * .84 });
          inkLine([[-1.34 * u, -9.00 * u], [-1.18 * u, -8.94 * u], [-1.22 * u, -8.80 * u]], sw * .48, PAL.ink, 'inkfine', .5);
        } else if (vk === 'side') {
          const earS = closedThrough([[-.18, -9.24], [-.52, -9.16], [-.62, -8.92], [-.46, -8.70], [-.15, -8.74]], 2).map(([a, b]) => [a * u, b * u]);
          paint(earS, { wash: cols.col, fill: cols.dk, fillOp: 85, ink: PAL.ink, sw: sw * .84 });
          inkLine([[-.42 * u, -9.00 * u], [-.28 * u, -8.92 * u]], sw * .46, PAL.ink, 'inkfine', .4);
        }

        const headPoly = buildHeadSkinPts(vk, u, J);
        if (headPoly) {
          paint(headPoly, { wash: cols.col, washOp: 255, ink: null });
          const fx = (vk === 'q' ? .45 : vk === 'side' ? .55 : 0) * u;
          paint(ellPts(fx, -10.32 * u, .80 * u, .46 * u, 14), { fill: cols.lt, fillOp: 105, bleed: .28, border: .04, tex: .4, ink: null });

          const bAmt = o.blush === undefined ? .58 : (o.blush === true ? 1 : clamp(o.blush));
          if (bAmt > .02 && V.face) {
            for (const s of V.face.sides) {
              const ep = V.face.eyePos && V.face.eyePos[String(s)];
              const bx = ((ep ? ep[0] : s * V.face.eyeX) + (vk === 'side' ? -.10 : s * .10)) * u;
              const by = V.face.by * u;
              paint(ellPts(bx, by, .48 * u, .26 * u, 16), { wash: TYY_PAL.blush, washOp: 56 * bAmt, fill: TYY_PAL.blush, fillOp: 185 * bAmt, bleed: .32, border: .02, tex: .22, ink: null });
              if (bAmt > .80) {
                for (let k = 0; k < 2; k++) {
                  inkLine([[bx - .14 * u + k * .18 * u, by + .08 * u], [bx - .06 * u + k * .18 * u, by - .08 * u]], sw * .34, mixCol(TYY_PAL.blush, PAL.ink, .25), 'inkfine', 0);
                }
              }
            }
          }
          paint(headPoly, { ink: PAL.ink, sw: sw * .98 });
        }
      },
      frontAppendages: ctx => {
        drawFrontAndCrownHair(ctx);
        if (ctx.o.gloom > .02) drawGloom(ctx.u, ctx.sw, ctx.V, ctx.o.gloom);
      },
      face: ctx => {
        const { V, u, sw, o, rs } = ctx;
        if (o.hat === 'mask' && V.face.sides.length > 1) {
          drawSharedFaceAccessory(u, 'mask', sw, V.face.sides, V.face);
        }
        rs('brows');
        drawEyebrows(ctx);
        rs('eyes');
        drawEyes(ctx);
        rs('mouth');
        drawNoseAndMouth(ctx);
        if (['cat', 'masq', 'bowtie'].includes(o.hat)) {
          drawSharedFaceAccessory(u, o.hat, sw, V.face.sides, V.face);
        }
      },
      hat: ctx => {
        const { V, u, sw, o, rs } = ctx;
        rs('hat');
        push();
        translate(V.hat * u, 0);
        scale(V.hw / .72, 1);
        drawSharedHat(u, o.hat, sw, {
          y: V.hatY,
          w: .72,
          bandY: V.bandY,
          bandW: V.bandW,
          earX: V.earX,
          earY: V.earY,
          bodyCol: TYY_PAL.hair,
        });
        pop();
      },
      nearArms: ctx => {
        // Raised forearms & signature `point_up` bent forearm+hand sit cleanly in front of outer hair edge!
        ctx.V.arms.filter(a => a[3] === 1).forEach(([, , which, layer]) => drawBareArmAndHand(ctx, which, layer, 'overHair'));
      },
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

      const bodyLocal = buildCoreBodyPoly(vk, u, o, 0);
      const backHairLocal = buildBackHairPts(vk, u, o, 0);
      const eyesLocal = buildEyeGeometry(V, u, o);
      const armsLocal = V.arms.map(([, , which]) => {
        const a = which === 'L' ? (o.aL ?? -.68) : (o.aR ?? -.68);
        const res = buildArmGeom(vk, which, a, o.pointUp || 0, !!o.flip, u, 0);
        return { which, root: res.root, tip: res.tip, poly: res.poly };
      });
      const legTransforms = computeLegTransforms(V, u, o);
      const feetPolys = legTransforms.map(lg => buildShoePts(lg.cx, lg.footY, lg.dir, lg.tilt, vk, u, 0));

      let feetBottomY = -Infinity;
      for (const fp of feetPolys) for (const [, py] of fp) if (py > feetBottomY) feetBottomY = py;

      const allLocal = [...bodyLocal, ...backHairLocal, ...feetPolys.flat(), ...armsLocal.flatMap(a => a.poly)];
      const hasNaN = allLocal.some(([a, b]) => !Number.isFinite(a) || !Number.isFinite(b));

      const worldPts = xformPoly(allLocal);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [wx, wy] of worldPts) {
        if (wx < x0) x0 = wx; if (wx > x1) x1 = wx;
        if (wy < y0) y0 = wy; if (wy > y1) y1 = wy;
      }

      return {
        charId: 'tuyiyi',
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
        billPoly: null,
        billPolyLocal: null,
        arms: armsLocal.map(a => ({
          which: a.which,
          root: xform(a.root),
          rootLocal: a.root,
          tipLocal: a.tip,
          poly: xformPoly(a.poly),
          polyLocal: a.poly,
        })),
        hairFeathers: [],
        feetPolysLocal: feetPolys,
        hatAnchor: { y: V.hatY * u, w: V.hw, bandY: V.bandY * u, bandW: V.bandW },
        hasNaN,
        worldBBox: [x0, y0, x1, y1],
      };
    },
  });

  window.tuyiyi = function tuyiyi(x, y, u, o = {}) {
    return actor.as('tuyiyi', x, y, u, o);
  };
})();
