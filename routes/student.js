const express = require('express');
const { body } = require('express-validator');
const studentController = require('../controllers/students');
const objectControl = require('../controllers/objects');


const router = express.Router();

router.post('/addObject', objectControl.addObject);
router.put('/updateObject/:objectId',objectControl.updateObject);
router.get('/get-objects', objectControl.getObjects);

router.post('/student', studentController.createStudent);

router.get('/students', studentController.getStudents);

router.put('/student/:studentId', studentController.updateStudents);

router.delete('/student/:studentId', studentController.deleteStudent);
router.get('/students/:studentId', studentController.getStudent);

module.exports = router;




