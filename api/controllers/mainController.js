'use strict';


var mongoose = require('mongoose'),
  Hashtag = mongoose.model('Hashtag');


exports.list_all_posts_with_hashtag = function(req,res){
  Hashtag.find({},function(err,hashtag){
    if(err)
      res.send(err);
    res.json(hashtag);
  });
};

exports.add_post_with_hashtag = function(req,res){
  var new_post_msg = new Hashtag(req.body);
  new_post_msg.save(function(err,hashtag){
      if(err)
        res.send(err);
      res.send(hashtag);
  });
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