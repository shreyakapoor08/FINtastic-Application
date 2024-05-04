// Author -
// Bhargav Kanodiya
let express = require('express');
let router = express.Router();
let {
    getReminders, 
    getReminderbyId, 
    addReminder, 
    updateReminderbyId, 
    deleteReminder } = require('./../controllers/reminderController');
const userAuth = require('../middleware/auth');
router.post('/add',userAuth, addReminder);
router.get('/getall',userAuth, getReminders);
router.get('/get/:reminderId',userAuth, getReminderbyId);
router.put('/update/:reminderId',userAuth, updateReminderbyId);
router.delete('/delete/:reminderId',userAuth, deleteReminder);
module.exports = router;