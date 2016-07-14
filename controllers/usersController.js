var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/userModel.js')

router.get('/loggedin/:id', function(req, res){
  console.log('req.params.id = ' + req.params.id);
  User.find(req.params.id, function(err, foundUser){
    console.log('foundUser = ' + foundUser);
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
      console.log('Found user in DB, id: ' + foundUser);
      res.send(foundUser)
    }
  })
})

router.post('/addjob/:id', function(req, res){
  console.log('req.body: ' + req.body);
  User.find(req.params.id, function(err, foundUser){
    var jobAlreadyAdded = false;
    foundUser.jobs.forEach(function(job){
      if (job.id === req.body.id) {
        jobAlreadyAdded = true;
      }
    })
    if (jobAlreadyAdded) {
      //Job already in DB
      console.log('Job already in DB');
    } else {
      console.log('New job, adding: ' + req.body);
        foundUser.jobs.push(req.body)
    }
  })
})

module.exports = router;
