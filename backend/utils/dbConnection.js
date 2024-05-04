const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.MongoURL;
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'fintastic'
        });
        console.log("DB Connected!");
    } catch(err){
        console.log("Error:",err.message);
        process.exit(1);
    }
}
module.exports=connectDB;