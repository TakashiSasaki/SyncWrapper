assert = require("./HashWrapper/myassert").assert;

function merge(theirs, ours, merger) {
  assert.lengthOf(arguments, 3);
  this.merger = merger;
  assert.isFunction(merger);
  assert.isObject(theirs);
  assert.hasProperty(theirs, "items");
  assert.isObject(theirs.items);
  assert.hasProperty(theirs, "rejectedBy");
  assert.isObject(theirs.rejectedBy);
  assert.hasProperty(theirs, "mergedWith");
  assert.isObject(theirs.mergedWith);
  assert.hasProperty(theirs, "rejecting");
  assert.isObject(theirs.rejecting);
  assert.isObject(ours);
  assert.hasProperty(ours, "items");
  assert.isObject(ours.items);
  assert.hasProperty(ours, "rejectedBy");
  assert.isObject(ours.rejectedBy);
  assert.hasProperty(ours, "mergedWith");
  assert.isObject(ours.mergedWith)
  assert.hasProperty(ours, "rejecting");
  assert.isObject(ours.rejecting);

  for(var i in Object.keys(theirs.items)) {
    assert.isString(i);
    console.log(i);
    const theirItem = theirs.items[Object.keys(theirs.items)[i]];
    assert.isObject(theirItem);
    assert.hasProperty(theirItem, "_id");
    const _id = theirItem["_id"];
    assert.isString(_id);

    const ourItem = ours.items[_id];

    if(typeof ourItem === "undefined") {
      ours.items[_id] = theirItem;
      continue;
    }//if

    var mergedItem = {};
    const mergeResult = this.merger(theirItem, ourItem, mergedItem); 

    if(mergeResult < 0) { // merge failed
      ours.rejecting[_id] = theirItem;
      theirs.rejectedBy[_id] = ourItem;
      continue;
    }

    if(mergeResult > 0) { // merge succeeded
      theirs.mergedWith[_id] = ourItem;
      ours.items[_id] = mergedItem;
      continue;
    }
  }//for i
}//function merge

if(typeof exports === "undefined") exports = {};
exports.merge = merge;

