// require('dotenv').config();

var express = require('express');
var app = express();
var jobsController = require('./controllers/jobsController.js');
var mongoose = require('mongoose');
var User = require('./models/userModel.js');
var usersController = require('./controllers/usersController');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tumtum-tracker'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/jobs', jobsController)
app.use('/users', usersController);



app.get('/', function(req,res){
  res.render('public/index.html');
});

app.get('/logout', function(req, res){
  Li.IN.User.logout(function(){
    console.log('Logged out');
    res.send('logged out')
  });
})

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
  console.log('Connected to mongod');
})


app.listen(port, function(){
  console.log('Server up, listening on 3000');
})
