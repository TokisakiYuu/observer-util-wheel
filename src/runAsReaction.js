const runningReactionStack = [];

function runAsReaction(fn, reaction) {
  runningReactionStack.push(reaction);
  let result = fn();
  runningReactionStack.pop();
  return result;
}

function getStackHead() {
  let lastIndex = runningReactionStack.length - 1;
  return runningReactionStack[lastIndex];
}

function isEmptyStack() {
  return runningReactionStack.length === 0;
}

module.exports = {
  runAsReaction,
  getStackHead,
  isEmptyStack
};