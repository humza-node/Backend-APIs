const PlansController = require('../controllers/plans');
const express = require('express');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
router.post('/add-plans', PlansController.getAddPlans);
router.get('/get-plans', PlansController.getPlans);
router.put('/get-planUpdate/:planId', PlansController.getPlansUpdate);
router.delete('/get-deletePlan',  PlansController.deletePlans);
module.exports = router;