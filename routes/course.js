const express = require('express');
const CourseController = require('../controllers/course');
const router = express.Router();

router.post('/course', CourseController.getAddCourse);
router.get('/getCourses', CourseController.getCourses);
router.put('/course/:courseId', CourseController.updateCourse);
router.delete('/courses/:courseId', CourseController.deleteCourse);
module.exports = router;