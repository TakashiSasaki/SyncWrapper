var assert = require("./HashWrapper/myassert").assert;
var x = [1,2,3];
assert.lengthOf(x, 3);
console.log("test finished");

var modules = [ "post" ];
for(let i in modules) {
  let module = require("./" + modules[i]);
  for(let j in module) {
    if(typeof module[j] === "function") {
      console.log(j);
      console.log(module[j]);
      global[j] = module[j];
    }
  }
}

