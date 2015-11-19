'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

router.post('/', function  (req,res) {
  var user = new User(req.body);
  user.save(function  (err) {
    if(err) {
      res.status(400).send();
    }
    res.send();
  });
});

router.get('/', function(req, res) {
  res.render("register");
});

module.exports = router;
