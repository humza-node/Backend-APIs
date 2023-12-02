const express = require('express');
const { body } = require('express-validator');
const studentController = require('../controllers/students');


const router = express.Router();


router.post('/student', studentController.createStudent);

router.get('/students', studentController.getStudents);

router.put('/student/:studentId', studentController.updateStudents);

router.delete('/student/:studentId', studentController.deleteStudent);
router.get('/students/:studentId', studentController.getStudent);

module.exports = router;