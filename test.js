var assert = require("myassert").assert;

var x = [1,2,3];
assert.lengthOf(x, 3);
process.stderr.write("test finished\n");

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
    "idInBoth1": {
      _id: "idInBoth1",
      value1: "theirValue1",
      value2: "theirValue2",
    },// idInBoth1
    "idInBoth2": {
      _id: "idInBoth2",
      value1: "hogeInBoth",
      value2: "fugaInBoth",
    },// idInBoth2
    "idOnlyInTheirs": {
      _id: "idOnlyInTheirs",
      value1: "hoge",
      value2: "fuga",
    },// idOnlyInTheirs
  },
  rejectedBy: {},
  rejecting: {},
  mergedInto: {}
};
Object.preventExtensions(theirs);
var theirsStringified = JSON.stringify(theirs);

var ours = {
  items: {
    "idInBoth1": {
      _id: "idInBoth1",
      value1: "ourValue1",
      value2: "ourValue2",
    },// idInBoth1
    "idInBoth2": {
      _id: "idInBoth2",
      value1: "hogeInBoth",
      value2: "fugaInBoth",
    },// idInBoth1
    "idOnlyInOurs": {
      _id: "idOnlyInOurs",
      value1: "hoge",
      value2: "fuga",
    },// idOnlyInOurs
  },
  rejectedBy: {},
  rejecting: {},
  mergedInto: {}
};
Object.preventExtensions(ours);
var oursStringified = JSON.stringify(ours);

process.stderr.write("testRejectingMerger\n");

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
process.stderr.write("theirs: ");
console.log(JSON.stringify(theirs));
process.stderr.write("ours: ");
console.log(JSON.stringify(ours));
exit();
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

function defaultMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  try {
    assert.deepStrictEqual(theirItem, ourItem);
    return 0;
  } catch(e) {
    return -1;
  }
}

var theirs = JSON.parse(theirsStringified);
var ours = JSON.parse(oursStringified);
mergeTheirsToOurs(theirs, ours, defaultMerger);
console.log("theirs = " + JSON.stringify(theirs));
console.log("ours = " + JSON.stringify(ours));
