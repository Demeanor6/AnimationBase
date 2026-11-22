// psyduck_showcase.js: 18-second hand-painted showcase of Psyduck's expressions, views, waddle, headache & psychic powers.
// Written entirely against the modular actor() facade so swapping PROJECT.character or passing --char=clawd swaps the star!
(() => {
  const WIPE_TEAL = [PAL.teal, '#487B8C'];
  const WIPE_GOLD = [PAL.ochre, PAL.clay];

  // ---------- Lakeside World Helpers (pure functions of t, each with isolated boilSeed) ----------
  function drawSkyAndHills(t, twilight = 0, sunset = 0) {
    boilSeed('sky');
    const skyBase = mixCol(mixCol(PAL.sky, PAL.indigo, twilight), '#F5BA7A', sunset);
    const horizonCol = mixCol(mixCol(PAL.cream, PAL.violet, twilight), '#F9D89C', sunset);
    paint(rectPts(-600, -400, W + 1200, H + 800), { wash: skyBase, ink: null });
    paint(ellPts(W * .5, H * .75, W * .75, H * .42, 28, 8), { fill: horizonCol, fillOp: 135, bleed: .3, tex: .5, ink: null });

    // Sun or twilight glow orb
    boilSeed('sun');
    const sunX = lerp(340, 1460, sunset * .85), sunY = lerp(190, 340, sunset);
    const sunCol = twilight > .4 ? '#B6A8FF' : '#FFE08A';
    glow(sunX, sunY, 220 + 60 * sunset, sunCol, .5 + .3 * sunset);
    paint(ellPts(sunX, sunY, 64, 64, 24, 1.5), { wash: mixCol(PAL.cream, '#FFD26E', sunset), fill: PAL.ochre, fillOp: 40, ink: PAL.ink, sw: .75 });

    // Soft drifting watercolor clouds
    const cloudSpecs = [[360, 210, 140, 42, .4], [1080, 165, 175, 48, .25], [1580, 250, 125, 38, .35]];
    cloudSpecs.forEach(([bx, by, rx, ry, spd], i) => {
      boilSeed('cloud' + i);
      const cx = (bx + t * spd * 18) % (W + 300) - 150;
      const clCol = mixCol(mixCol(PAL.cream, '#9D97C8', twilight), '#FFE5B8', sunset);
      paint(ellPts(cx, by, rx, ry, 20, 4), { wash: clCol, washOp: 210, fill: PAL.paper, fillOp: 60, bleed: .25, tex: .4, ink: null });
      paint(ellPts(cx - rx * .35, by - ry * .25, rx * .55, ry * .7, 16, 3), { wash: clCol, washOp: 220, ink: null });
    });

    // Twilight stars peeking out during psychic climax
    if (twilight > .15) {
      for (let i = 0; i < 18; i++) {
        boilSeed('twstar' + i);
        const sx = hash(i * 3.1) * (W + 100) - 50, sy = hash(i * 5.7 + 12) * H * .48;
        const tw = (.5 + .5 * Math.sin(t * 5 + i)) * clamp((twilight - .15) * 1.4);
        paint(starPts(sx, sy, (4 + 4 * hash(i + 9)) * tw, .35, 4), { wash: PAL.cream, washOp: 230 * tw, ink: null });
      }
    }

    // Distant rolling hills
    boilSeed('farhill');
    const farCol = mixCol(mixCol('#78AB88', PAL.indigo, twilight * .65), '#8D9E6C', sunset * .5);
    paint(ellPts(520, 880, 920, 290, 32, 3), { wash: farCol, fill: PAL.teal, fillOp: 45, bleed: .15, tex: .5, ink: PAL.ink, sw: .8 });
    boilSeed('midhill');
    const midCol = mixCol(mixCol(PAL.sap, PAL.night, twilight * .55), '#7C9D4E', sunset * .45);
    paint(ellPts(1480, 900, 940, 270, 32, 3), { wash: midCol, fill: PAL.teal, fillOp: 55, bleed: .15, tex: .5, ink: PAL.ink, sw: .8 });
  }

  function drawPondAndBank(t, G, twilight = 0, sunset = 0) {
    // Shimmering watercolor pond in the lower-mid ground before the grassy shore
    boilSeed('pond');
    const waterCol = mixCol(mixCol('#6BBBD0', '#2E437A', twilight * .75), '#D89E7A', sunset * .45);
    paint(rectPts(-400, G - 170, W + 800, 260, 4), { wash: waterCol, fill: PAL.teal, fillOp: 95, bleed: .12, tex: .55, ink: null });
    inkLine([[-300, G - 165], [W * .5, G - 172], [W + 300, G - 164]], .85, PAL.ink, 'inkfine', .5);

    // Gentle pond ripples & lily pads
    for (let i = 0; i < 4; i++) {
      boilSeed('lily' + i);
      const lx = [260, 520, 1460, 1700][i], ly = G - [110, 82, 95, 118][i] + Math.sin(t * 2 + i) * 3;
      const lr = [52, 64, 58, 46][i];
      paint(ellPts(lx, ly, lr, lr * .34, 16, 1.2), { wash: mixCol(PAL.sap, PAL.teal, .25), ink: PAL.ink, sw: .75 });
      if (i === 1 || i === 2) {
        const fl = Math.sin(t * 2.5 + i) * 2;
        paint(ellPts(lx + 10, ly - 8 + fl, 16, 11, 10), { wash: PAL.rose, fill: PAL.cream, fillOp: 60, ink: PAL.ink, sw: .6 });
      }
    }

    // Swaying lakeside reeds on left & right banks
    [130, 175, 1620, 1790].forEach((rx, idx) => {
      boilSeed('reed' + idx);
      for (let k = -1; k <= 1; k++) {
        const bx = rx + k * 18, by = G - 38;
        const swy = wob(t, .45, idx + k * .4) * 14;
        inkLine([[bx, by], [bx + swy * .4, by - 95], [bx + swy, by - 175 - 20 * hash(idx + k)]], 1.4, mixCol(PAL.sap, PAL.ink, .25), 'ink', .5);
      }
    });

    // Main grassy foreground bank
    boilSeed('bank');
    const grassCol = mixCol(mixCol('#82B660', '#4A685A', twilight * .6), '#9AB44D', sunset * .4);
    paint(rectPts(-400, G - 38, W + 800, 440, 3), { wash: grassCol, fill: PAL.sap, fillOp: 90, bleed: .06, tex: .6, ink: null });
    inkLine([[-350, G - 38], [W * .5, G - 44], [W + 350, G - 36]], 1.2, PAL.ink, 'ink', .5);

    // Small foreground grass tufts
    for (let i = 0; i < 11; i++) {
      boilSeed('tuft' + i);
      const tx = 140 + i * 165, ty = G - 18 + (hash(i * 4.2) - .5) * 16;
      const sway = wob(t, .55, i * .7) * 6;
      for (const s of [-1, 0, 1]) {
        inkLine([[tx + s * 6, ty], [tx + s * 10 + sway, ty - 18 - 8 * hash(i + s)]], .75, mixCol(grassCol, PAL.cream, .3), 'inkfine', .4);
      }
    }
  }

  // Painted dragonfly motif: fluttering translucent wings + teal-ochre body
  function drawDragonfly(x, y, t, sc = 1, flip = false, tilt = 0) {
    boilSeed('dragonfly');
    push();
    translate(x, y);
    if (flip) scale(-1, 1);
    rotate(tilt);
    scale(sc);
    const flap = Math.sin(t * 48);
    // Wings (soft cyan wash, additive shimmer feel)
    paint(ellPts(-6, -14 - flap * 4, 24, 9 + Math.abs(flap) * 4, 14, .4, -.35), { wash: '#C8F4FA', washOp: 200, ink: PAL.ink, sw: .7 });
    paint(ellPts(-16, -10 + flap * 3, 19, 7 + Math.abs(flap) * 3, 14, .4, -.55), { wash: '#B2EAF5', washOp: 185, ink: PAL.ink, sw: .65 });
    // Segmented tail + head
    paint(ribbon([[-4, 2], [-22, 4 + Math.sin(t * 14) * 1.5], [-40, 5]], 7, 3), { wash: PAL.teal, ink: PAL.ink, sw: .8 });
    paint(ellPts(6, 0, 10, 8, 12), { wash: PAL.ochre, ink: PAL.ink, sw: .85 });
    paint(ellPts(11, -2, 3.5, 4, 8), { wash: PAL.ink, ink: null });
    pop();
  }

  // Orbiting 2D lotus petals & smooth river pebbles during Shot 3 psychic levitation
  function drawPsychicOrbits(cx, cy, t, k) {
    if (k <= .03) return;
    const count = 6;
    for (let i = 0; i < count; i++) {
      boilSeed('orb' + i);
      const a = t * 2.2 + i * TAU / count;
      const rx = (190 + 40 * hash(i)) * k;
      const ry = (75 + 22 * hash(i + 5)) * k;
      const px = cx + Math.cos(a) * rx;
      const py = cy + Math.sin(a) * ry - 25 * k;
      const depthScale = .82 + .28 * Math.sin(a); // flat 2D overlap/scale depth cue only
      glow(px, py, 40 * k, '#70E8FF', .60 * k);
      if (i % 2 === 0) {
        paint(ellPts(px, py, 21 * depthScale * k, 13 * depthScale * k, 12, .5, a), { wash: PAL.rose, fill: PAL.cream, fillOp: 80, ink: PAL.ink, sw: .7 });
      } else {
        paint(ellPts(px, py, 18 * depthScale * k, 14 * depthScale * k, 10, .6, a * .7), { wash: '#9DA6BA', fill: PAL.indigo, fillOp: 60, ink: PAL.ink, sw: .7 });
      }
    }
  }

  // ---------- Shot 1 (0.00 - 4.50s): Nap, Blank Stare & Curiosity ----------
  function shot1NapAndStare(t, lt, dur) {
    const G = 885, u = 31, cx = 960;
    camBegin(960 + 12 * Math.sin(lt * .7), 565 - 12 * ease(seg(lt, 0, dur)), 1.0 + .05 * ease(seg(lt, 0, dur)));
    drawSkyAndHills(t, 0, 0);
    drawPondAndBank(t, G, 0, 0);

    // Dragonfly flight path: enters right at 0.85s, zips past face, loops teasingly at 2.4s, hovers right at 3.5s
    let dfPos;
    if (lt < .85) dfPos = [2120, 390];
    else if (lt < 1.85) {
      const k = easeOut(seg(lt, .85, 1.85));
      dfPos = arcPt([2050, 380], [610, 485], -70, k);
    } else if (lt < 2.75) {
      const k = ease(seg(lt, 1.85, 2.75));
      dfPos = arcPt([610, 485], [1340, 445], 130, k);
    } else {
      const a = (lt - 2.75) * 4.5;
      dfPos = [1340 + Math.cos(a) * 55, 445 + Math.sin(a * 2) * 28];
    }

    // Track dragonfly horizontally with lookX during blank-stare neutral & confused
    const trackX = clamp((dfPos[0] - cx) / 340, -.95, .95);
    const mood = emotions(lt, [
      [0.0, 'sleepy'],
      [1.15, 'surprised', { lookX: .75 }],
      [1.80, 'neutral', { lookX: trackX, lookY: -.15 }],
      [2.65, 'confused', { lookX: trackX }],
      [3.35, 'idea', { lookX: .55, lookY: -.25 }],
      [3.85, 'happy', { lookX: .5 }],
    ]);
    const hop = jump(lt, 3.88, 4.32, 2.2);
    actor(cx, G, u, { ...mood, dy: (mood.dy || 0) + hop.dy, sq: (mood.sq || 0) + hop.sq });
    drawDragonfly(dfPos[0], dfPos[1], t, 1.1, dfPos[0] > cx && lt > 1.85, Math.sin(t * 7) * .12);

    const eyeAt = toScreen(cx, G - 6 * u);
    camEnd();

    boilSeed('trans1');
    if (lt < .45) iris(...eyeAt, lerp(0, 1500, easeIn(lt / .45)));
    if (lt > dur - .30) brushWipe((lt - (dur - .30)) / .60, WIPE_TEAL);
  }

  // ---------- Shot 2 (4.50 - 9.20s): Waddle Chase, 360° Turnaround & Laugh ----------
  function shot2WaddleAndTurn(t, lt, dur) {
    const G = 885, u = 24;
    const tArrive = 1.55, tSpin0 = 1.65, tSpin1 = 2.68, tProud = 2.82, tLaugh = 3.60;
    const walk = stroll(lt, .15, tArrive, 310, 960, u);
    const px = lt < tArrive ? walk.x : 960;

    // Camera follows chase then pushes in smoothly toward Shot 3's close-up
    const camX = kf(lt, [[0, 740], [1.6, 960], [dur, 960]]);
    const camY = kf(lt, [[0, 560], [3.6, 550], [dur, 515]]);
    const camZ = kf(lt, [[0, 1.0], [3.5, 1.02], [dur, 1.32]], easeIn);
    camBegin(camX, camY, camZ);

    drawSkyAndHills(t, 0, 0);
    drawPondAndBank(t, G, 0, 0);

    // Dragonfly leads the waddle chase, circles during turnaround, then perches near Psyduck's right
    let dfPos;
    if (lt < tArrive) {
      const k = ease(seg(lt, 0, tArrive));
      dfPos = [lerp(560, 1260, k), 560 + Math.sin(lt * 7) * 28];
    } else if (lt < tSpin1) {
      const k = seg(lt, tSpin0, tSpin1);
      dfPos = [960 + Math.cos(k * TAU) * 240, 540 + Math.sin(k * TAU * 2) * 35];
    } else {
      dfPos = [1255 + Math.sin(lt * 3) * 18, 575 + Math.cos(lt * 5) * 14];
    }

    const mood = emotions(lt, [
      [0.0, 'excited'],
      [tArrive, 'happy'],
      [tProud, 'proud'],
      [tLaugh, 'laugh'],
    ]);

    let pose = {};
    if (lt < tArrive) {
      pose = { view: 'side', walk: walk.walk, dy: walk.dy, flip: false };
    } else if (lt < tSpin1) {
      const sp = turn(lt, tSpin0, tSpin1, .25, 1.0); // full turnaround back to front (0/1)
      const hop = jump(lt, 1.88, 2.52, 2.4);
      pose = { ...sp, dy: hop.dy, sq: hop.sq };
    }

    actor(px, G, u, {
      ...mood,
      ...pose,
      dy: (mood.dy || 0) * (lt < tArrive ? .35 : 1) + (pose.dy || 0),
      sq: (mood.sq || 0) + (pose.sq || 0),
    });

    drawDragonfly(dfPos[0], dfPos[1], t, 1.0, dfPos[0] > px, Math.sin(t * 8) * .1);
    camEnd();

    boilSeed('trans2');
    if (lt < .30) brushWipe(.5 + lt / .60, WIPE_TEAL);
  }

  // ---------- Shot 3 (9.20 - 14.00s): Iconic Headache & Psychic Levitation Climax ----------
  function shot3HeadachePsychic(t, lt, dur) {
    const G = 910, u = 34, cx = 960;
    const tHead = .95, tPsy = 2.30, tEndPsy = 3.70, tRel = 3.92;
    const twilight = clamp(seg(lt, 1.4, 2.5) - seg(lt, 3.65, 4.45));
    const psyPower = clamp(seg(lt, tPsy, tPsy + .45) - seg(lt, tEndPsy - .15, tEndPsy + .25));
    const shk = psyPower > .05 ? shakeXY(t, 4.5 * psyPower) : [0, 0];

    const zoom = kf(lt, [[0, 1.04], [tHead, 1.08], [tPsy + .3, 1.02], [dur, 1.0]]);
    camBegin(960 + shk[0], 545 + shk[1], zoom);

    drawSkyAndHills(t, twilight, 0);
    drawPondAndBank(t, G, twilight, 0);

    // Orbiting petals & stones rise during psychic climax
    drawPsychicOrbits(cx, G - 6.6 * u, t, psyPower);

    const mood = emotions(lt, [
      [0.0, 'dizzy'],
      [tHead, 'headache'],
      [tPsy, 'psychic'],
      [tRel, 'relieved'],
    ]);
    // Gentle springy squash upon landing after levitation
    const landBounce = lt >= tEndPsy ? spring(lt, tEndPsy + .12, 7, 16) * .16 : 0;
    actor(cx, G, u, { ...mood, sq: (mood.sq || 0) + landBounce });

    // Dragonfly orbits cleanly above crown at start, then gets gently blown back by psychic burst!
    let dfX, dfY;
    if (lt < tPsy) {
      const ang = lt * 8.5;
      dfX = cx + Math.cos(ang) * 235;
      dfY = G - 11.4 * u + Math.sin(ang * 2) * 26;
    } else {
      const pushOut = easeOut(seg(lt, tPsy, tPsy + .6));
      dfX = lerp(cx + 235, 1460, pushOut);
      dfY = lerp(G - 11.4 * u, 420, pushOut) + Math.sin(t * 5) * 18;
    }
    drawDragonfly(dfX, dfY, t, 1.05, dfX > cx, Math.sin(t * 9) * .14);
    camEnd();

    // Soft golden-cyan flash on psychic release peak
    if (lt > tEndPsy - .15 && lt < tEndPsy + .35) {
      const fk = Math.sin(seg(lt, tEndPsy - .15, tEndPsy + .35) * Math.PI);
      flash(fk * .38, '#E4F7FF');
    }

    boilSeed('trans3');
    if (lt > dur - .30) brushWipe((lt - (dur - .30)) / .60, WIPE_GOLD);
  }

  // ---------- Shot 4 (14.00 - 18.00s): Cool Groove, Love & Blank-Stare Finale ----------
  function shot4CoolAndBlankRhyme(t, lt, dur) {
    const G = 890, u = 29, cx = 960;
    const tLove = 1.45, tBlank = 2.48, tIris = 3.25;
    camBegin(960 + 10 * Math.sin(lt * .8), kf(lt, [[0, 560], [tBlank, 550], [dur, 565]]), kf(lt, [[0, 1.0], [tBlank, 1.04], [dur, 1.08]]));

    drawSkyAndHills(t, 0, 1.0);
    drawPondAndBank(t, G, 0, 1.0);

    const mood = emotions(lt, [
      [0.0, 'cool'],
      [tLove, 'love'],
      [tBlank, 'neutral', { lookX: 0, lookY: 0, seed: 4.1 }],
    ]);

    // Blend beat-locked groove during 'cool', wave gently during 'love', hold deadpan still-bounce at 'neutral'
    const grooveK = 1 - ease(seg(lt, 1.25, tLove + .15));
    const dance = move('bounce', t);
    const waveArm = lt > tLove + .1 && lt < tBlank ? .55 + .45 * Math.sin((lt - tLove) * 12) : null;
    actor(cx, G, u, {
      ...mood,
      dy: (mood.dy || 0) + dance.dy * grooveK * .55,
      sq: (mood.sq || 0) + dance.sq * grooveK * .5,
      aL: lerp(mood.aL ?? -.3, dance.aL, grooveK),
      aR: waveArm !== null ? waveArm : lerp(mood.aR ?? -.3, dance.aR, grooveK),
    });

    // Dragonfly grooves alongside, hovers affectionately during 'love', then perches watching the blank stare
    const dfX = kf(lt, [[0, 1290], [tLove, 1230], [tBlank, 1265]]);
    const dfY = kf(lt, [[0, 565], [tLove, 540], [tBlank, 585]]) + Math.sin(bpOf(t) * Math.PI) * 18;
    drawDragonfly(dfX, dfY, t, 1.05, true, Math.sin(t * 6) * .08);

    const eyeAt = toScreen(cx, G - 6 * u);
    camEnd();

    boilSeed('trans4');
    if (lt < .30) brushWipe(.5 + lt / .60, WIPE_GOLD);
    if (lt > tIris) {
      const r = lt < tIris + .36
        ? lerp(1500, 235, ease(seg(lt, tIris, tIris + .36)))
        : lt < dur - .22
        ? lerp(235, 222, seg(lt, tIris + .36, dur - .22))
        : lerp(222, 0, easeIn(seg(lt, dur - .22, dur - .04)));
      iris(...eyeAt, r);
    }
  }

  registerScene('lakeside', {
    duration: 18,
    shots: [
      [0.0, shot1NapAndStare],
      [4.5, shot2WaddleAndTurn],
      [9.2, shot3HeadachePsychic],
      [14.0, shot4CoolAndBlankRhyme],
    ],
  });
})();
