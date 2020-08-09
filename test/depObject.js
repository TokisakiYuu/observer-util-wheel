let {
    observable,
    observe,
    raw
  } = require("../index");
//   } = require("../../../dist/cjs.es5");
  
  let ob = observable({
    name: {
        firstName: "yuu",
        lastName: "tokisaki"
    }
  });
  
  
  let reaction = observe(() => {
      let {lastName, firstName} = ob.name;
    console.log("[reaction]", `my name is ${firstName} ${lastName}`);
  });


// emit once
ob.name.firstName = "有鱼";

// emit once
ob.name.lastName = "時々 ";