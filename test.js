var assert = require("./HashWrapper/myassert").assert;

var x = [1,2,3];
assert.lengthOf(x, 3);
console.log("test finished");

var modules = [ "merge" ];
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

var theirs = {
  items: {
    "id1": {
      _id: "id1",
      value1: "hoge",
      value2: "fuga",
    }// id1
  },
  rejectedBy: {},
  rejecting: {},
  mergedWith: {}
};
var theirsStringified = JSON.stringify(theirs);

var ours = {
  items: {
    "id1": {
      _id: "id1",
      value1: "hoge",
      value2: "fuga",
    }// id1
  },
  rejectedBy: {},
  rejecting: {},
  mergedWith: {}
};
var oursStringified = JSON.stringify(ours);

function rejectingMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  return -1;
}//function rejectingMerger

var theirs = JSON.parse(theirsStringified);
var ours = JSON.parse(oursStringified);
merge(theirs, ours, rejectingMerger);
console.log(ours);
console.log(theirs);

function submissiveMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  for(var i in Object.keys(theirItem)) {
    mergedItem[Object.keys(theirItem)[i]] = theirItem[Object.keys(theirItem)[i]];
  }
  return 1;
}//function rejectingMerger

var theirs = JSON.parse(theirsStringified);
var ours = JSON.parse(oursStringified);
merge(theirs, ours, submissiveMerger);
console.log(ours);
console.log(theirs);

