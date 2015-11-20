'use strict';

let express = require('express');
let router = express.Router();
let Transaction = require('../models/tranModel');
let app = express();
let authMiddleware = require('../config/auth');
let jwt = require('jwt-simple');
let async = require('async');
let User = require('../models/userModel');
let Item = require('../models/itemModel');

router.post('/', authMiddleware, (req, res) => {
  var token = req.cookies.token;
  var payload = jwt.decode(token, 'secret');
  var userId = payload._id;
  var id = req.body.forTrade;
  var offer = req.body.offered;
  var trans = new Transaction(req.body);
  trans.save(function(err , transaction){
    if(err) return console.log(err);
    User.findOne({items: id}, function (err, user){
      if (err) return console.log(err);
      console.log(user);
      user.pending.push(transaction._id);
      user.save(function (err){
        if (err) return console.log(err);
      });
    });
    User.findById(userId, function (err, current){
      if (err) return console.log(err);
      current.pending.push(transaction._id);
      current.save(function (err){
        if (err) return console.log(err);
      });
    });
    Item.findByIdAndUpdate(id, {trade:false}, function (err, obj){
      if (err) return console.log(err);
      console.log(obj);
      res.send();
    });
  });
});

router.post('/accept', authMiddleware, (req, res) => {
  Transaction.findById(req.body, function (err, transaction){
    if(err) return console.log(err);
    var forTrade = transaction.forTrade;
    var offered = transaction.offered;
    User.find({pending:req.body._id}, function (err, users) {
      var x = users[0].items.indexOf(forTrade);
      var y = users[1].items.indexOf(offered);
      if (x===-1){
        x = users[0].items.indexOf(offered);
      }
      if (y===-1){
        y=users[1].items.indexOf(forTrade);
      }
      var ref1 = users[0].items.splice(x,1);
      var ref2 = users[1].items.splice(y,1);
      users[0].items.push(ref2);
      users[1].items.push(ref1);
      async.series([
        function (cb){users[0].save(function (err, dude){ if (err) return console.log(err); cb(null, dude)})},
        function (cb){users[1].save(function (err, dude){ if (err) return console.log(err); cb(null, dude)})}
      ], function (err, result){
        if (err) return console.log(err);
        console.log('after', result);
        Transaction.findByIdAndRemove(req.body._id, function (err){
          if (err) return console.log(err);
          res.send('worked');
        })
      });
    });
  });
});

router.post('/cancel', function (req, res){
  Item.findByIdAndUpdate(req.body._id, {trade:false}, function (err, item){
    if (err) return console.log(err)
    res.send();
  })
})

router.post('/decline', function (req, res){
  Transaction.findByIdAndRemove(req.body._id, function (err, trans){
    if(err) return console.log(err)
    res.send();
  });
})

module.exports = router;

 // console.log('before', users);
      // var x = arr1.indexOf(forTrade);
      // var y = arr2.indexOf(offered);
      // if (x===-1){
      //   x = arr1.indexOf(offered);
      // }
      // if (y===-1){
      //   y=arr2.indexOf(forTrade);
      // }
      // var a = arr1[x];
      // arr1[x] = arr2[y];
      // arr2[y] = a;