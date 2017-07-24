var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Message = require('./api/models/messageModel'),
  Hashtag = require('./api/models/hashtagModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/messageDB'); 

//Serving static files from the "public" folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/mainRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
