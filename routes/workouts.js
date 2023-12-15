const workoutController = require('../controllers/workouts');
const express = require('express');
const router = express.Router();
router.post('/add-workout', workoutController.AddWorkouts);
router.get('/get-workouts', workoutController.getWorkouts);
router.put('/get-updateWork/:workoutId', workoutController.updateWorkouts);
router.delete('/get-deleteWorkout/:workoutId', workoutController.deleteWorkouts);
module.exports = router;