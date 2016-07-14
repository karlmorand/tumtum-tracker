var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/userModel.js')

router.get('/loggedin/:id', function(req, res){
  User.find(req.params.id, function(err, foundUser){
    if (!foundUser) {
      User.create({linkedInID : req.params.id}, function(err, newUser){
        if (err) {
          console.log(err);
        } else {
          console.log('User not in DB, created new user with id: ' + newUser);
          res.send(newUser);
        }
      })
    } else {
      // console.log('Found user in DB, id: ' + foundUser);
      res.send(foundUser)
    }
  })
})

router.post('/addjob/:id', function(req, res){
  console.log(req.params.id);
  User.find(req.params.id, function(err, foundUser){
    foundUser[0].jobs.push(req.body);
    foundUser[0].save();
    console.log(foundUser[0]);
  })
})

module.exports = router;
