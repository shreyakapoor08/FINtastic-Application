// Author - 
// Shreya Kapoor

let mongoose = require("mongoose");
let Schema =mongoose.Schema;
const { ObjectId} = require("bson");

// Defining the schema for subscription data
let subscriptionSchema =new Schema({
    planId: {
        type: String,
        required: true
    },
    planType: {
        type: String,
        required: true
    },
    planStartDate: {
        type:Date,
        required:true
    },
    planEndDate: {
        type:Date,
        required:true
    },
    planDuration: {
        type:Number,
        required:true
    }, 
    userId:{
        type:ObjectId,
        required:true
    }
})
let subscriptionModel = mongoose.model("subscription",subscriptionSchema);
module.exports=subscriptionModel;