'use strict';


var  apiai = require('apiai'),
  mongoose = require('mongoose'),
  Hashtag = mongoose.model('Hashtag'),
  Message = mongoose.model('Message');

var apiai_app = apiai("c7655d7d5e394250b3e74bf55b699735");



exports.list_all_posts = function(req,res){
  var wsjid = req.params.wsjid;
  Hashtag.find({wsJid : wsjid},function(err,hashtag){
    if(err)
      res.send(err);
    res.send(hashtag);
  });
}

exports.list_all_posts_with_hashtag = function(req,res){
  var wsjid = req.params.wsjid;
  var searchQuery = '#'+req.params.hashtag;
  console.log(searchQuery);
  Hashtag.find({hashtags : searchQuery, wsJid : wsjid},function(err,hashtag){
    if(err)
      res.send(err);
      console.log(hashtag);
    res.send(hashtag);
  });
};

exports.add_post_with_hashtag = function(req,res){
  console.log(req.params.wsjid);
  var postMsg = req.body.messageText;
  var wsjid = req.params.wsjid;
  var containsHashtag = checkForHashtags(postMsg);
  if(containsHashtag){
      var new_post_msg = new Hashtag({messageText : postMsg, wsJid : wsjid, hashtags : extractHashtags(postMsg)});
      console.log(new_post_msg);
      new_post_msg.save(function(err){
        if(err)
          res.send(err);
        else
          res.send(new_post_msg);
      });
  }
  else{
      res.send('');
  }
};



exports.delete_hashtag = function(req,res) {
  var wsjid  = req.params.wsjid;
  Hashtag.remove({
     _id:req.params.messageId
   }, function(err,hashtag){
     if (err)
      res.send(err);
    res.json({ message: 'Post successfully deleted' });
  });
};


exports.request_help_from_apiai = function(req,res){
  console.log('Query :'+ req.body.query);
    var request = apiai_app.textRequest(req.body.query, {
      sessionId: '14243ndfgh23423hdhdhhdfhh'
  });

  request.on('response', function(response) {
      console.log(response);
      res.json(response);
  });

  request.on('error', function(error) {
      console.log(error);
      res.json('Failure' + response);
  });
  request.end();
}


function checkForHashtags(postMsg){
  console.log(postMsg);
  var words = postMsg.split(" ");
  for(var i in words){
    if(words[i].charAt(0) == '#'){
      return true;
    }
  }
  return false;
}

function extractHashtags(postMsg){
  var hashtags = [];
  var words = postMsg.split(" ");
  for(var i in words){
    if(words[i].charAt(0) == '#'){
      hashtags.push(words[i]);
    }
  }
  console.log(hashtags);
  return hashtags;
}
