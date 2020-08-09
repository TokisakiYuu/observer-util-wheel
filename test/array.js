let {
  observable,
  observe,
  raw
} = require("../index");
// } = require("../../../dist/cjs.es5");

let arr = observable([]);


let reaction = observe(() => {
  console.log("[reaction]", arr.join(" "));
});

// emit once
arr[0] = "hello";
// emit once
arr.push("world");