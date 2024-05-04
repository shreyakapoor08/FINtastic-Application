// Author -
// Jaskaran Singh
let mongoose = require("mongoose");
let Schema =mongoose.Schema;
const { ObjectId}=require("bson");
let documentSchema =new Schema({
    documentName:{
        type:String,
        required:true
    },
    s3Path:{
        type:String,
        required:true
    },
    documentType:{
        type:String
    },
    documentUploadDate:{
        type:Date,
        required:true
    },
    documentDescription:{
        type:String
    },
    documentCategory:{
        type:String
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
let documentModel = mongoose.model("documents",documentSchema);
module.exports=documentModel;