'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');

router.post('/register', function  (req,res) {
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});

router.get('/register', function(req, res) {
  res.render("register");
});

router.post('/login', function (req, res){
  User.authenticate(req.body, function(err, user){
    if(err || !user) {
      res.status(400).send(err);
    } else {
      var token = user.token();
      console.log('token:', token);
      res.cookie('token', token);
      res.send(user);
    }
  });
});

router.get('/logout', function(req, res){
  res.clearCookie('token');
  res.clearCookie('userId');
  res.send();
});

router.get('/login', function(req, res) {
  res.render("Login");
});


module.exports = router;
