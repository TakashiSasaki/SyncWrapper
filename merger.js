
function rejectingMerger(theirItem, ourItem, mergedItem) {
  assert.isObject(theirItem);
  assert.isObject(ourItem);
  assert.isObject(mergedItem);
  assert.notDeepStrictEqual(theirItem, ourItem);
  assert.strictEqual(theirItem["_id"], ourItem["_id"]);
  return -1;
}//function rejectingMerger


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

if(typeof exports === "undefined") exports = {};
exports.rejectingMerger = rejectingMerger;
exports.submissiveMerger = submissiveMerger;
exports.defaultMerger = defaultMerger;
