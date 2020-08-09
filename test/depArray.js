let {
    observable,
    observe,
    raw
  } = require("../index");
//   } = require("../../../dist/cjs.es5");
  
  let arr = observable([
      {
          name: "张三"
      },
      {
          name: "李四",
          friend: {
              name: "赵六"
          }
      }
  ]);
  
  
  let reaction = observe(() => {
    console.log("[reaction]", arr[1].friend.name);
  });


// emit once
arr[1].friend.name = "有鱼";