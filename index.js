let {createObservable} = require("./src/observable");
let observe = require("./src/observe");
let {raw, isObservable} = require("./src/store");
let {getHandler} = require("./src/handlers");

function observable(target) {
  eachObjectOrFunctionProps(target, (obj, prop, value) => observable(value), false);
  return createObservable(
    target,
    getHandler(target)
  );
}

/** 
 * 遍历目标对象中的每一个值为对象或函数的属性
 * handle的返回值将被作为当前属性的新值
 * @param {Object} obj 目标对象
 * @param {Function} handle 回调函数
 * @param {Boolean} dep 是否深度遍历
 */
function eachObjectOrFunctionProps(obj, handle, dep) {
  if(!obj) return;
  if(typeof obj === "function") return;
  let props = Reflect.ownKeys(obj);
  props.forEach(prop => {
    let value = obj[prop];
    if(typeof value !== "object" && typeof value !== "function") return;
    if(dep && typeof value === "object") {
      eachObjectOrFunctionProps(value, handle, true);
    }
    obj[prop] = Reflect.apply(handle, obj, [obj, prop, value]);
  })
}

module.exports = {
  observable,
  observe,
  raw,
  isObservable
}
