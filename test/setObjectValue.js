let {
    observable,
    observe,
    raw
  } = require("../index");
  // } = require("../../../dist/cjs.es5");
  
  let ob = observable({
    name: "tokisakiyuu"
  });

let objectValue = {
    firstName: "yuu",
    lastName: "tokisaki"
};
  
  
let reaction = observe(() => {
    let {lastName, firstName} = ob.name;
    console.log("[reaction]", `my name is ${firstName} ${lastName}`);
});


// emit once
ob.name = objectValue;

// emit once
ob.name.lastName = "tksk";