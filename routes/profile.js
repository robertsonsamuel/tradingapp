'use strict';

var express = require('express');
var router = express.Router();
var async = require('async');
var Item = require('../models/itemModel');
var Transaction = require('../models/tranModel');
var authMiddleware = require('../config/auth');
var jwt = require('jwt-simple');
var User = require('../models/userModel');

function getUser(req){
  var token = req.cookies.token;
  var payload = jwt.decode(token, 'secret');
  var userId = payload._id;
  return userId;
}

router.get('/', authMiddleware, function(req, res) {
  var userId = getUser(req);
  User.findById(userId, function  (err , user) {
    if (err) return console.log(err);

    if (user.items.length){
      var opts = [{path:'pending'},{path:'items'}];
      User.populate(user, opts, function (err, obj){
        if (err) return console.log(err);
        console.log('user',obj);
        if (user.pending.length){
          Transaction.populate(obj.pending,'forTrade offered', function (err, trade){
            console.log(trade);
            res.render('profile', {items:obj.items , trans:obj.pending, user:user.username});
          });
        }else{
          res.render('profile', {items:obj.items, trans:{}, user:user.username});
        }
      });

    }else{
    res.render('profile', {items:{} , trans:{}, user:user.username});
    }
  });
});

router.post('/newitem' , function (req ,res) {
  var userId = getUser(req);
  var newItem = new Item(req.body);
  newItem.save(function  (err, item) {
    if(err) return console.log(err);
    User.findById(userId, function (err, current){
      if (err) return console.log(err);
      current.items.push(item._id);
      current.save(function (err){
        res.send(item._id);
      });
    });
  });
});

router.post('/delete', function  (req, res) {
  Item.findByIdAndRemove(req.body._id, function (err, item) {
    if (err) console.log(err);
    res.send();
  })
})

router.put('/newtrade' , function (req ,res) {
  var userId = getUser(req);
  Item.findByIdAndUpdate(req.body._id, {trade:true}, function(err, olditem) {
    if(err) return console.log(err);
    console.log('updated');
    res.send();
  });
});

module.exports = router;
