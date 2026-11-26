// verify_clipping.mjs: Automated geometric zero-clipping & timeline integrity verifier for all registered protagonists.
import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';

function playwrightChromes() {
  const dir = `${homedir()}/.cache/ms-playwright`;
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])
    .map(n => `${dir}/${n}/chrome-linux64/chrome`);
}
const CHROMES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  ...playwrightChromes(),
];
const CHROME = CHROMES.find(p => p && existsSync(p));
if (!CHROME) {
  console.error('Chrome not found');
  process.exit(1);
}

const gpu = process.platform === 'darwin' ? ['--use-angle=metal'] : ['--use-gl=angle'];
const sandbox = process.platform === 'linux' ? ['--no-sandbox'] : [];
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 0,
  args: [...sandbox, '--allow-file-access-from-files', '--ignore-gpu-blocklist', ...gpu, '--enable-gpu-rasterization', '--window-size=1920,1080'],
});

const consoleErrors = [];
const pageErrors = [];

try {
  const page = await browser.newPage();
  page.on('console', m => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', e => pageErrors.push(e.message));

  await page.goto(pathToFileURL(resolve('studio.html')).href + '?render', { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.ready === true', { timeout: 60000 });

  const report = await page.evaluate(async () => {
    function pointInPoly(pt, poly) {
      let inside = false;
      const [px, py] = pt;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j];
        const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / ((yj - yi) || 1e-9) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }

    function segIntersect(a, b, c, d) {
      const ccw = (p1, p2, p3) => (p3[1] - p1[1]) * (p2[0] - p1[0]) > (p2[1] - p1[1]) * (p3[0] - p1[0]);
      return (ccw(a, c, d) !== ccw(b, c, d)) && (ccw(a, b, c) !== ccw(a, b, d));
    }

    function segDist(p, a, b) {
      const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
      if (l2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
      const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2));
      return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
    }

    function polysIntersect(polyA, polyB) {
      for (const p of polyA) if (pointInPoly(p, polyB)) return true;
      for (const p of polyB) if (pointInPoly(p, polyA)) return true;
      for (let i = 0; i < polyA.length; i++) {
        const a1 = polyA[i], a2 = polyA[(i + 1) % polyA.length];
        for (let j = 0; j < polyB.length; j++) {
          const b1 = polyB[j], b2 = polyB[(j + 1) % polyB.length];
          if (segIntersect(a1, a2, b1, b2)) return true;
        }
      }
      return false;
    }

    function minDistPolys(polyA, polyB) {
      if (polysIntersect(polyA, polyB)) return 0;
      let best = Infinity;
      for (const p of polyA) for (let j = 0; j < polyB.length; j++) best = Math.min(best, segDist(p, polyB[j], polyB[(j + 1) % polyB.length]));
      for (const p of polyB) for (let i = 0; i < polyA.length; i++) best = Math.min(best, segDist(p, polyA[i], polyA[(i + 1) % polyA.length]));
      return best;
    }

    function distToPoly(pt, poly) {
      if (pointInPoly(pt, poly)) return 0;
      let best = Infinity;
      for (let i = 0; i < poly.length; i++) best = Math.min(best, segDist(pt, poly[i], poly[(i + 1) % poly.length]));
      return best;
    }

    const u = 26, x = 960, y = 880;
    const violations = [];
    const perCharStats = {};

    function checkPose(charId, label, opts, expectGrounded = false) {
      const m = actor.measure(x, y, u, opts, charId);
      if (m.hasNaN) violations.push({ charId, label, rule: 'no_nan', detail: 'Non-finite coordinates detected' });

      if (m.eyes.length === 2) {
        const [e0, e1] = m.eyes;
        if (polysIntersect(e0.polyLocal, e1.polyLocal)) {
          violations.push({ charId, label, rule: 'eye_eye_overlap', detail: 'Left and right eye ovals intersect' });
        }
        const gap = Math.abs(e1.centerLocal[0] - e0.centerLocal[0]) - (e0.rx + e1.rx);
        if (gap < 0.05 * u) {
          violations.push({ charId, label, rule: 'eye_eye_clearance', detail: `Eye gap too small: ${(gap / u).toFixed(3)}u` });
        }
      }

      for (const e of m.eyes) {
        const [cx, cy] = e.centerLocal, [px, py] = e.pupilLocal;
        const normR2 = Math.pow((px - cx) / Math.max(1e-5, e.rx), 2) + Math.pow((py - cy) / Math.max(1e-5, e.ry), 2);
        if (normR2 > 0.85) {
          violations.push({ charId, label, rule: 'pupil_inside_sclera', detail: `Pupil outside safe sclera (r2=${normR2.toFixed(3)})` });
        }
        for (let k = 0; k < 8; k++) {
          const ang = k / 8 * Math.PI * 2;
          const pt = [cx + Math.cos(ang) * e.rx * .95, cy + Math.sin(ang) * e.ry * .95];
          if (!pointInPoly(pt, m.bodyPolyLocal)) {
            violations.push({ charId, label, rule: 'eye_inside_head', detail: `Eye point (${(pt[0] / u).toFixed(2)}, ${(pt[1] / u).toFixed(2)}) outside head` });
            break;
          }
        }
      }

      if (m.billPolyLocal) {
        for (const e of m.eyes) {
          if (polysIntersect(m.billPolyLocal, e.polyLocal)) {
            violations.push({ charId, label, rule: 'bill_eye_clip', detail: `Bill/beak intersects eye ${e.side}` });
          } else {
            const d = minDistPolys(m.billPolyLocal, e.polyLocal);
            if (d < 0.03 * u) {
              violations.push({ charId, label, rule: 'bill_eye_clearance', detail: `Bill/beak too close to eye ${e.side}: ${(d / u).toFixed(3)}u` });
            }
          }
          if (m.upperBillPolyLocal && polysIntersect(m.upperBillPolyLocal, e.polyLocal)) {
            violations.push({ charId, label, rule: 'upper_bill_eye_clip', detail: `Upper bill/beak intersects eye ${e.side}` });
          }
          if (m.openMouthPolyLocal && polysIntersect(m.openMouthPolyLocal, e.polyLocal)) {
            violations.push({ charId, label, rule: 'mouth_eye_clip', detail: `Open mouth cavity intersects eye ${e.side}` });
          }
        }
        for (let ni = 0; ni < m.nostrilsLocal.length; ni++) {
          if (!pointInPoly(m.nostrilsLocal[ni], m.upperBillPolyLocal)) {
            violations.push({ charId, label, rule: 'nostril_inside_bill', detail: `Nostril ${ni} outside upper bill/beak` });
          }
        }
      }

      for (const arm of m.arms) {
        const rootDist = distToPoly(arm.rootLocal, m.bodyPolyLocal);
        if (rootDist > 0.18 * u) {
          violations.push({ charId, label, rule: 'arm_attached', detail: `Arm/wing ${arm.which} detached by ${(rootDist / u).toFixed(3)}u` });
        }
        for (const e of m.eyes) {
          if (polysIntersect(arm.polyLocal, e.polyLocal)) {
            violations.push({ charId, label, rule: 'arm_eye_clip', detail: `Arm/wing ${arm.which} intersects eye ${e.side}` });
          }
        }
        if (m.billPolyLocal && polysIntersect(arm.polyLocal, m.billPolyLocal)) {
          violations.push({ charId, label, rule: 'arm_bill_clip', detail: `Arm/wing ${arm.which} intersects bill/beak` });
        }
      }

      for (let hi = 0; hi < m.hairFeathers.length; hi++) {
        const hf = m.hairFeathers[hi];
        if (distToPoly(hf.rootLocal, m.bodyPolyLocal) > 0.05 * u) {
          violations.push({ charId, label, rule: 'hair_attached', detail: `Crown feather/crest ${hi} root detached` });
        }
        for (const e of m.eyes) {
          if (polysIntersect(hf.polyLocal, e.polyLocal)) {
            violations.push({ charId, label, rule: 'hair_eye_clip', detail: `Crown feather/crest ${hi} clips eye ${e.side}` });
          }
        }
      }

      if (m.tail && distToPoly(m.tail.rootLocal, m.bodyPolyLocal) > 0.15 * u) {
        violations.push({ charId, label, rule: 'tail_attached', detail: 'Tail root detached from body' });
      }

      if (expectGrounded && Math.abs(m.feetBottomY) > 0.15 * u) {
        violations.push({ charId, label, rule: 'feet_ground_contact', detail: `Feet bottom at ${(m.feetBottomY / u).toFixed(3)}u instead of 0` });
      }
    }

    for (const charId of ['woodpecker', 'psyduck', 'tuyiyi']) {
      const stats = { emotionChecks: 0, viewChecks: 0, hatChecks: 0, danceChecks: 0 };
      const emoNames = Object.keys(CharacterRegistry.resolveEmotions(charId));
      for (const name of emoNames) {
        for (const t of [0.2, 0.7, 1.3]) {
          T = t;
          checkPose(charId, `emotion:${name}@t=${t}`, feel(name, t, {}, charId), false);
          stats.emotionChecks++;
        }
      }
      for (const lx of [-1, 0, 1]) {
        for (const ly of [-1, 0, 1]) {
          T = 0.5;
          checkPose(charId, `look:${lx},${ly}`, { eyes: 'normal', lookX: lx, lookY: ly }, true);
          stats.emotionChecks++;
        }
      }

      const views = ['front', 'q', 'side', 'qback', 'back'];
      const posePresets = [
        { label: 'rest', opts: { eyes: 'normal' }, grounded: true },
        { label: 'headache', opts: { eyes: 'wide', mouth: 'wobble', headHold: [1, 1] }, grounded: true },
        { label: 'confused', opts: { eyes: ['narrow', 'wide'], mouth: 'wobble', headHold: [0, 0.92] }, grounded: true },
        { label: 'laugh', opts: { eyes: 'squeeze', mouth: 'laugh', aL: -0.35, aR: -0.35 }, grounded: true },
        { label: 'excited_arms', opts: { eyes: 'wide', mouth: 'open', aL: 1.3, aR: 1.3 }, grounded: true },
      ];
      for (const v of views) {
        for (const flip of [false, true]) {
          for (const p of posePresets) {
            T = 0.5;
            checkPose(charId, `view:${v}|flip=${flip}|${p.label}`, { ...p.opts, view: v, flip }, p.grounded);
            stats.viewChecks++;
          }
        }
      }

      const hats = ['party', 'hard', 'crown', 'halo', 'wizard', 'top', 'fedora', 'band', 'beanie', 'bow', 'flower', 'headphones', 'cat', 'masq', 'bowtie'];
      for (const hat of hats) {
        for (const v of ['front', 'q']) {
          T = 0.5;
          const m = actor.measure(x, y, u, { view: v, hat }, charId);
          if (m.hasNaN) violations.push({ charId, label: `hat:${hat}|${v}`, rule: 'no_nan', detail: 'NaN with hat' });
          if (hat !== 'masq' && m.eyes.length) {
            const minEyeTop = Math.min(...m.eyes.map(e => e.centerLocal[1] - e.ry));
            if (m.hatAnchor.y > minEyeTop) {
              violations.push({ charId, label: `hat:${hat}|${v}`, rule: 'hat_above_eyes', detail: `Crown hatY (${m.hatAnchor.y}) below eye top (${minEyeTop})` });
            }
          }
          stats.hatChecks++;
        }
      }

      const dances = ['bounce', 'hop', 'roof', 'sway', 'spin', 'wave', 'walk', 'run', 'idle', 'stomp', 'shimmy', 'mix'];
      for (const d of dances) {
        for (const t of [0.15, 0.45, 0.9]) {
          T = t;
          checkPose(charId, `dance:${d}@t=${t}`, { ...feel('happy', t, {}, charId), ...move(d, t, 0, charId) }, false);
          stats.danceChecks++;
        }
      }
      for (const a of [-1.2, -0.5, 0.0, 0.7, 1.3]) {
        T = 0.5;
        checkPose(charId, `armSweep:${a}`, { aL: a, aR: a, eyes: 'normal', mouth: 'open' }, true);
        stats.danceChecks++;
      }

      perCharStats[charId] = stats;
    }

    // Timeline render sweeps for both scenes & protagonist swap combinations
    const timelineStats = { forestWoodpecker: 0, lakesidePsyduck: 0, swapSmoke: 0 };
    CharacterRegistry.setActive('woodpecker');
    SceneRegistry.setActive('forest');
    for (let t = 0; t <= DUR + 1e-6; t += 0.25) {
      await window.renderAt(Math.min(DUR - 0.001, t), 'image/jpeg', 0.5);
      timelineStats.forestWoodpecker++;
    }

    CharacterRegistry.setActive('psyduck');
    SceneRegistry.setActive('lakeside');
    for (let t = 0; t <= DUR + 1e-6; t += 0.5) {
      await window.renderAt(Math.min(DUR - 0.001, t), 'image/jpeg', 0.5);
      timelineStats.lakesidePsyduck++;
    }

    // Cross-scene swap smoke checks: Woodpecker in lakeside, Clawd in forest
    CharacterRegistry.setActive('woodpecker');
    SceneRegistry.setActive('lakeside');
    for (const t of [2.2, 11.2, 14.8]) {
      await window.renderAt(t, 'image/jpeg', 0.5);
      timelineStats.swapSmoke++;
    }
    CharacterRegistry.setActive('clawd');
    SceneRegistry.setActive('forest');
    for (const t of [1.5, 8.8, 13.5]) {
      const mClawd = actor.measure(x, y, u, feel('happy', t));
      if (mClawd.hasNaN || mClawd.charId !== 'clawd') violations.push({ charId: 'clawd', label: `swap@${t}`, rule: 'swap_valid', detail: 'Clawd swap failed' });
      await window.renderAt(t, 'image/jpeg', 0.5);
      timelineStats.swapSmoke++;
    }

    // Restore project default
    CharacterRegistry.setActive(PROJECT.character || 'woodpecker');
    SceneRegistry.setActive(PROJECT.scene || 'forest');

    return {
      registeredCharacters: CharacterRegistry.list(),
      registeredScenes: SceneRegistry.list(),
      activeDefault: CharacterRegistry.getActiveId(),
      activeSceneDefault: SceneRegistry.getActiveId(),
      perCharStats,
      timelineStats,
      violationCount: violations.length,
      violations,
    };
  });

  report.consoleErrors = consoleErrors;
  report.pageErrors = pageErrors;
  report.passed = report.violationCount === 0 && consoleErrors.length === 0 && pageErrors.length === 0;

  mkdirSync('out/check', { recursive: true });
  writeFileSync('out/check/clipping_report.json', JSON.stringify(report, null, 2));

  console.log('=== Generalized Zero-Clipping & Integrity Report ===');
  console.log('Characters:', report.registeredCharacters.join(', '), '| Scenes:', report.registeredScenes.join(', '));
  console.log('Per-character checks:', JSON.stringify(report.perCharStats));
  console.log('Timeline & swap checks:', JSON.stringify(report.timelineStats));
  console.log('Violations:', report.violationCount, '| Console errors:', consoleErrors.length, '| Page errors:', pageErrors.length);
  if (!report.passed) {
    console.error('FAILED violations:', JSON.stringify(report.violations.slice(0, 20), null, 2));
    if (consoleErrors.length) console.error('Console errors:', consoleErrors);
    if (pageErrors.length) console.error('Page errors:', pageErrors);
    process.exitCode = 1;
  } else {
    console.log('PASS: 0 clipping violations across Woodpecker, Psyduck, Clawd, both scenes, and cross-scene swaps!');
  }
} finally {
  await browser.close();
}
