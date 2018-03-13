var assert = require("hashwrapper").assert;

function SyncWrapper(){
	assert.lengthOf(arguments, 0);
	this._id = "";
	this._dirty = false;
	this._rejected = false;
	this._rejecting = false;
}


