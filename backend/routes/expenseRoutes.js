// Author -
// Bhargav Kanodiya
let express = require('express');
let router = express.Router();
let {
    getExpenses, 
    getExpensebyId, 
    addExpense, 
    updateExpensebyId, 
    deleteExpense } = require('./../controllers/expenseController');
const userAuth = require('../middleware/auth');
router.post('/add',userAuth, addExpense);
router.get('/getall',userAuth, getExpenses);
router.get('/get/:expenseId',userAuth, getExpensebyId);
router.put('/update/:expenseId',userAuth, updateExpensebyId);
router.delete('/delete/:expenseId',userAuth, deleteExpense);
module.exports = router;