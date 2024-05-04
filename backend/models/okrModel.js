// Author -
// Ramandeep Kaur
const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  timeframe: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Objective', objectiveSchema);