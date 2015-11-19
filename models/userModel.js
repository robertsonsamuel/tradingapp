'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User;

let roomSchema =  new Schema({
  username: { type: String, required: true, unique: true },
  password:{type:String, required:false},
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  pending:{type:Schema.Types.ObjectId, ref: 'Transaction'}
 });

User = mongoose.model('User', roomSchema);

module.exports = User;
