const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  text: String,
  date: String,
  sum: Number
});

module.exports = Item = mongoose.model('items', itemSchema);
