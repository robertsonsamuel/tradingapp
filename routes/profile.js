'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/itemModel');
var Transaction = require('../models/tranModel');

router.get('/', function(req, res) {
  Item.find({}, function  (err, item) {
    if (err) return console.log(err);
    res.render('profile' , {items: item});
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
  var flag1;
  Item.findByIdAndUpdate(req.body._id, {trade:true}, function(err, olditem) {
    if(err) return console.log(err);
    flag1 = olditem;
  });
  var trans = new Transaction({forTrade: req.body._id});
  trans.save(function(err , transaction) {
    if(err) return console.log(err);
    res.send(transaction._id);
  });
  

});

module.exports = router;
