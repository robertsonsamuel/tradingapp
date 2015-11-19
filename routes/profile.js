'use strict';

var express = require('express');
var router = express.Router();
var async = require('async');
var Item = require('../models/itemModel');
var Transaction = require('../models/tranModel');

router.get('/', function(req, res) {

  async.series([
    function(callback){
      Item.find({}, function(err, item) {
        if (err) return console.log(err);
        callback(null, item);
      });
    }, 
    function (callback){
      Transaction.find({}, function  (err , trans) {
        if (err) return console.log(err);
        }).populate('forTrade', function (err, obj){
            if (err) return console.log(err);
            callback(null,obj);
          });
    }],
    function (err, result) {
     // console.log(result);
      res.render('profile', {items: result[0], trans:result[1]});
    });
});



router.post('/newitem' , function (req ,res) {
  var newItem = new Item(req.body);
  newItem.save(function  (err, item) {
    if(err) return console.log(err);
    res.send(item._id);
  });
});




router.put('/newtrade' , function (req ,res) {
  Item.findByIdAndUpdate(req.body._id, {trade:true}, function(err, olditem) {
    if(err) return console.log(err);
    console.log('updated');
  });
  var trans = new Transaction({forTrade: req.body._id});
  trans.save(function(err , transaction){
    if(err) return console.log(err);
    transaction.populate('forTrade', function (err, obj){
      if (err) return console.log(err);
      res.send(obj);
    })
  });
  

});

module.exports = router;
