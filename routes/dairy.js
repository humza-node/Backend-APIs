const DairyController = require('../controllers/dairy');
const express = require('express');
const router = express.Router();
router.post('/create-dairy', DairyController.CreateDairy);
router.get('/get-dairy', DairyController.getDairy);
router.delete('/delete-dairy/:dairyId', DairyController.deleteDairy);
router.put('/update-dairy/:dairyId',DairyController.UpdateDairy);
router.get('/get-OneDairy/:dairyId',DairyController.getOneDairy);
module.exports = router;
