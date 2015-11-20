'use strict';

let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let app = express();
let authMiddleware = require('../config/auth');
let jwt = require('jwt-simple');


router.get('/', authMiddleware, (req, res) => {
  var token = req.cookies.token;
  var payload = jwt.decode(token, 'secret');
  var userId = payload._id;
  console.log(userId);
  
  function (cb){
    User.findById(userId).lean().populate('items').exec(function (err, user){
      if (err) return console.log(err);
      console.log(user);
      cb(null, user.items);
    });
  }
  Item.find({trade:true}, function  (err, items) {
    if(err) return console.log(err);
    res.render('main', {items: items});   
  });
});

// router.post('/', (req, res) => {
//   let room = new Room(req.body);
//   room.save( (err, room)=>{
//     if (err){
//       console.log(err);
//       // res.send('error');
//     }else{
//       res.send(room._id);
//     }
//   });
// });

module.exports = router;
