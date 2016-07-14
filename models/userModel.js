var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  linkedInID : String,
  goals : [],
  jobs : [],
  companies : [],
  resumeLink : String,
  brandStatement : String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;
