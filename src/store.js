const receiverToRaw = new WeakMap();
const rawToReceiver = new WeakMap();
const reactions = new Set();

function storeReceiver(receiver, target) {
  receiverToRaw.set(receiver, target);
  rawToReceiver.set(target, receiver);
}

function raw(receiver) {
  return receiverToRaw.get(receiver);
}

function isObservable(object) {
  return receiverToRaw.has(object);
}

function receiver(raw) {
  return rawToReceiver.get(raw);
}

function storeReaction(reaction) {
  if(!reaction.$mate) return;
  reactions.add(reaction);
}

function findReaction(target, prop) {
  let targetReactions = [];
  reactions.forEach(reaction => {
    let mate = reaction.$mate;
    let dependProps = mate.getDepend(target);
    if(!dependProps.length) return;
    if(dependProps.includes(prop)) {
      targetReactions.push(reaction);
    }
  })
  return targetReactions;
}

// 对数组的操作记录
let arrayOperationRecord = new Map();

module.exports = {
  storeReceiver,
  raw,
  receiver,
  storeReaction,
  findReaction,
  isObservable
}