// Author -
// Bhargav Kanodiya
const expenseModel = require("./../models/expenseModel");
const { ObjectId } = require("bson");
const addExpense = async (req, res) => {
    try {
        const { expenseName, expenseType, expenseAmount, paymentMedium, expenseDate, expenseCategory } = req.body;
        const userId = req.user.userId;
        let expenseAttachment, expenseDescription;
        if (req.body.expenseAttachment) {
            expenseAttachment = req.body.expenseAttachment
        }
        if (req.body.expenseDescription) {
            expenseDescription = req.body.expenseDescription
        }
        let expsnesObj = new expenseModel({
            expenseName,
            expenseAmount,
            expenseType,
            paymentMedium,
            expenseDate,
            expenseDescription,
            expenseAttachment,
            expenseCategory,
            isDeleted:false,
            userId
        })
        let resObj = await expsnesObj.save();
        return res.status(200).send({
            details: resObj,
            message: 'Expense Added successfully!',
            isSuccess: true
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const getExpenses = async (req, res) => {
    try {
        const userId = req.user.userId;
        let userExpenses = await expenseModel.find({ userId,isDeleted:false });
        if (userExpenses.length != 0) {
            return res.status(200).send({
                isSuccess: true,
                message: 'your all expenses retrived',
                expenses: userExpenses
            })
        } else {
            return res.status(200).send({
                isSuccess: true,
                message: 'You do not have any expenses',
                expenses: userExpenses
            })
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const getExpensebyId = async(req,res) => {
    try{
        let expenseId=req.params.expenseId;
        const userId = req.user.userId;
        let expenseUser= await expenseModel.findOne({_id:expenseId,userId,isDeleted:false});
        if(expenseUser){
            return res.status(200).send({
                isSuccess: true,
                message: 'Expense retrived',
                expense: expenseUser
            })
        } else {
            return res.status(403).send({
                isSuccess:false,
                message:'Wrong expenseId or you do not have access to the expense'
            })
        }
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const updateExpensebyId = async(req,res) => {
    try{
        let expenseId=req.params.expenseId;
        const { expenseName, expenseType, expenseAmount, paymentMedium, expenseDate, expenseCategory } = req.body;
        const userId = req.user.userId;
        let expenseAttachment, expenseDescription;
        if (req.body.expenseAttachment) {
            expenseAttachment = req.body.expenseAttachment
        }
        if (req.body.expenseDescription) {
            expenseDescription = req.body.expenseDescription
        }
        let updatedObject = {
            expenseName,
            expenseAmount,
            expenseType,
            paymentMedium,
            expenseDate,
            expenseDescription,
            expenseAttachment,
            expenseCategory,
            isDeleted:false,
        }
        let updatedExpense= await expenseModel.findOneAndUpdate({_id:expenseId,userId},updatedObject,{ new: true } );
        if(!updatedExpense){
            return res.status(403).send({
                isSuccess:false,
                message:'Wrong expenseId or you do not have access to the expense'
            })
        } else {
            return res.status(200).send({
                isSuccess:true,
                message:'Expense updated successfully!',
                updatedExpense
            })
        }
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
const deleteExpense = async(req,res) => {
    try{
        let expenseId = req.params.expenseId;
        const userId = req.user.userId;
        let deletedExpense = await expenseModel.findOneAndUpdate({_id:expenseId,userId},{isDeleted:true});
        if(deletedExpense){
            return res.status(200).send({
                isSuccess:true,
                message:'expense deleted successfully!'
            })
        } else {
            return res.status(403).send({
                isSuccess:false,
                message:'Wrong expenseId or you do not have access to the expense'
            })
        }
    } catch(err){
        return res.status(500).send({
            message: err.message,
            isSuccess: false
        })
    }
}
module.exports = {
    addExpense,
    getExpenses,
    getExpensebyId,
    updateExpensebyId,
    deleteExpense
}