'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	messageText : {type : String, required :true, unique : true },
	created_at : String,
	updated_at : String
});

module.exports = mongoose.model("Message",messageSchema);

