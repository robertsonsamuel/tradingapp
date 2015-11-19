'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');


/* Handle Login POST */
  router.post('/', passport.authenticate('local', {
    successRedirect: '/members',
    failureRedirect: '/login',
  }));
 

router.get('/', function(req, res) {
  res.render("Login");
});


module.exports = router;
