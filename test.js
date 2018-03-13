var assert = require("./HashWrapper/myassert").assert;
var SyncWrapper = require("./class").SyncWrapper;
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

var sw = new SyncWrapper();

var testItems = [
  {
    _id: "id1",
    value1: "hoge",
    value2: "fuga",
  }
];

sw.put(testItems);

