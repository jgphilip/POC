'use strict';
module.exports = function(app) {
  var mainController = require('../controllers/mainController');


  // todoList Routes
  // app.route('/tasks')
  //   .get(todoList.list_all_tasks)
  //   .post(todoList.create_a_task);


  
  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);

  app.route('/hashtag')
    .get(mainController.list_all_posts_with_hashtag)  
    .post(mainController.add_post_with_hashtag);

  app.route('/hashtag/:postId')
    .delete(mainController.delete_hashtag);


    app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
};