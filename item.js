var assert = require("./HashWrapper/myassert").assert;

function SyncWrapper(){
	assert.lengthOf(arguments, 1);

	this.rejectedBy = {};
  this.mergedWith = {};
	this.rejecting = {};

  this.items = {};

  this.put = function(items){
    assert.isArray(items);
    for(var i in items) {
      const item = items[i];
      assert.isObject(item);
      assert.hasProperty(item, "_id");
      const _id = item["_id"];
      assert.isString(_id);
      this.items[_id] = item;
    }
  };

  this.post = post_();

}

if(typeof exports == "undefined") exports = {};
exports.SyncWrapper = SyncWrapper;

