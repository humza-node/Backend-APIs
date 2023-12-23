const PlansController = require('../controllers/plans');
const express = require('express');

const router = express.Router();
router.post('/add-plans', PlansController.getAddPlans);
router.get('/get-plans', PlansController.getPlans);
router.put('/get-planUpdate/:planId', PlansController.getPlansUpdate);
router.delete('/get-deletePlan/:planId',  PlansController.deletePlans);
router.post('/postPlan',PlansController.postPlan);
router.post('/delete-plans',PlansController.deletePlansCart);
router.get('/get-plans/:planId', PlansController.getSinglePlan);

module.exports = router;