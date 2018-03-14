var assert = require("myassert").assert;

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
  mergedTo: {}
};
Object.preventExtensions(theirs);
const theirsStringified = JSON.stringify(theirs);

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
  mergedTo: {}
};
Object.preventExtensions(ours);
const oursStringified = JSON.stringify(ours);

function rejectingMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.notDeepStrictEqual(theirItem, ourItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  return -1;
}//function rejectingMerger

var theirs = JSON.parse(theirsStringified);
assert.isObject(theirs);
var ours = JSON.parse(oursStringified);
assert.isObject(ours);
mergeTheirsToOurs(theirs, ours, rejectingMerger);
console.log(JSON.stringify(theirs));
var expectedTheirsStringified =
'{"items":{},"rejectedBy":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"}},"rejecting":{},"mergedTo":{}}';
console.log(JSON.stringify(ours));
var expectedOursStringified = 
'{"items":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"},"idInBoth2":{"_id":"idInBoth2","value1":"hogeInBoth","value2":"fugaInBoth","_dirty":false},"idOnlyInOurs":{"_id":"idOnlyInOurs","value1":"hoge","value2":"fuga"},"idOnlyInTheirs":{"_id":"idOnlyInTheirs","value1":"hoge","value2":"fuga","_dirty":false}},"rejectedBy":{},"rejecting":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"}},"mergedTo":{}}';
assert.deepStrictEqual(theirs, JSON.parse(expectedTheirsStringified));
assert.deepStrictEqual(ours, JSON.parse(expectedOursStringified));


function submissiveMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.notDeepStrictEqual(theirItem, ourItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  for(var i in Object.keys(theirItem)) {
    mergedItem[Object.keys(theirItem)[i]] = theirItem[Object.keys(theirItem)[i]];
  }
  return 1;
}//function submissiveMerger

var theirs = JSON.parse(theirsStringified);
var ours = JSON.parse(oursStringified);
mergeTheirsToOurs(theirs, ours, submissiveMerger);
console.log(JSON.stringify(theirs));
var expectedTheirsStringified =
'{"items":{},"rejectedBy":{},"rejecting":{},"mergedTo":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"}}}';
assert.deepStrictEqual(theirs, JSON.parse(expectedTheirsStringified));
console.log(JSON.stringify(ours));
var expectedOursStringified = 
'{"items":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"},"idInBoth2":{"_id":"idInBoth2","value1":"hogeInBoth","value2":"fugaInBoth","_dirty":false},"idOnlyInOurs":{"_id":"idOnlyInOurs","value1":"hoge","value2":"fuga"},"idOnlyInTheirs":{"_id":"idOnlyInTheirs","value1":"hoge","value2":"fuga","_dirty":false}},"rejectedBy":{},"rejecting":{},"mergedTo":{}}';
assert.deepStrictEqual(ours, JSON.parse(expectedOursStringified));

function defaultMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.notDeepStrictEqual(theirItem, ourItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  try {
    assert.deepStrictEqual(theirItem, ourItem);
    return 0;
  } catch(e) {
    return -1;
  }// try
}//defaultMerger

var theirs = JSON.parse(theirsStringified);
var ours = JSON.parse(oursStringified);
mergeTheirsToOurs(theirs, ours, defaultMerger);
console.log(JSON.stringify(theirs));
var expectedTheirsStringified = 
'{"items":{},"rejectedBy":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"}},"rejecting":{},"mergedTo":{}}';
assert(theirs, JSON.parse(expectedTheirsStringified));
console.log(JSON.stringify(ours));
var expectedOursStringified =
'{"items":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"},"idInBoth2":{"_id":"idInBoth2","value1":"hogeInBoth","value2":"fugaInBoth","_dirty":false},"idOnlyInOurs":{"_id":"idOnlyInOurs","value1":"hoge","value2":"fuga"},"idOnlyInTheirs":{"_id":"idOnlyInTheirs","value1":"hoge","value2":"fuga","_dirty":false}},"rejectedBy":{},"rejecting":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"}},"mergedTo":{}}';
assert(ours, JSON.parse(expectedOursStringified));
