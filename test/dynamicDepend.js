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

let flag = true;

let reaction = observe(() => {
  if(flag) {
    flag = false;
    console.log("[reaction]", ob.say);
  } else {
    console.log("[reaction]", ob.name);
  }
})

// not emit
ob.name = "tksk";

// emit once
reaction();

// emit once
ob.name = "tokisaki";