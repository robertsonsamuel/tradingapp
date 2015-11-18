'use strict';

let mongoose = require('mongoose');

let Item;

let itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  trade: {type: Boolean, default:false}
 });


Item = mongoose.model('Item', itemSchema);

module.exports = Item;
