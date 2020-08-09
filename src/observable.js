const {storeReceiver} = require("./store");

function createObservable(target, handler) {
  if(!target) return target;
  const receiver = new Proxy(target, handler);
  storeReceiver(receiver, target);
  return receiver;
}

module.exports = {
  createObservable
};