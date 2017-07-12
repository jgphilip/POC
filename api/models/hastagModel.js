'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hashtagSchema = new Schema({
	postId : String,
	postMessage : {type : String, required :true, unique : true },
	created_at : String,
	updated_at : String
});

module.exports = mongoose.model("Hashtag",hashtagSchema);