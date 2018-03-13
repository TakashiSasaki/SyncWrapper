var assert = require("hashwrapper").assert;

function SyncWrapper(backend){
	assert.lengthOf(backend, 1);
	this.backend = backend;

	this.doPost = function(){
	};

	this.doGet = function(){
	};



}

