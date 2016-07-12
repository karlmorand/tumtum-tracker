require('dotenv').config();

var express = require('express');
var app = express();



app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('public/index.html')
})

app.get('/logout', function(req, res){
  Li.IN.User.logout(function(){
    console.log('Logged out');
    res.send('logged out')
  });
})

app.listen(3000, function(){
  console.log('Server up, listening on 3000');
})
