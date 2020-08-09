let {
    observable,
    observe,
    raw
  } = require("../index");
//   } = require("../../../dist/cjs.es5");
  
  let ob = observable({
    name: "tokisakiyuu",
    friends: null
  });

let arrayValue = [
    "张三", "李四", "王五"
];
  
  
let reaction = observe(() => {
    let friends = ob.friends;
    console.log("[reaction]", `${friends && friends.join && friends.join("、")} is friends of tokisakiyuu.`);
});


// emit once
ob.friends = arrayValue;

// // emit once
ob.friends.push("赵六");
