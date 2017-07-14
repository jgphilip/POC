'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postMessageSchema = new Schema({
	postMessage : {type : String, required :true, unique : true },
	created_at : String,
	updated_at : String
});

module.exports = mongoose.model("PostMessage",postMessageSchema);