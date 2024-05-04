// Author -
// Bhargav Kanodiya
const reminderModel = require("./../models/reminderModel");
const { ObjectId } = require("bson");
const addReminder =async(req,res)=>{
    try{
        const {reminderName,date,expenseCategory,expenseType,isReoccuring,duration}=req.body;
        const userId=req.user.userId;
        if(isReoccuring && !duration){
            throw new Error("Please Provide duration of occurance!");
        }
        let reminderObj = new reminderModel({
            reminderName,
            date,
            expenseType,
            expenseCategory,
            isReoccuring,
            duration,
            isDeleted:false,
            userId
        })
        let resObj = await reminderObj.save();
        return res.status(200).send({
            details: resObj,
            message: 'Reminder Created successfully!',
            isSuccess: true
        })
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const getReminders =async(req,res)=>{
    try {
        const userId = req.user.userId;
        let userReminders = await reminderModel.find({ userId,isDeleted:false });
        if (userReminders.length != 0) {
            return res.status(200).send({
                isSuccess: true,
                message: 'your all reminders are retrived',
                reminders: userReminders
            })
        } else {
            return res.status(200).send({
                isSuccess: true,
                message: 'You do not have any reminders',
                reminders: userReminders
            })
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const getReminderbyId =async(req,res)=>{
    try{
        let reminderId=req.params.reminderId;
        const userId = req.user.userId;
        let reminderUser= await reminderModel.findOne({_id:reminderId,userId,isDeleted:false});
        if(reminderUser){
            return res.status(200).send({
                isSuccess: true,
                message: 'Reminder retrived',
                reminder: reminderUser
            })
        } else {
            return res.status(403).send({
                isSuccess:false,
                message:'Wrong reminderId or you do not have access to the reminder'
            })
        }
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const updateReminderbyId=async(req,res)=>{
    try{
        let reminderId=req.params.reminderId;
        const {reminderName,date,expenseCategory,expenseType,isReoccuring,duration}=req.body;
        const userId = req.user.userId;
        if(isReoccuring && !duration){
            throw new Error("Please Provide duration of occurance!");
        }
        let updatedObject = {
            reminderName,
            date,
            expenseType,
            expenseCategory,
            isReoccuring,
            duration,
            isDeleted:false
        }
        let updatedReminder= await reminderModel.findOneAndUpdate({_id:reminderId,userId},updatedObject,{ new: true } );
        if(!updatedReminder){
            return res.status(403).send({
                isSuccess:false,
                message:'Wrong reminderId or you do not have access to the reminder'
            })
        } else {
            return res.status(200).send({
                isSuccess:true,
                message:'Reminder updated successfully!',
                updatedReminder
            })
        }
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const deleteReminder=async(req,res)=>{
    try{
        let reminderId = req.params.reminderId;
        const userId = req.user.userId;
        let deletedReminder = await reminderModel.findOneAndUpdate({_id:reminderId,userId},{isDeleted:true});
        if(deletedReminder){
            return res.status(200).send({
                isSuccess:true,
                message:'Reminder deleted successfully!'
            })
        } else {
            return res.status(403).send({
                isSuccess:false,
                message:'Wrong reminderId or you do not have access to the reminder'
            })
        }
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
module.exports={addReminder,getReminders,getReminderbyId,updateReminderbyId,deleteReminder}