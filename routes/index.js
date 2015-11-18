'use strict';

var express = require('express');
var router = express.Router();
var roomModel = require('../models/roomModel')

router.get('/', function(req, res) {
  roomModel.find({}, function (err, rooms){
    if (err) {
      console.log(err);
    }else{
      res.render("index", {rooms: rooms});
    }
  })
});

router.delete('/:id', (req, res) => {
  console.log('fired');
  roomModel.findByIdAndRemove(req.params.id, function(err, room) {
    if (err){
      console.log(err);
    }else{
      res.send('deleted');
    }
  });
});

module.exports = router;
