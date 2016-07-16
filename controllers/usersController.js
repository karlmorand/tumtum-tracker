var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/userModel.js')

router.get('/loggedin/:id', function(req, res){
  User.find(req.params.id, function(err, foundUser){
    if (foundUser.length === 0) {
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
  });
});

router.get('/savedJobs/:id', function(req,res){
  User.find(req.params.id, function(err, foundUser){
    res.send(foundUser[0].jobs);
  });
});

router.post('/addjob/:id', function(req, res){
  var jobExists = false;

  User.find(req.params.id, function(err, foundUser){
    foundUser[0].jobs.forEach(function(job){
      if(job.id === req.body.id){
        jobExists = true;
      };
    });
    if(jobExists === false){
      foundUser[0].jobs.push(req.body);
      foundUser[0].save();
      res.send('');
    } else {
      res.send('This job is already saved on your list!');
    }; 
  });
});

router.delete('/deleteSavedJobs/:user_id/:job_id', function(req,res){
  User.find(req.params.user_id, function(err, foundUser){
    foundUser[0].jobs.forEach(function(job, index){
      if(job.id === req.params.job_id){
        foundUser[0].jobs.splice(index, 1);
      };
    });
    foundUser[0].save();
    res.send('');
  });
});

module.exports = router;
