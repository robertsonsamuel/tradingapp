'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Room;

let roomSchema = Schema({
  roomName: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
 });

Room = mongoose.model('Room', roomSchema);

module.exports = Room;
