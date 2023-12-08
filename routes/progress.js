const ProgressControl = require('../controllers/progress');
const express = require('express');
const router = express.Router();
router.post('/add-progress',ProgressControl.getAddProgress);
router.get('/get-progress', ProgressControl.getProgress);
router.delete('/delete-progress/:progressId',ProgressControl.deleteProgress);
router.put('/update-progress/:progressId', ProgressControl.updateProgress);
router.get('/getProgress/:progressId',ProgressControl.getSingleProgress);
module.exports=router;