const notifyControll = require('../controllers/notification');
const express = require('express');
const router = express.Router();
router.post('/add-notice', notifyControll.getAddNotify);
router.put('/get-update-notice/:notifyId', notifyControll.getUpdate);
router.delete('/delete-notice/:notifyId', notifyControll.deleteNotfication);
router.get('/get-notification', notifyControll.getNotification);
module.exports = router;