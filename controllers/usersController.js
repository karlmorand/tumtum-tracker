var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/userModel.js')

router.get('/loggedin/:id', function(req, res) {
    User.findOne({
        linkedInID: req.params.id
    }, function(err, foundUser) {
        if (foundUser === null) {
            User.create({
                linkedInID: req.params.id
            }, function(err, newUser){
                if (err) {
                    console.log(err);
                } else {
                    console.log('User not in DB, created new user');
                };
            });
        }
    });
    res.send('');
});


router.get('/savedJobs/:id', function(req, res) {
    User.findOne({linkedInID:req.params.id}, function(err, foundUser) {
        res.send(foundUser.jobs);
    });
});

router.post('/addjob/:id', function(req, res) {
    var jobExists = false;

    User.findOne({linkedInID:req.params.id}, function(err, foundUser) {
        foundUser.jobs.forEach(function(job) {
            if (job.id === req.body.id) {
                jobExists = true;
            };
        });
        if (jobExists === false) {
            foundUser.jobs.push(req.body);
            foundUser.save();
            res.send('Job Saved!');
        } else {
            res.send('This job is already saved on your list!');
        };
    });
});

router.delete('/deleteSavedJobs/:user_id/:job_id', function(req, res) {
    User.findOne({linkedInID:req.params.user_id}, function(err, foundUser) {
        foundUser.jobs.forEach(function(job, index) {
            if (job.id === req.params.job_id) {
                foundUser.jobs.splice(index, 1);
            };
        });
        foundUser.save();
        res.send('');
    });
});

router.get('/savedGoals/:id', function(req, res) {
    User.findOne({linkedInID:req.params.id}, function(err, foundUser) {
        res.send(foundUser.goals);
    });
});

router.post('/additem/:id', function(req,res){
    User.findOne({linkedInID:req.params.id}, function(err,foundUser){
        foundUser.goals.push(req.body);
        foundUser.save();
        res.send();
    });
});


router.delete('/deletegoal/:user_id/:goal_id', function(req, res){
  User.findOne({linkedInID:req.params.user_id}, function(err, foundUser) {
    var goalIndex = foundUser.goals.findIndex(function(element){
      if (element.id === req.params.goal_id) {
        return true;
      }
    })
    foundUser.goals.splice(goalIndex, 1);
    foundUser.save();
    res.send();
})
})

router.post('/completeitem/:user_id/:goal_id', function(req, res){
  var userUpdate = "";
  User.findOne({linkedInID:req.params.user_id}, function(err, foundUser){
    foundUser.goals.forEach(function(goal){
      if (goal.id == req.params.goal_id) {
        goal.done = !goal.done;
      }
    })
  foundUser.save()
  userUpdate = foundUser.goals;

  User.findOneAndUpdate({linkedInID:req.params.user_id}, {$set:{goals:userUpdate}}, function(err, doc){
    res.send();
  })
  })
  });


  router.post('/edititem/:user_id/:goal_id', function(req, res){
    var newGoals = "";
    User.findOne({linkedInID:req.params.user_id}, function(err, foundUser){
      foundUser.goals.forEach(function(goal){
        if (goal.id == req.params.goal_id) {
          goal.itemTitle = req.body.itemTitle;
          goal.itemNotes = req.body.itemNotes;
        }
      })
    foundUser.save()
    newGoals = foundUser.goals

    User.findOneAndUpdate({linkedInID:req.params.user_id}, {$set:{goals: newGoals}}, function(err, doc){
      res.send();
    })
    })
    });

router.post('/editjobtools/:id', function(req, res){

  User.findOneAndUpdate({linkedInID: req.params.id}, {$set:{jobtools:req.body}}, function(err, doc){
      res.send();
  })
})

router.get('/logout', function(req, res){
  res.send("You've logged out")
})

router.get('/savedJobTools/:id', function(req, res) {
    User.findOne({linkedInID:req.params.id}, function(err, foundUser) {

        res.send(foundUser.jobtools);
    });
});

module.exports = router;
