// sheets.js: Model sheets as standalone loops for whichever character is active in CharacterRegistry.
// Scrub at studio.html?loop=views or ?loop=emotions (with optional ?char=clawd), or render:
//   node render.mjs --loop=emotions --sheet=1 --cols=1 --w=1920 --out=docs/psyduck_emotions.jpg
//   node render.mjs --loop=views --sheet=1 --cols=1 --w=1920 --out=docs/psyduck_views.jpg
(() => {
  const label = (txt, x, y, size = 20) => letter(txt, x, y, size, PAL.ink, { ink: false, alpha: .85 });
  const floor = (y, x0 = 0, x1 = W) => inkLine([[x0 + 40, y + 6], [W / 2, y + 4], [x1 - 40, y + 7]], .6, mixCol(PAL.paper, PAL.ink, .35), 'inkfine', .5);

  LOOPS.emotions = t => {
    const spec = CharacterRegistry.getActive();
    const names = Object.keys(CharacterRegistry.resolveEmotions());
    const cols = names.length > 32 ? 9 : 8;
    const rows = Math.ceil(names.length / cols);
    const cw = W / cols, ch = H / rows;
    const u = spec.metrics.height > 9.5 ? 10.2 : 11;
    names.forEach((name, i) => {
      const cx = cw * (i % cols) + cw / 2;
      const gy = ch * Math.floor(i / cols) + ch - 48;
      actor(cx, gy, u, feel(name, t, { seed: i }));
      label(name, cx, gy + 28, 18);
    });
    for (let r = 0; r < rows; r++) floor(ch * r + ch - 48);
  };
  LOOPS.emotions.len = 4;

  LOOPS.views = t => {
    const spec = CharacterRegistry.getActive();
    const u1 = spec.metrics.height > 9.5 ? 17.5 : 19;
    const views = ['front', 'q', 'side', 'qback', 'back'];
    views.forEach((v, i) => {
      const x = 230 + i * 365;
      actor(x, 405, u1, { ...feel('neutral', t, { seed: i }), view: v });
      label(v, x, 445, 24);
    });
    floor(405);

    const y2 = 720, u2 = spec.metrics.height > 9.5 ? 11.5 : 13;
    const extra6 = spec.id === 'woodpecker' ? 'peck' : spec.id === 'tuyiyi' ? 'point_up' : 'headache';
    const extra7 = spec.id === 'woodpecker' ? 'flutter' : spec.id === 'tuyiyi' ? 'sweet_wave' : 'psychic';
    const row = [
      ['walk (side)', x => actor(x, y2, u2, { ...move('walk', t), view: 'side' })],
      ['turn / spinView', x => actor(x, y2, u2, { ...feel('happy', t), ...spinView(Math.floor(t * 2) / 8) })],
      ['smear', x => actor(x, y2, u2, { ...feel('excited', t), view: 'side', smear: .8, smearDir: 1, dx: Math.sin(t * TAU / 2) * .3 })],
      ['jump', x => { const k = t % 1.5; actor(x, y2, u2, { ...feel('happy', t), ...jump(k, .35, .95, 3) }); }],
      ['take', x => actor(x, y2, u2, { ...feel('surprised', t), ...take(t % 2, .5, 1.2), emoteAge: (t % 2) - .5, emoteK: seg(t % 2, .5, .7) })],
      [extra6, x => actor(x, y2, u2, { ...feel(extra6, t), ...(extra6 === 'peck' ? { view: 'side' } : {}) })],
      [extra7, x => actor(x, y2, u2, feel(extra7, t))],
    ];
    row.forEach(([name, f], i) => {
      const x = 165 + i * 265;
      f(x);
      label(name, x, y2 + 38, 19);
    });
    floor(y2);

    const hats = ['party', 'hard', 'crown', 'halo', 'wizard', 'top', 'fedora', 'band', 'beanie', 'bow', 'flower', 'headphones', 'cat', 'masq', 'bowtie'];
    const u3 = spec.metrics.height > 9.5 ? 7.6 : 8;
    hats.forEach((h, i) => {
      const x = 82 + i * 125.5;
      actor(x, 988, u3, { ...feel('neutral', t, { seed: i }), hat: h });
      label(h, x, 1018, 17);
    });
    floor(988);
  };
  LOOPS.views.len = 4;

  // High-resolution full-body reference pose showcase for 1:1 visual inspection against reference artwork
  LOOPS.ref_pose = t => {
    const spec = CharacterRegistry.getActive();
    const poseName = spec.id === 'tuyiyi' ? 'point_up' : 'neutral';
    const u = Math.min(82, 905 / (spec.metrics.height || 10));
    floor(1002, 560, 1360);
    actor(960, 1002, u, feel(poseName, t, { seed: 0 }));
  };
  LOOPS.ref_pose.len = 4;
})();
