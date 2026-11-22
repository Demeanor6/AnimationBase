// facade.js: Unified public API for scenes and sheets — actor(), dancer(), psyduck(), clawd().
// Calling actor(x, y, u, o) draws whichever protagonist is active in CharacterRegistry, enabling one-line protagonist swaps.
function actor(x, y, u, o = {}) {
  return CharacterEngine.draw(CharacterRegistry.getActive(), x, y, u, o);
}
actor.as = function asCharacter(id, x, y, u, o = {}) {
  return CharacterEngine.draw(CharacterRegistry.get(id), x, y, u, o);
};
actor.measure = function measureCharacter(x, y, u, o = {}, charId = null) {
  return CharacterEngine.measure(CharacterRegistry.get(charId), x, y, u, o);
};

function dancer(x, y, u, style, t, extra = {}) {
  const charId = extra.charId || null;
  actor.as(charId || CharacterRegistry.getActiveId(), x, y, u, { ...move(style, t, extra.seed || 0, charId), ...extra });
}

function psyduck(x, y, u, o = {}) {
  return actor.as('psyduck', x, y, u, o);
}

function woodpecker(x, y, u, o = {}) {
  return actor.as('woodpecker', x, y, u, o);
}

function clawd(x, y, u, o = {}) {
  return actor.as('clawd', x, y, u, o);
}
