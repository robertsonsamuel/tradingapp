'use strict';

let express = require('express');
let router = express.Router();
let Items = require('../models/itemModel');
let app = express();
let authMiddleware = require('../config/auth');
let jwt = require('jwt-simple');
let async = require('async');
let User = require('../models/userModel');

router.get('/', authMiddleware, (req, res) => {
  var token = req.cookies.token;
  var payload = jwt.decode(token, 'secret');
  var userId = payload._id;
  console.log(userId);
  async.series([
    function (cb){
      User.findById(userId).lean().populate('items').exec(function (err, user){
        if (err) return console.log(err);
        cb(null, user.items);
      });
    },
    function (cb){
      Items.find({trade:true}, function (err, items) {
        if(err) return console.log(err);
        cb(null, items)
      }); 
    }], function (err, results){
      console.log(results);
      res.render('main', {items: results[0], trade:results[1]});   
    });  
});


module.exports = router;
