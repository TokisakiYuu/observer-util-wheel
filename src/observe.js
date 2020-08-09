let {runAsReaction} = require("./runAsReaction");
let {storeReaction} = require("./store");

function pureObject() {
  return Object.create(null);
}

// make a reaction and return it
function observe(fn) {
  if(fn.$mate) {
    return fn();
  }
  const dependMap = new Map();
  function reaction() {
    runAsReaction(fn, reaction);
  }
  // init reaction mate
  let reactionMate = pureObject();
  reactionMate.self = reaction;
  reactionMate.addDepend = addDepend.bind(dependMap);
  reactionMate.getDepend = getDepend.bind(dependMap);
  reaction.$mate = reactionMate;
  reaction();
  storeReaction(reaction);
  return reaction;
}

/**
 * 为当前reaction添加依赖
 * @this Map
 */
function addDepend(target, prop) {
  if(!this.has(target)) {
    this.set(target, new Set());
  }
  /**
   * @type Set
   */
  const props = this.get(target);
  props.add(prop);
}

/**
 * 获取当前reaction的所有依赖
 * @this Map
 */
function getDepend(target) {
  if(!target) return this;
  if(!this.has(target)) return [];
  return Array.from(this.get(target));
}

module.exports = observe;