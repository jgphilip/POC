'use strict';
module.exports = function(app) {
  var mainController = require('../controllers/mainController');

  app.route('/post/:hashtag')
    .get(mainController.list_all_posts_with_hashtag)  

  app.route('/post')
    .get(mainController.list_all_posts)  
    .post(mainController.add_post_with_hashtag);

  app.route('/post/:postId')
    .delete(mainController.delete_hashtag);

  app.route('/apiai')
    .get(mainController.request_help_from_apiai);

    app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
};