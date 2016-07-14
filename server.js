// require('dotenv').config();

var express = require('express');
var app = express();



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

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log('Server up, listening on 3000');
})
