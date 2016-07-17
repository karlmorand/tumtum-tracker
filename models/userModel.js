var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  linkedInID : String,
  goals : [],
  jobs : [],
  companies : [],
  jobtools: {},
});

var User = mongoose.model('User', userSchema);

module.exports = User;
