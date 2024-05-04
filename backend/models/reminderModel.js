// Author -
// Bhargav Kanodiya
let mongoose = require("mongoose");
let Schema =mongoose.Schema;
const { ObjectId}=require("bson");
const { trusted } = require("mongoose");
let reminderSchema =new Schema({
    reminderName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    expenseType:{
        type:String,
        required:true
    },
    expenseCategory:{
        type:String,
        required:true
    },
    isReoccuring:{
        type:Boolean,
        required:true
    },
    duration:{
        type:String,
        required:false
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
let reminderModel = mongoose.model("reminders",reminderSchema);
module.exports=reminderModel;