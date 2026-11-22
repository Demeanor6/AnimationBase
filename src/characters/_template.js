// _template.js: Minimal blueprint skeleton for adding a new protagonist from any reference image.
// Copy this file to `src/characters/<your_char>.js`, add its `<script>` to `studio.html`, and switch `PROJECT.character`
// in `src/config.js` (or pass `--char=<your_char>` to `render.mjs` / `?char=<your_char>` in the browser).
(() => {
  const CHAR_PAL = {
    body: '#E89B54',     // primary flat wash colour
    bodyDk: '#B56E2C',   // underside / far limb shadow
    bodyLt: '#FFD09A',   // soft top-left watercolour highlight
  };

  // Define the 5 drawn key views facing right (flip: true mirrors left).
  const VIEWS = {
    front: { L: -4, R: 4, hat: 0, hw: .8, hatY: -8.5, bandY: -7.9, bandW: .75, earX: 4, earY: -6.5, face: { sides: [-1, 1], eyeX: 1.5, eyeY: -6.4, eyeRx: .7, eyeRy: .7 }, legs: [[-1.5, 0], [1.5, 0]], arms: [[-3.8, -1, 'L', 1], [3.8, 1, 'R', 1]] },
    q:     { L: -4, R: 4, hat: .2, hw: .8, hatY: -8.5, bandY: -7.9, bandW: .75, earX: 4, earY: -6.5, face: { sides: [-1, 1], eyeX: 1.5, eyeY: -6.4, eyeRx: .7, eyeRy: .7 }, legs: [[-1.5, 1], [1.5, 0]], arms: [[3.8, 1, 'R', 2], [-3.8, -1, 'L', 1]] },
    side:  { L: -3, R: 3, hat: 0, hw: .6, hatY: -8.5, bandY: -7.9, bandW: .6,  earX: 3, earY: -6.5, face: { sides: [1],     eyeX: 1.2, eyeY: -6.4, eyeRx: .6, eyeRy: .7 }, legs: [[-.8, 1], [.8, 0]],   arms: [[0, 0, 'L', 1]] },
    qback: { L: -4, R: 4, hat: -.2, hw: .8, hatY: -8.5, face: null, legs: [[-1.5, 1], [1.5, 0]], arms: [[-3.8, -1, 'R', 2], [3.8, 1, 'L', 1]] },
    back:  { L: -4, R: 4, hat: 0, hw: .8, hatY: -8.5, face: null, back: true, legs: [[-1.5, 0], [1.5, 0]], arms: [[-3.8, -1, 'R', 1], [3.8, 1, 'L', 1]] },
  };

  function buildBody(u, V, J) {
    return closedThrough([[0, -8.5], [3.2, -7.2], [3.8, -3.5], [2.5, -1.0], [0, -.8], [-2.5, -1.0], [-3.8, -3.5], [-3.2, -7.2]], 3)
      .map(([a, b]) => [a * u + jit(J), b * u + jit(J)]);
  }

  // Register only when copied and given a unique id:
  // CharacterRegistry.register('my_char', {
  const TEMPLATE_BLUEPRINT = {
    id: 'my_char',
    name: 'My Character',
    palette: CHAR_PAL,
    metrics: {
      width: 8, height: 8.5,
      shadowWidth: 8, shadowRx: 4.0, shadowRy: .8,
      hatY: -8.5, hatW: .8,
      emoteTop: [0, -10.5], emoteSide: [4.2, -8.5],
      jitter: .06, swScale: 1,
    },
    views: VIEWS,
    emotionChannels: [],       // optional custom numeric/tuple channels interpolated by emotions()
    emotionOverrides: {},      // override or add new signature emotions beyond the 31 in BASE_EMO
    moveOverrides: {},         // optional dance overrides
    parts: {
      // Optional layers: aura, backAppendages, farArms, legs, backCrown, frontAppendages, face, hat, nearArms
      legs: ctx => {
        const { V, u, sw, o } = ctx;
        V.legs.forEach(([lx, isFar], i) => {
          ctx.rs('leg' + i);
          const lift = o.walk != null ? Math.max(0, Math.cos((o.walk + i * .5) * TAU)) * .6 : 0;
          paint(ellPts(lx * u, (-.4 - lift) * u, .7 * u, .4 * u, 12), { wash: isFar ? ctx.far : ctx.cols.dk, ink: PAL.ink, sw: sw * .8 });
        });
      },
      body: ctx => {
        ctx.rs('body');
        const pts = buildBody(ctx.u, ctx.V, ctx.J);
        paint(pts, { wash: ctx.cols.col, fill: ctx.cols.lt, fillOp: 80, ink: PAL.ink, sw: ctx.sw });
      },
      face: ctx => {
        const { V, u, sw } = ctx;
        ctx.rs('eyes');
        for (const s of V.face.sides) {
          paint(ellPts(s * V.face.eyeX * u, V.face.eyeY * u, V.face.eyeRx * u, V.face.eyeRy * u, 12), { wash: PAL.ink, ink: null });
        }
        ctx.rs('mouth');
        inkLine([[-.6 * u, -4.6 * u], [0, -4.2 * u], [.6 * u, -4.6 * u]], sw * .8, PAL.ink, 'ink', .5);
      },
      hat: ctx => {
        ctx.rs('hat');
        drawSharedHat(ctx.u, ctx.o.hat, ctx.sw, { y: ctx.V.hatY, w: ctx.V.hw, bodyCol: ctx.cols.col });
      },
    },
    measure(x, y, u, o = {}) {
      const V = VIEWS[o.view] || VIEWS.front;
      const dy = (o.dy || 0) * u;
      return {
        charId: 'my_char',
        view: o.view || 'front',
        feetBottomY: dy,
        bodyPoly: buildBody(u, V, 0).map(([lx, ly]) => [x + lx, y + dy + ly]),
        eyes: [], arms: [], hairFeathers: [], hasNaN: false,
        worldBBox: [x + V.L * u, y + dy - 8.5 * u, x + V.R * u, y + dy],
      };
    },
  };
  void TEMPLATE_BLUEPRINT;
})();
