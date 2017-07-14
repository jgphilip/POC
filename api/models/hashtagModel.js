'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hashtagSchema = new Schema({
	post 				: String,
	hashtags 			: [String],
});

module.exports = mongoose.model("Hashtag",hashtagSchema);