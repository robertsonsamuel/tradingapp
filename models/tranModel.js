'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Transaction;

let pendingTrade = new Schema({
  
    forTrade:{type: Schema.Types.ObjectId, ref: 'Item'},
    offered:{type: Schema.Types.ObjectId, ref: 'Item'}
 });


Transaction = mongoose.model('Transaction', pendingTrade);

module.exports = Transaction;
