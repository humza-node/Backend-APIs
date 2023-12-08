const RemindControl = require('../controllers/reminder');
const express = require('express');
const router = express.Router();
router.post('/add-reminder', RemindControl.addReminder);
router.get('/getReminders', RemindControl.getReminders);
router.put('/update-reminders/:reminderId', RemindControl.updateReminders);
router.delete('/delete-rem/:reminderId', RemindControl.deleteReminder);
module.exports = router;