const QuestionController = require('../controllers/questions');
const express = require('express');
const router = express.Router();
router.post('/get-adds', QuestionController.getAdd);
router.get('/get-questions', QuestionController.getQuestions);
router.put('/get-update/:questionId', QuestionController.updateQuestion);
router.delete('/get-del/:questionId', QuestionController.deleteQuestion);
router.get('/get-questions/:questionId', QuestionController.getQuestion);
module.exports=router;