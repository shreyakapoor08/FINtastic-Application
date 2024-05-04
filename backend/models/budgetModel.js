// Author -
// Jaskaran Singh
const mongoose = require("mongoose");
const { ObjectId}=require("bson");

const budgetSchema = new mongoose.Schema({
  id: Number,
  value: Number,
  label: String,
  userId:{
    type:ObjectId,
    required:true
} 
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
