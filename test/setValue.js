let {
  observable,
  observe,
  raw
} = require("../index");
// } = require("../../../dist/cjs.es5");

let ob = observable({
  name: "yuu",
  say: "hello"
});


let reaction_one = observe(() => {
  console.log("[reaction]", ob.say);
});

let reactions_tow = observe(() => {
  console.log("==== in reaction_tow ====");
  reaction_one();
  console.log("=========================");
});

// emit once "reaction_one"
ob.say = "world";