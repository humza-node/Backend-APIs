const trainController = require('../controllers/trainer');
const express = require('express');
const router = express.Router();
router.post('/add-trainer', trainController.getAddTrainer);
router.get('/get-trainers', trainController.getTrainers);
router.put('/update-trainers/:trainerId', trainController.updateTrainer);
router.delete('/delete-plans/:trainerId', trainController.DeleteTrainer);
module.exports = router;