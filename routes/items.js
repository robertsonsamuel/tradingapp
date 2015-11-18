'use strict';

let express = require('express');
let router = express.Router();

let Item = require('../models/itemModel');

router.get('/', (req, res) => {
  Item.find({}, function(err, items){
    res.status(err ? 400 : 200).send(err || items);
  }).populate('items');
});



// router.get('/:id', (req, res) => {
//   Item.findById(req.params.id, function(err, item){
//     res.status(err ? 400 : 200).send(err ? 'item not found' : item);
//   });
// });

router.put('/', (req, res) => {
  Item.findByIdAndUpdate(req.body.id, { $set: req.body }, function(err, item) {
    res.status(err ? 400 : 200).send(err ? 'item update failed' : item);
  });
});

router.delete('/:id', (req, res) => {
  console.log('hit');
  Item.findOne({_id:req.params.id}, function(err, item) {
    if (err){
      console.log(err);
    }else{
      console.log(item);
      item.remove(function (item){
        res.send('done');
      });
    }
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  let item = new Item(req.body);
  item.save( (err, item) => {
    if (err){
      console.log(err);
    }else{
      console.log(item);
      res.send(item._id);
    }
  });
});

module.exports = router;
