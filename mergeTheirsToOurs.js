assert = require("./HashWrapper/myassert").assert;

function mergeTheirsToOurs(theirs, ours, merger) {
  assert.lengthOf(arguments, 3);
  this.merger = merger;
  assert.isFunction(merger);
  assert.isObject(theirs);
  assert.hasProperty(theirs, "items");
  assert.isObject(theirs.items);
  assert.hasProperty(theirs, "rejectedBy");
  assert.isObject(theirs.rejectedBy);
  assert.hasProperty(theirs, "mergedInto");
  assert.isObject(theirs.mergedInto);
  assert.hasProperty(theirs, "rejecting");
  assert.isObject(theirs.rejecting);
  assert.isObject(ours);
  assert.hasProperty(ours, "items");
  assert.isObject(ours.items);
  assert.hasProperty(ours, "rejectedBy");
  assert.isObject(ours.rejectedBy);
  assert.hasProperty(ours, "mergedInto");
  assert.isObject(ours.mergedInto)
  assert.hasProperty(ours, "rejecting");
  assert.isObject(ours.rejecting);

  for(var i in Object.keys(theirs.items)) {
    assert.isString(i);
    const theirItem = theirs.items[Object.keys(theirs.items)[i]];
    assert.isObject(theirItem);
    assert.hasProperty(theirItem, "_id");
    const _id = theirItem["_id"];
    assert.isString(_id);

    const ourItem = ours.items[_id];

    if(typeof ourItem === "undefined") {
      ours.items[_id] = theirItem;
      delete theirs.items[_id];
      continue;
    }//if

    var mergedItem = {};
    const mergeResult = this.merger(theirItem, ourItem, mergedItem); 

    if(mergeResult < 0) { // merge failed
      ours.rejecting[_id] = theirItem;
      delete theirs.items[_id];
      theirs.rejectedBy[_id] = ourItem;
      continue;
    }

    if(mergeResult > 0) { // merge succeeded
      assert.hasProperty(mergedItem, "_id");
      theirs.mergedInto[_id] = mergedItem;
      ours.items[_id] = mergedItem;
      delete theirs.items[_id];
      continue;
    }

    if(mergeResult === 0) {
      delete thiers.items[_id]; 
    }
  }//for i
}//function mergeTheirsToOurs

if(typeof exports === "undefined") exports = {};
exports.mergeTheirsToOurs = mergeTheirsToOurs;

