// engine.js: Template Method + Strategy + Inspector rendering engine for any character blueprint.
// Handles boilSeed isolation, view resolution, palette tinting, squash-and-stretch transforms, ordered anatomical
// layer execution, emote positioning, and geometric bounding inspection for zero-clipping checks.
(() => {
  function draw(spec, x, y, u, o = {}) {
    const id = o.boilKey ?? ++ACTOR_N;
    const rs = part => boilSeed(`${spec.id} ${id} ${part}`);
    x += (o.dx || 0) * u;
    const V = spec.views[o.view] || spec.views.front;
    const dy = (o.dy || 0) * u;
    const sq = (o.sq || 0) + (o.take || 0);
    const sm = clamp(o.smear || 0);
    const sw = clamp(u / 15, .45, 2.4) * (o.swMul || 1) * (spec.metrics.swScale || 1);
    const J = u * (spec.metrics.jitter ?? .065);
    const cols = tintCols(o, spec.palette);
    const far = mixCol(cols.dk, PAL.ink, .22);
    const ctx = { spec, V, x, y, u, o, dy, sq, sm, sw, J, cols, far, rs };

    if (spec.parts.aura) {
      rs('aura');
      spec.parts.aura(ctx);
    }

    rs('shadow');
    if (!o.noShadow) {
      const f = 1 - Math.min(.5, Math.abs(o.dy || 0) * .06);
      const baseW = spec.metrics.shadowWidth || 10;
      const w = (V.R - V.L) / baseW;
      paint(ellPts(x, y + u * .15, u * (spec.metrics.shadowRx || 5.2) * f * w, u * (spec.metrics.shadowRy || .95) * f, 22),
        { fill: PAL.ink, fillOp: 88, bleed: .25, tex: .3, border: .1, ink: null });
    }
    if (sm > .05) {
      rs('smear');
      smearTrail(x, y + dy, u, V, sm, o.smearDir ?? (o.flip ? -1 : 1), cols.col);
    }

    push();
    translate(x, y + dy);
    if (o.rot) rotate(o.rot);
    scale((o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * .6) * (1 + sm * .35), (o.sy ?? 1) * (1 - sq));

    const P = spec.parts;
    if (P.backAppendages) P.backAppendages(ctx);
    if (P.farArms) P.farArms(ctx);
    if (P.legs && !o.noLegs) P.legs(ctx);
    if (P.backCrown) P.backCrown(ctx);
    P.body(ctx);
    if (P.frontAppendages) P.frontAppendages(ctx);
    if (P.face && V.face) P.face(ctx);
    if (P.hat) P.hat(ctx);
    if (P.nearArms) P.nearArms(ctx);
    rs('draw');
    if (o.draw) o.draw(u, sw);
    pop();

    rs('emote');
    if (o.emote) {
      const top = EMOTE_TOP.includes(o.emote), dir = o.flip ? -1 : 1;
      const topOff = V.emoteTop || spec.metrics.emoteTop || [V.hat || 0, -10.4];
      const sideOff = V.emoteSide || spec.metrics.emoteSide || [V.R + .4, -8.6];
      const ex = x + dir * (top ? topOff[0] : sideOff[0]) * u;
      const ey = y + dy + (top ? topOff[1] : sideOff[1]) * u * (1 - sq);
      emote(o.emote, ex, ey, u * .9, o.emoteK ?? 1, o.emoteAge ?? T);
    }
    rs('after');
  }

  function measure(spec, x, y, u, o = {}) {
    if (typeof spec.measure === 'function') return spec.measure(x, y, u, o);
    const V = spec.views[o.view] || spec.views.front;
    const h = spec.metrics.height || 8;
    const w = (V.R - V.L) * u;
    return {
      charId: spec.id,
      view: o.view || 'front',
      feetBottomY: (o.dy || 0) * u,
      eyes: [],
      arms: [],
      hairFeathers: [],
      hasNaN: false,
      worldBBox: [x - w / 2, y + ((o.dy || 0) - h) * u, x + w / 2, y + (o.dy || 0) * u]
    };
  }

  window.CharacterEngine = { draw, measure };
})();
