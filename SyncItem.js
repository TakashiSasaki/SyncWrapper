var assert = require("hashwrapper").assert;

function SyncWrapper(){
	assert.lengthOf(arguments, 1);

	this.rejectedBy = [];
  this.mergedWith = [];
	this.rejecting = [];

  this.items = [];

  this.post = post_();

}


