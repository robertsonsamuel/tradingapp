'use strict';

var express = require('express');
var router = express.Router();
let Item = require('../models/itemModel');

router.get('/', (req, res) => {
  Item.find({trade:true}, function  (err, items) {
    if(err) return console.log(err);
    res.render('index', {items: items});   
  });
});

module.exports = router;
