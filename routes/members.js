'use strict';

let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {rooms: {}});
});


// router.put('/', function(req, res) {
//   Room.findById(req.body.roomId, function(err, room){
//     if(err) {
//       console.log(err);
//     }else{
//       Item.findById(req.body.itemId, function(err, item){
//         if(err) return console.log(err.message);
//         if(room.items.indexOf(item._id) !== -1) {
//           res.send('No Duplicates, Sorry');
//           return; 
//         }
//         room.items.push(item._id);
//         room.save(function(err,room){
//           if (err) return console.log(err);
//           console.log(room);
//           res.send(room._id);
//         });
//       });
//     }
//   });
// });


// router.put('/:id', (req, res) => {
//   Room.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, room) {
//     res.status(err ? 400 : 200).send(err ? 'room update failed' : room);
//   });
// // });

// router.delete('/rooms/del:id', (req, res) => {
//   console.log('fired');
//   Room.findByIdAndRemove(req.params.id, function(err, room) {
//     if (err){
//       console.log(err);
//     }else{
//       res.send('deleted');
//     }
//   });
// });

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