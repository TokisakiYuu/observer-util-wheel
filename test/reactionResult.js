let {
  observable,
  observe
} = require("../index");
// } = require("../../../dist/cjs.es5");

let arr = observable([]);


let reaction = observe(() => {
  return true;
});

console.log(reaction());