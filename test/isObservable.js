let {
  observable,
  isObservable
} = require("../index");
// } = require("../../../dist/cjs.es5");

let arr = observable([]);

console.log(isObservable(arr));

