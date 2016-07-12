var express = require('express');
var app = express();
var Linkedin = require('node-linkedin')('77za1nt3vews0s', 'jWorZ9VYEw5UAuxR', 'http://localhost:3000/linkedin/callback');
// var IN = require('//platform.linkedin.com/in.js');

var linkedin = Linkedin.init('77za1nt3vews0s')


app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('public/index.html')
})

app.get('/linkedin', function(req, res){
  IN.User.authorize(callbackFunction, callbackScope);
});

// app.get('/linkedin/callback', function(req, res){
//   Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results){
//     console.log('State: ' +req.query.state);
//     console.log('Code: '+req.query.code);
//     console.log(results);
//     res.redirect('/loggedin');
//   })

// app.get('/loggedin', function(req, res){
//   linkedin.people.me(function(err, $in){
//     res.send($in)
//   })
// })
//
// })

app.listen(3000, function(){
  console.log('Server up, listening on 3000');
})
