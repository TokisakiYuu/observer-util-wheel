const runningReactionStack = [];

function runAsReaction(fn, reaction) {
  runningReactionStack.push(reaction);
  fn();
  runningReactionStack.pop();
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