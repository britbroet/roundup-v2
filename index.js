var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var http = require('http').Server(app);
var User = require('./models/user');
var secret = "mysupersecretpassword";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/roundup');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));


app.use('/api/auth', require('./controllers/auth'), expressJWT({secret: secret}).unless({method: 'POST'}));
app.use('/api/users', require('./controllers/users'), expressJWT({secret: secret}).unless({method: 'POST'}));
app.use('/api/candidates', require('./controllers/candidates'), expressJWT({secret: secret}));
app.use('/api/questions', require('./controllers/questions'), expressJWT({secret: secret}));
app.use('/api/positions', require('./controllers/positions'), expressJWT({secret: secret}));
app.use('/api/rounds', require('./controllers/rounds'), expressJWT({secret: secret}));


app.use(function (err, req, res, next) {
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.get('/*', function(req, res) {
  console.log("sending index");
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3000)


