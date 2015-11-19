'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render("index", {rooms:{}});
});

// router.delete('/:id', (req, res) => {
//   console.log('fired');
//   roomModel.findByIdAndRemove(req.params.id, function(err, room) {
//     if (err){
//       console.log(err);
//     }else{
//       res.send('deleted');
//     }
//   });
// });

module.exports = router;
