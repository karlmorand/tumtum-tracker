var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/userModel.js')

router.get('/ghjobs/:url', function(req, res){
  console.log('reqparams url');
  console.log(req.params.url);

    var url = 'https://jobs.github.com/positions.json?' + req.params.url

  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
});

module.exports = router;
