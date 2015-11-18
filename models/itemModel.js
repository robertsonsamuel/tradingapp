'use strict';

let mongoose = require('mongoose');

let Item;

let itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: new Date() }
 });

itemSchema.pre('remove', function (next){
  console.log('yay middleware');
  this.model('Room').update({}, {$pull:{items: this._id }}, next);
});

Item = mongoose.model('Item', itemSchema);

module.exports = Item;
