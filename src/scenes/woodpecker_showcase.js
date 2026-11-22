// woodpecker_showcase.js: 16-second hand-painted woodland showcase starring Woodpecker (or any swapped character!).
// Registered as SceneRegistry 'forest', decoupled from specific protagonist via actor().
(() => {
  const WIPE_FOREST = [PAL.sap, '#3B6644'];
  const WIPE_AMBER = [PAL.ochre, PAL.clay];

  // ---------- Woodland World Helpers (pure functions of t, each with isolated boilSeed) ----------
  function drawWoodlandBg(t, dusk = 0, G = 890) {
    boilSeed('wp_sky');
    const skyBase = mixCol(PAL.sky, '#E69F66', dusk);
    const horCol = mixCol(PAL.cream, '#FCE0A2', dusk);
    paint(rectPts(-600, -400, W + 1200, H + 800), { wash: skyBase, ink: null });
    paint(ellPts(W * .5, H * .74, W * .78, H * .44, 28, 8), { fill: horCol, fillOp: 145, bleed: .3, tex: .5, ink: null });

    // Sun orb
    boilSeed('wp_sun');
    const sx = lerp(340, 1480, dusk * .85), sy = lerp(195, 325, dusk);
    glow(sx, sy, 230 + 60 * dusk, '#FFE08A', .5 + .3 * dusk);
    paint(ellPts(sx, sy, 62, 62, 22, 1.5), { wash: mixCol(PAL.cream, '#FFD26E', dusk), fill: PAL.ochre, fillOp: 45, ink: PAL.ink, sw: .75 });

    // Soft clouds
    [[340, 185, 135, 40, .35], [1020, 150, 175, 46, .22], [1560, 220, 120, 36, .3]].forEach(([bx, by, rx, ry, spd], i) => {
      boilSeed('wp_cloud' + i);
      const cx = (bx + t * spd * 16) % (W + 300) - 150;
      const clCol = mixCol(PAL.cream, '#FFE6BD', dusk);
      paint(ellPts(cx, by, rx, ry, 18, 4), { wash: clCol, washOp: 210, fill: PAL.paper, fillOp: 55, bleed: .25, ink: null });
    });

    // Distant pine silhouettes & woodland hills
    boilSeed('wp_hills');
    const farPine = mixCol('#5A8A72', '#646A62', dusk * .55);
    const midHill = mixCol('#699B58', '#6B8249', dusk * .45);
    paint(ellPts(520, 860, 960, 300, 30, 3), { wash: farPine, fill: PAL.teal, fillOp: 40, bleed: .15, ink: PAL.ink, sw: .8 });
    paint(ellPts(1460, 880, 960, 280, 30, 3), { wash: midHill, fill: PAL.sap, fillOp: 50, bleed: .15, ink: PAL.ink, sw: .8 });

    // Background pine tree triangles
    [220, 340, 490, 1620, 1760].forEach((px, i) => {
      boilSeed('wp_pine' + i);
      const py = 690 + (i % 2) * 28, h = 155 + 45 * hash(i * 3);
      paint([[px, py - h], [px - 52, py], [px + 52, py]], { wash: mixCol('#4B7C5E', '#4F5E56', dusk * .5), ink: PAL.ink, sw: .7 });
    });

    // Mossy foreground clearing bank
    boilSeed('wp_ground');
    const mossCol = mixCol('#7BB356', '#8B9A46', dusk * .45);
    paint(rectPts(-400, G - 42, W + 800, 450, 3), { wash: mossCol, fill: PAL.sap, fillOp: 95, bleed: .06, tex: .6, ink: null });
    inkLine([[-350, G - 42], [W * .5, G - 48], [W + 350, G - 40]], 1.2, PAL.ink, 'ink', .5);

    // Grass tufts & tiny woodland mushrooms
    for (let i = 0; i < 10; i++) {
      boilSeed('wp_tuft' + i);
      const tx = 130 + i * 178, ty = G - 18 + (hash(i * 4.2) - .5) * 14;
      const sway = wob(t, .55, i * .7) * 6;
      for (const s of [-1, 0, 1]) {
        inkLine([[tx + s * 6, ty], [tx + s * 10 + sway, ty - 18 - 8 * hash(i + s)]], .75, mixCol(mossCol, PAL.cream, .3), 'inkfine', .4);
      }
    }
    [[260, G - 24], [1645, G - 20]].forEach(([mx, my], i) => {
      boilSeed('wp_mush' + i);
      paint(rectPts(mx - 8, my - 22, 16, 22, .6), { wash: PAL.cream, ink: PAL.ink, sw: .65 });
      paint(ellPts(mx, my - 24, 24, 13, 14, .8), { wash: '#DE544B', fill: PAL.rose, fillOp: 60, ink: PAL.ink, sw: .7 });
      paint(ellPts(mx - 8, my - 26, 4, 3, 8), { wash: PAL.cream, ink: null });
      paint(ellPts(mx + 7, my - 24, 3.5, 2.5, 8), { wash: PAL.cream, ink: null });
    });

    // Warm dusk fireflies in Shot 4
    if (dusk > .3) {
      for (let i = 0; i < 10; i++) {
        boilSeed('wp_ff' + i);
        const fx = 220 + hash(i * 9.1) * 1480 + Math.sin(t * 1.4 + i) * 35;
        const fy = 360 + hash(i * 4.3) * 420 + Math.cos(t * 1.9 + i) * 24;
        const pulseA = (.45 + .55 * Math.sin(t * 4 + i * 2)) * clamp((dusk - .3) * 1.5);
        glow(fx, fy, 42, '#FFE47A', .65 * pulseA);
        paint(ellPts(fx, fy, 5, 5, 8), { wash: '#FFF6AE', washOp: 240 * pulseA, ink: null });
      }
    }
  }

  // Hand-painted oak tree with bark texture, roots, canopy, and recoil sway on pecks
  function drawOakTree(leftEdgeX, G, t, recoil = 0, dusk = 0) {
    boilSeed('wp_oak');
    push();
    translate(leftEdgeX + 120, G - 25);
    rotate(recoil * .018);
    translate(-(leftEdgeX + 120), -(G - 25));

    const trunkW = 240;
    const tx = leftEdgeX;
    // Trunk contour flaring cleanly into ground roots
    const trunkPts = through([
      [tx - 48, G - 18], [tx - 12, G - 70], [tx, G - 220], [tx + 4, G - 560], [tx - 24, G - 780],
      [tx + trunkW + 24, G - 780], [tx + trunkW, G - 520], [tx + trunkW + 10, G - 180], [tx + trunkW + 55, G - 18],
    ], 3);
    trunkPts.push([tx + trunkW + 55, G - 18], [tx - 48, G - 18]);
    const barkCol = mixCol('#8E6245', '#76503D', dusk * .4);
    paint(trunkPts, { wash: barkCol, fill: '#65422C', fillOp: 85, bleed: .08, tex: .7, ink: PAL.ink, sw: 1.3 });

    // Bark grain lines & wood knot
    for (let i = 0; i < 5; i++) {
      const bx = tx + 35 + i * 42, by0 = G - 90 - (i % 2) * 80;
      inkLine([[bx, by0], [bx + (i % 2 ? 6 : -6), by0 - 150], [bx, by0 - 290]], .8, '#4F3424', 'inkfine', .5);
    }
    paint(ellPts(tx + 95, G - 290, 22, 34, 14, 1), { wash: '#603E29', ink: PAL.ink, sw: .8 });

    // Leafy watercolor oak canopy overhanging top-right
    boilSeed('wp_canopy');
    const leafCol = mixCol('#5A9348', '#6B8542', dusk * .45);
    [
      [tx - 40, G - 680, 175, 115],
      [tx + 140, G - 750, 230, 145],
      [tx + 320, G - 660, 185, 120],
    ].forEach(([cx, cy, rx, ry]) => {
      paint(ellPts(cx, cy, rx, ry, 22, 6), { wash: leafCol, fill: PAL.sap, fillOp: 85, bleed: .15, tex: .6, ink: PAL.ink, sw: 1.1 });
    });
    pop();
  }

  function drawAcorn(x, y, r = 20, rot = 0) {
    boilSeed('wp_acorn');
    push();
    translate(x, y);
    rotate(rot);
    paint(ellPts(0, r * .25, r * .72, r * .88, 14, .4), { wash: '#C88E52', fill: '#9A6331', fillOp: 60, ink: PAL.ink, sw: .8 });
    paint(ellPts(0, -r * .38, r * .86, r * .46, 14, .5), { wash: '#6C4730', ink: PAL.ink, sw: .8 });
    inkLine([[0, -r * .8], [r * .15, -r * 1.18]], 1.2, PAL.ink, 'ink', .2);
    pop();
  }

  function drawPinecone(x, y, r = 24, rot = 0) {
    boilSeed('wp_pinecone');
    push();
    translate(x, y);
    rotate(rot);
    paint(ellPts(0, 0, r * .72, r * 1.05, 16, .8), { wash: '#7C4F32', fill: '#57331E', fillOp: 70, ink: PAL.ink, sw: .85 });
    for (let row = -1; row <= 1; row++) {
      inkLine([[-r * .45, row * r * .35], [0, row * r * .35 + r * .18], [r * .45, row * r * .35]], .75, PAL.ink, 'inkfine', .5);
    }
    pop();
  }

  function drawWoodChips(t, hitTimes, ix, iy) {
    boilSeed('wp_chips');
    for (let i = 0; i < hitTimes.length; i++) {
      const age = t - hitTimes[i];
      if (age < 0 || age > .55) continue;
      const k = age / .55;
      // Impact starburst at trunk
      if (age < .16) {
        const sk = age / .16;
        paint(starPts(ix, iy, 36 * (1 - sk * .5), .32, 4, i * .5), { wash: PAL.cream, fill: PAL.ochre, fillOp: 85, ink: PAL.ink, sw: .5 });
      }
      // Flying chips arcing backward-left & down
      for (let c = 0; c < 3; c++) {
        const end = [ix - (85 + 75 * hash(i * 5 + c)), iy + 95 + 55 * hash(i * 9 + c)];
        const p = arcPt([ix, iy], end, 65 + 35 * c, easeOut(k));
        paint(rectPts(p[0] - 6, p[1] - 4, 12, 8, 1), { wash: '#D4A872', washOp: 255 * (1 - k * .7), ink: PAL.ink, sw: .5 });
      }
    }
  }

  // ---------- Shot 1 (0.00 - 3.80s): Morning Stare, Acorn Drop & Curiosity ----------
  function shot1MorningAcorn(t, lt, dur) {
    const G = 890, u = 31, cx = 960;
    camBegin(960 + 10 * Math.sin(lt * .7), 565 - 10 * ease(seg(lt, 0, dur)), 1.0 + .05 * ease(seg(lt, 0, dur)));
    drawWoodlandBg(t, 0, G);

    // Acorn drops from above at 0.72s -> lands bounce at 1.15s beside Woodpecker
    const acLand = [1105, G - 18];
    let acPos, acRot = .15;
    if (lt < .72) {
      acPos = [1140, -60];
    } else if (lt < 1.15) {
      const k = easeIn(seg(lt, .72, 1.15));
      acPos = [lerp(1130, acLand[0], k), lerp(-40, acLand[1], k)];
      acRot = k * 2.5;
    } else if (lt < 1.55) {
      const k = seg(lt, 1.15, 1.55);
      acPos = arcPt(acLand, [1090, G - 14], 55, k);
      acRot = 2.5 + k * 1.4;
    } else {
      acPos = [1090, G - 14];
      acRot = .4;
    }

    const mood = emotions(lt, [
      [0.0, 'neutral', { lookX: 0, lookY: 0 }],
      [1.15, 'surprised', { lookX: .65, lookY: .35 }],
      [1.75, 'confused', { lookX: .75, lookY: .55 }],
      [2.50, 'idea', { lookX: .7, lookY: -.2 }],
      [3.12, 'happy', { lookX: .5 }],
    ]);
    const hop = jump(lt, 3.16, 3.55, 2.2);
    actor(cx, G, u, { ...mood, dy: (mood.dy || 0) + hop.dy, sq: (mood.sq || 0) + hop.sq });
    if (lt >= .70) drawAcorn(acPos[0], acPos[1], 19, acRot);

    const eyeAt = toScreen(cx, G - 6 * u);
    camEnd();

    boilSeed('wp_t1');
    if (lt < .42) iris(...eyeAt, lerp(0, 1500, easeIn(lt / .42)));
    if (lt > dur - .30) brushWipe((lt - (dur - .30)) / .60, WIPE_FOREST);
  }

  // ---------- Shot 2 (3.80 - 8.00s): Bouncy Walk, 360° Flutter Turn & Lock-On ----------
  function shot2HopAndTurn(t, lt, dur) {
    const G = 890, u = 24, treeX = 1420;
    const tArrive = 1.40, tSpin0 = 1.45, tSpin1 = 2.48, tProud = 2.60, tLock = 3.25;
    const walk = stroll(lt, .12, tArrive, 320, 940, u);
    const px = lt < tArrive ? walk.x : 940;

    const camX = kf(lt, [[0, 760], [1.45, 960], [tLock, 960], [dur, 1140]]);
    const camY = kf(lt, [[0, 560], [tLock, 555], [dur, 525]]);
    const camZ = kf(lt, [[0, 1.0], [tLock, 1.02], [dur, 1.32]], easeIn);
    camBegin(camX, camY, camZ);

    drawWoodlandBg(t, 0, G);
    drawOakTree(treeX, G, t, 0, 0);

    const mood = emotions(lt, [
      [0.0, 'excited'],
      [1.65, 'flutter'],
      [tProud, 'proud'],
      [tLock, 'determined'],
    ]);

    let pose = {};
    if (lt < tArrive) {
      pose = { view: 'side', walk: walk.walk, dy: walk.dy, flip: false };
    } else if (lt < tSpin1) {
      const sp = turn(lt, tSpin0, tSpin1, .25, 1.0);
      const hop = jump(lt, 1.62, 2.34, 2.3);
      pose = { ...sp, dy: hop.dy, sq: hop.sq };
    } else if (lt >= tLock) {
      pose = turn(lt, tLock, tLock + .22, 0, .25);
    }

    actor(px, G, u, {
      ...mood,
      ...pose,
      dy: (mood.dy || 0) * (lt < tArrive ? .35 : 1) + (pose.dy || 0),
      sq: (mood.sq || 0) + (pose.sq || 0),
    });

    camEnd();
    boilSeed('wp_t2');
    if (lt < .30) brushWipe(.5 + lt / .60, WIPE_FOREST);
  }

  // ---------- Shot 3 (8.00 - 12.20s): Rapid Tree Pecking, Pinecone Bonk & Laugh ----------
  function shot3PeckAndLaugh(t, lt, dur) {
    const G = 900, u = 31, px = 1012, treeLeft = 1165;
    // Peck impact moments synced precisely to peck() peaks (bpm=120 -> 0.5s/beat, peaks every 1/6 s at .083 + k/6)
    const hitLocal = [.25, .42, .58, .75, .92, 1.08, 1.25, 1.42, 1.58];
    const hitAbs = hitLocal.map(h => t - lt + h);
    let treeRecoil = 0, camShake = [0, 0];
    for (const h of hitLocal) {
      if (lt >= h && lt - h < .18) {
        const a = lt - h;
        treeRecoil += Math.exp(-a * 18) * Math.sin(a * 42);
      }
    }
    if (Math.abs(treeRecoil) > .05) camShake = shakeXY(t, 4.5 * Math.abs(treeRecoil));

    camBegin(1040 + camShake[0], 545 + camShake[1], kf(lt, [[0, 1.04], [1.7, 1.06], [2.7, 1.02], [dur, 1.0]]));
    drawWoodlandBg(t, 0, G);
    drawOakTree(treeLeft, G, t, treeRecoil, 0);

    const tConeDrop = 1.60, tConeHit = 1.84, tDizzy = 1.86, tLaugh = 2.82;
    const mood = emotions(lt, [
      [0.0, 'peck'],
      [tDizzy, 'dizzy'],
      [tLaugh, 'laugh'],
    ]);

    let facing = {};
    if (lt < tDizzy) facing = { view: 'side', flip: false };
    else if (lt < tDizzy + .18) facing = turn(lt, tDizzy, tDizzy + .18, .25, 0);

    // Subtle bonk squash when pinecone lands at 1.84s
    const bonkSq = lt >= tConeHit ? spring(lt, tConeHit, 10, 22) * .20 : 0;
    actor(px, G, u, { ...mood, ...facing, sq: (mood.sq || 0) + bonkSq });

    // Wood chips & sparks at exact beak-bark impact spot (treeLeft, G - 5.32 * u)
    drawWoodChips(t, hitAbs, treeLeft + 4, G - 5.32 * u);

    // Pinecone drops from canopy onto crest at 1.84s, then arcs cleanly left away from face onto moss
    if (lt >= tConeDrop) {
      let pcPos, pcRot = 0;
      const crownTarget = [px - 18, G - 10.8 * u];
      if (lt < tConeHit) {
        const k = easeIn(seg(lt, tConeDrop, tConeHit));
        pcPos = [lerp(px + 20, crownTarget[0], k), lerp(110, crownTarget[1], k)];
        pcRot = k * 2.2;
      } else if (lt < tConeHit + .36) {
        const k = seg(lt, tConeHit, tConeHit + .36);
        pcPos = arcPt(crownTarget, [px - 210, G - 20], 95, k);
        pcRot = 2.2 + k * 4.0;
      } else {
        pcPos = [px - 210, G - 20];
        pcRot = .55;
      }
      drawPinecone(pcPos[0], pcPos[1], 22, pcRot);
    }

    camEnd();
    boilSeed('wp_t3');
    if (lt > dur - .30) brushWipe((lt - (dur - .30)) / .60, WIPE_AMBER);
  }

  // ---------- Shot 4 (12.20 - 16.00s): Amber Dusk Groove, Love & Goofy Stare Rhyme ----------
  function shot4DuskGrooveRhyme(t, lt, dur) {
    const G = 890, u = 29, cx = 960;
    const tLove = 1.35, tBlank = 2.38, tIris = 3.10;
    camBegin(960 + 10 * Math.sin(lt * .8), kf(lt, [[0, 560], [tBlank, 550], [dur, 565]]), kf(lt, [[0, 1.0], [tBlank, 1.04], [dur, 1.08]]));
    drawWoodlandBg(t, 1.0, G);

    const mood = emotions(lt, [
      [0.0, 'cool'],
      [tLove, 'love'],
      [tBlank, 'neutral', { lookX: 0, lookY: 0, seed: 3.7 }],
    ]);

    const grooveK = 1 - ease(seg(lt, 1.18, tLove + .15));
    const dance = move('bounce', t);
    const waveArm = lt > tLove + .08 && lt < tBlank ? .55 + .45 * Math.sin((lt - tLove) * 12) : null;
    actor(cx, G, u, {
      ...mood,
      dy: (mood.dy || 0) + dance.dy * grooveK * .5,
      sq: (mood.sq || 0) + dance.sq * grooveK * .45,
      aL: lerp(mood.aL ?? -.38, dance.aL, grooveK),
      aR: waveArm !== null ? waveArm : lerp(mood.aR ?? -.38, dance.aR, grooveK),
    });

    const eyeAt = toScreen(cx, G - 6 * u);
    camEnd();

    boilSeed('wp_t4');
    if (lt < .30) brushWipe(.5 + lt / .60, WIPE_AMBER);
    if (lt > tIris) {
      const r = lt < tIris + .35
        ? lerp(1500, 235, ease(seg(lt, tIris, tIris + .35)))
        : lt < dur - .22
        ? lerp(235, 222, seg(lt, tIris + .35, dur - .22))
        : lerp(222, 0, easeIn(seg(lt, dur - .22, dur - .04)));
      iris(...eyeAt, r);
    }
  }

  registerScene('forest', {
    duration: 16,
    shots: [
      [0.0, shot1MorningAcorn],
      [3.8, shot2HopAndTurn],
      [8.0, shot3PeckAndLaugh],
      [12.2, shot4DuskGrooveRhyme],
    ],
  });
})();
