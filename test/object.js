let {
  observable,
  observe,
  raw
} = require("../index");
// } = require("../../../dist/cjs.es5");

let obj = observable({});


let reaction = observe(() => {
  console.log("[reaction]", obj.p);
});

// emit once
obj.p = 9;

// emit once
obj.p = 10;