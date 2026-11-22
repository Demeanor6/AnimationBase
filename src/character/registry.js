// registry.js: Character Registry + Factory pattern.
// Allows registering multiple protagonist blueprints (e.g. 'psyduck', 'clawd', custom characters) and switching the
// active protagonist globally via PROJECT.character, URL ?char=..., CLI --char=..., or CharacterRegistry.setActive(id).
(() => {
  const specs = new Map();
  let activeId = (typeof PROJECT !== 'undefined' && PROJECT.character) ? PROJECT.character : 'psyduck';

  function validate(spec) {
    if (!spec || typeof spec !== 'object') throw new Error('Character blueprint must be an object');
    for (const k of ['id', 'palette', 'metrics', 'views', 'parts']) {
      if (!spec[k]) throw new Error(`Character blueprint "${spec.id || '?'}" missing required key: ${k}`);
    }
    if (typeof spec.parts.body !== 'function') {
      throw new Error(`Character blueprint "${spec.id}" must implement parts.body(ctx)`);
    }
    return spec;
  }

  function register(id, blueprintOrFactory) {
    const raw = typeof blueprintOrFactory === 'function' ? blueprintOrFactory() : blueprintOrFactory;
    const spec = validate({ ...raw, id: raw.id || id });
    specs.set(id, spec);
    return spec;
  }

  function get(id) {
    const target = id || activeId;
    const spec = specs.get(target);
    if (!spec) throw new Error(`Unknown character "${target}". Registered: [${Array.from(specs.keys()).join(', ')}]`);
    return spec;
  }

  function setActive(id) {
    if (!specs.has(id)) throw new Error(`Cannot activate unknown character "${id}". Registered: [${Array.from(specs.keys()).join(', ')}]`);
    activeId = id;
    return specs.get(id);
  }

  function getActiveId() { return activeId; }
  function getActive() { return get(activeId); }
  function list() { return Array.from(specs.keys()); }
  function has(id) { return specs.has(id); }

  function resolveEmotions(id) {
    const spec = get(id);
    const base = typeof BASE_EMO !== 'undefined' ? BASE_EMO : {};
    const over = spec.emotionOverrides || {};
    const merged = {};
    for (const k of Object.keys(base)) merged[k] = over[k] ? { ...base[k], ...over[k] } : base[k];
    for (const k of Object.keys(over)) if (!merged[k]) merged[k] = over[k];
    return merged;
  }

  function resolveMoves(id) {
    const spec = get(id);
    const base = typeof BASE_MOVE !== 'undefined' ? BASE_MOVE : {};
    const over = spec.moveOverrides || {};
    return { ...base, ...over };
  }

  window.CharacterRegistry = { register, get, setActive, getActiveId, getActive, list, has, resolveEmotions, resolveMoves };
})();
