'use strict';


var mongoose = require('mongoose'),
  Hashtag = mongoose.model('Hashtag'),
  postMessageModel = mongoose.model('PostMessage');


exports.list_all_posts = function(req,res){
  Hashtag.find({},function(err,hashtag){
    if(err)
      res.send(err);
    res.send(hashtag);
  });
}

exports.list_all_posts_with_hashtag = function(req,res){
  var searchQuery = '#'+req.params.hashtag;
  console.log(searchQuery);
  Hashtag.find({hashtags : searchQuery},function(err,hashtag){
    if(err)
      res.send(err);
      console.log(hashtag);
    res.send(hashtag);
  });
};

exports.add_post_with_hashtag = function(req,res){
  var postMsg = req.body.postMessage;
  var containsHashtag = checkForHashtags(postMsg);
  if(containsHashtag){
      var new_post_msg = new Hashtag({post : postMsg, hashtags : extractHashtags(postMsg)});
      console.log(new_post_msg);
      new_post_msg.save(function(err){
        if(err)
          res.send(err);
        res.send(new_post_msg);
      });
  }
  // res.send('');
};



exports.delete_hashtag = function(req,res) {
  Hashtag.remove({
     _id:req.params.postId
   }, function(err,hashtag){
     if (err)
      res.send(err);
    res.json({ message: 'Post successfully deleted' });
  });
};


function checkForHashtags(postMsg){
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


// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };