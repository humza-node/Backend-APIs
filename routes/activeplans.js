const ActiveController = require('../controllers/activePlans');
const express = require('express');
const router = express.Router();
router.post('/add-active', ActiveController.addActivePlans);
router.get('/get-activePlans', ActiveController.getActivePlans);
router.put('/update-plans/:activePlanId', ActiveController.updateActivePlans);
router.delete('/delete-active/:activePlanId', ActiveController.deleteActivePlans);
module.exports = router;