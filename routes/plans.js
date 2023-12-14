const PlansController = require('../controllers/plans');
const express = require('express');

const router = express.Router();
router.post('/add-plans', PlansController.getAddPlans);
router.get('/get-plans', PlansController.getPlans);
router.put('/get-planUpdate/:planId', PlansController.getPlansUpdate);
router.delete('/get-deletePlan',  PlansController.deletePlans);
router.post('/postPlan',PlansController.postPlan);
router.post('/delete-plans',PlansController.deletePlans);
module.exports = router;