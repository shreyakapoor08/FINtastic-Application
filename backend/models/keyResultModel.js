// Author -
// Ramandeep Kaur
const mongoose = require('mongoose');

const keyResultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  objective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Objective',
    required: true
  }
});

module.exports = mongoose.model('KeyResult', keyResultSchema);
