var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/userModel.js')

router.get('/ghjobs/:id', function(req, res){

  var url = 'https://jobs.github.com/positions.json?location=' + req.params.id;
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
})

module.exports = router;
