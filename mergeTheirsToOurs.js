assert = require("./HashWrapper/myassert").assert;
assert.isInteger(0);

function mergeTheirsToOurs(theirs, ours, merger) {
  assert.lengthOf(arguments, 3);
  this.merger = merger;
  assert.isFunction(merger);
  assert.isObject(theirs);
  assert.hasProperty(theirs, "items");
  assert.isObject(theirs.items);
  assert.hasProperty(theirs, "rejectedBy");
  assert.isObject(theirs.rejectedBy);
  assert.hasProperty(theirs, "mergedTo");
  assert.isObject(theirs.mergedTo);
  assert.hasProperty(theirs, "rejecting");
  assert.isObject(theirs.rejecting);
  assert.isObject(ours);
  assert.hasProperty(ours, "items");
  assert.isObject(ours.items);
  assert.hasProperty(ours, "rejectedBy");
  assert.isObject(ours.rejectedBy);
  assert.hasProperty(ours, "mergedTo");
  assert.isObject(ours.mergedTo)
  assert.hasProperty(ours, "rejecting");
  assert.isObject(ours.rejecting);

  const theirItemsKeys = Object.keys(theirs.items);
  for(var i=0; i<theirItemsKeys.length; ++i) {
    assert.isInteger(i);
    const theirItemKey = theirItemsKeys[i];
    assert.isString(theirItemKey);
    const theirItem = theirs.items[theirItemKey];
    assert.isObject(theirItem);
    assert.hasProperty(theirItem, "_id");
    const _id = theirItem["_id"];
    assert.isString(_id);

    const ourItem = ours.items[_id];

    if(typeof ourItem === "undefined") {
      ours.items[_id] = theirItem;
      ours.items[_id]._dirty = false;
      delete theirs.items[_id];
      continue;
    }//if

    try { // check if theirItem and ourItem are identical
      assert.deepStrictEqual(theirItem, ourItem);
      ourItem._dirty = false;
      delete theirs.items[_id];
      continue
    } catch(e) {
    }

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
      theirs.mergedTo[_id] = mergedItem;
      ours.items[_id] = mergedItem;
      delete theirs.items[_id];
      continue;
    }

    if(mergeResult === 0) { // need not to merge and safe to omit theirItem
      delete thiers.items[_id]; 
    }
  }//for i
}//function mergeTheirsToOurs

if(typeof exports === "undefined") exports = {};
exports.mergeTheirsToOurs = mergeTheirsToOurs;

