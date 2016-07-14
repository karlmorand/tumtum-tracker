// require('dotenv').config();

var express = require('express');
var app = express();
var jobsController = require('./controllers/jobsController.js')
var mongoose = require('mongoose');


var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forum-project'


app.use('/jobs', jobsController)
app.use(express.static('public'));

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

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log('Server up, listening on 3000');
})
