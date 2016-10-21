'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* Article Schema
*/

var FlowerSchema = new Schema({
  name: {
    type: String,
    required: 'Title of flower cannot be blank'
  },
  price: {
    type: Number,
  },
  picSrc: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model('Flower', FlowerSchema);
