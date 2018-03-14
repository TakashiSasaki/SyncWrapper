var assert = require("./HashWrapper/myassert").assert;

var x = [1,2,3];
assert.lengthOf(x, 3);

var modules = [ "mergeTheirsToOurs" ];
for(let i in modules) {
  let module = require("./" + modules[i]);
  for(let j in module) {
    if(typeof module[j] === "function") {
      global[j] = module[j];
    }
  }
}

var theirs = {
  items: {
    "id1": {
      _id: "id1",
      value1: "their hoge",
      value2: "their fuga",
    }// id1
  },
  rejectedBy: {},
  rejecting: {},
  mergedInto: {}
};
Object.preventExtensions(theirs);
var theirsStringified = JSON.stringify(theirs);

var ours = {
  items: {
    "id1": {
      _id: "id1",
      value1: "our hoge",
      value2: "our fuga",
    },// id1
    "id2": {
      _id: "id2",
      value1: "hoge",
      value2: "fuga",
    },// id1
  },
  rejectedBy: {},
  rejecting: {},
  mergedInto: {}
};
Object.preventExtensions(ours);
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
mergeTheirsToOurs(theirs, ours, rejectingMerger);
assert.deepStrictEqual(ours, JSON.parse('{"items":{"id1":{"_id":"id1","value1":"our hoge","value2":"our fuga"},"id2":{"_id":"id2","value1":"hoge","value2":"fuga"}},"rejectedBy":{},"rejecting":{"id1":{"_id":"id1","value1":"their hoge","value2":"their fuga"}},"mergedInto":{}}'));
assert.deepStrictEqual(theirs, JSON.parse('{"items":{},"rejectedBy":{"id1":{"_id":"id1","value1":"our hoge","value2":"our fuga"}},"rejecting":{},"mergedInto":{}}'));

function submissiveMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  for(var i in Object.keys(theirItem)) {
    mergedItem[Object.keys(theirItem)[i]] = theirItem[Object.keys(theirItem)[i]];
  }
  return 1;
}//function submissiveMerger

var theirs = JSON.parse(theirsStringified);
var ours = JSON.parse(oursStringified);
mergeTheirsToOurs(theirs, ours, submissiveMerger);
assert.deepStrictEqual(theirs, JSON.parse('{"items":{},"rejectedBy":{},"rejecting":{},"mergedInto":{"id1":{"_id":"id1","value1":"their hoge","value2":"their fuga"}}}'));
assert.deepStrictEqual(ours, JSON.parse('{"items":{"id1":{"_id":"id1","value1":"their hoge","value2":"their fuga"},"id2":{"_id":"id2","value1":"hoge","value2":"fuga"}},"rejectedBy":{},"rejecting":{},"mergedInto":{}}'));

