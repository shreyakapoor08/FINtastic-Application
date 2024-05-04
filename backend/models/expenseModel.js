// Author -
// Bhargav Kanodiya
let mongoose = require("mongoose");
let Schema =mongoose.Schema;
const { ObjectId}=require("bson");
let expenseSchema =new Schema({
    expenseName:{
        type:String,
        required:true
    },
    expenseAmount:{
        type:Number,
        required:true
    },
    expenseType:{
        type:String,
        required:true
    },
    paymentMedium:{
        type:String,
        required:true
    },
    expenseDate:{
        type:Date,
        required:true
    },
    expenseDescription:{
        type:String,
        required:false
    },
    expenseAttachment:{
        type:String,
        required:false
    },
    expenseCategory:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true
    },
    userId:{
        type:ObjectId,
        required:true
    }
})
let expenseModel = mongoose.model("expenses",expenseSchema);
module.exports=expenseModel;