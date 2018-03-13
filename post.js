assert = require("./HashWrapper/myassert").assert;

function post_(items) {
  assert.isArray(items);
  for(var i in items) {
    const item = i;
    assert.hasProperty(item, "_id");
  }//for i
}//function post_

if(typeof exports === "undefined") exports = {};
exports.post_ = post_;

