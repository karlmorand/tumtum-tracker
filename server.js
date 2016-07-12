var express = require('express');
var app = express();
var linkedIn = require('./public/js/linkedin.js')


app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('public/index.html')
})


app.listen(3000, function(){
  console.log('Server up, listening on 3000');
})
