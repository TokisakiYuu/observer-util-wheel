const {getStackHead, isEmptyStack} = require("./runAsReaction");
const {findReaction} = require("./store");
const {createObservable} = require("./observable");

function get(target, prop, receiver) {
  // console.log(`[get trap] prop: ${prop}`);
  let result = Reflect.get(target, prop, receiver);
  let currentReaction = getStackHead();
  if(!currentReaction) return result;
  currentReaction.$mate.addDepend(target, prop);
  return result;
}

function set(target, prop, value, receiver) {
  // console.log("[set trap]", prop, " = ", value);
  let oldValue = Reflect.get(target, prop);
  let newValue = value;
  if(isObject(value)) {
    value = createObservable(value, getHandler(value));
  }
  let result = Reflect.set(target, prop, value, receiver);
  if(!isEmptyStack()) {
    return result;
  }
  if(oldValue !== newValue) {
    findAndRunReactions(target, prop);
  }
  return result;
}

function set_array(target, prop, value, receiver) {
  // console.log("[set trap]", prop, " = ", value);
  let oldValue = Reflect.get(target, prop);
  let newValue = value;
  if(isObject(value)) {
    value = createObservable(value, getHandler(value));
  }
  let result = Reflect.set(target, prop, value, receiver);
  if(!isEmptyStack()) {
    return result;
  }
  if(oldValue !== newValue) {
    findAndRunReactions(target, prop);
  }
  if(prop === "length") {
    let reactions = findReaction(target, "length");
    reactions.forEach(reaction => {
      if(reaction.$mate.skipLengthChange) {
        reaction.$mate.skipLengthChange = false;
        return result;
      }
    })
  } else if(isArrayIndexNumber(prop)) {
    let reactions = findReaction(target, "length");
    reactions.forEach(reaction => {
      reaction();
      reaction.$mate.skipLengthChange = true;
    })
  }
  return result;
}

let handlerMap = new Map([
  [Object, {get, set}],
  [Array, {get, set: set_array}],
]);

function getHandler(target) {
  if(!target) return {};
  let constructor = target.constructor;
  if(!handlerMap.has(constructor)) {
    console.error("不支持观察此对象上的数据变化");
    return {};
  }
  return handlerMap.get(constructor);
}

function isArrayIndexNumber(str) {
  return String(Math.abs(parseInt(Number(str)))) === str;
}

function isObject(obj) {
  return typeof obj === "object";
}

function findAndRunReactions(target, prop) {
  const reactions = findReaction(target, prop);
  reactions.forEach(reaction => {
    reaction();
  });
}

module.exports = {
  getHandler
};