'use strict';

var User = require('../models/userModel');
var jwt = require('jwt-simple');

module.exports = function(req, res, next){
  var token = req.cookies.token;

  try {
    var payload = jwt.decode(token, 'secret');
  }
  catch(err){
    console.log('error caught:', err);
    return res.status(401).send('Authentication required.');
  }

  var userId = payload._id;

  User.findById(userId, function(err, user){
    if(err || !user) return res.status(401).send(err || 'Authentication required.');
    next();
  });
};