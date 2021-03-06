var assert = require("myassert").assert;

var modules = [ "mergeTheirsToOurs", "merger" ];
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
  rejectedBy: {}, //set by us as the result of merging
  mergedTo: {},   //set by us as the result of merging
  rejecting: {},  //We don't care
  mergedWith: {}, //provided by them. We don't care it.
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
  rejectedBy: {},   //We don't care
  mergedTo: {},     //We don't care
  rejecting: {},    //set by us as the result of merging
  mergedWith: {},   //We don't care
};
Object.preventExtensions(ours);
const oursStringified = JSON.stringify(ours);

function testRejectingMerger(){
  var theirs = JSON.parse(theirsStringified);
  assert.isObject(theirs);
  var ours = JSON.parse(oursStringified);
  assert.isObject(ours);
  mergeTheirsToOurs(theirs, ours, rejectingMerger);
  console.log(JSON.stringify(theirs));
  var expectedTheirsStringified =
  '{"items":{},"rejectedBy":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"}},"rejecting":{},"mergedTo":{},"mergedWith":{}}';
  console.log(JSON.stringify(ours));
  var expectedOursStringified = 
  '{"items":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"},"idInBoth2":{"_id":"idInBoth2","value1":"hogeInBoth","value2":"fugaInBoth","_dirty":false},"idOnlyInOurs":{"_id":"idOnlyInOurs","value1":"hoge","value2":"fuga"},"idOnlyInTheirs":{"_id":"idOnlyInTheirs","value1":"hoge","value2":"fuga","_dirty":false}},"rejectedBy":{},"rejecting":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"}},"mergedTo":{},"mergedWith":{}}';
  assert.deepStrictEqual(theirs, JSON.parse(expectedTheirsStringified));
  assert.deepStrictEqual(ours, JSON.parse(expectedOursStringified));
}

function testSubmissiveMerger(){
  var theirs = JSON.parse(theirsStringified);
  var ours = JSON.parse(oursStringified);
  mergeTheirsToOurs(theirs, ours, submissiveMerger);
  console.log(JSON.stringify(theirs));
  var expectedTheirsStringified =
  '{"items":{},"rejectedBy":{},"rejecting":{},"mergedTo":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"}},"mergedWith":{}}';
  assert.deepStrictEqual(theirs, JSON.parse(expectedTheirsStringified));
  console.log(JSON.stringify(ours));
  var expectedOursStringified = 
  '{"items":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"},"idInBoth2":{"_id":"idInBoth2","value1":"hogeInBoth","value2":"fugaInBoth","_dirty":false},"idOnlyInOurs":{"_id":"idOnlyInOurs","value1":"hoge","value2":"fuga"},"idOnlyInTheirs":{"_id":"idOnlyInTheirs","value1":"hoge","value2":"fuga","_dirty":false}},"rejectedBy":{},"rejecting":{},"mergedTo":{},"mergedWith":{}}';
  assert.deepStrictEqual(ours, JSON.parse(expectedOursStringified));
}

function testDefaultMerger(){
  var theirs = JSON.parse(theirsStringified);
  var ours = JSON.parse(oursStringified);
  mergeTheirsToOurs(theirs, ours, defaultMerger);
  console.log(JSON.stringify(theirs));
  var expectedTheirsStringified = 
  '{"items":{},"rejectedBy":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"}},"rejecting":{},"mergedTo":{},"mergedWith":{}}';
  assert(theirs, JSON.parse(expectedTheirsStringified));
  console.log(JSON.stringify(ours));
  var expectedOursStringified =
  '{"items":{"idInBoth1":{"_id":"idInBoth1","value1":"ourValue1","value2":"ourValue2"},"idInBoth2":{"_id":"idInBoth2","value1":"hogeInBoth","value2":"fugaInBoth","_dirty":false},"idOnlyInOurs":{"_id":"idOnlyInOurs","value1":"hoge","value2":"fuga"},"idOnlyInTheirs":{"_id":"idOnlyInTheirs","value1":"hoge","value2":"fuga","_dirty":false}},"rejectedBy":{},"rejecting":{"idInBoth1":{"_id":"idInBoth1","value1":"theirValue1","value2":"theirValue2"}},"mergedTo":{},"mergedWith":{}}';
  assert(ours, JSON.parse(expectedOursStringified));
}

testRejectingMerger();
testSubmissiveMerger();
testDefaultMerger();

