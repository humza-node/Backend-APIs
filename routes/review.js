const ReviewControll = require('../controllers/review');
const express = require('express');
const router = express.Router();
router.post('/add-review', ReviewControll.getAddReview);
router.get('/get-Reviews', ReviewControll.getReviews);
router.put('/update-reviews/:reviewId', ReviewControll.updateReview);
router.delete('/delete-reviews/:reviewId', ReviewControll.deleteReview);
module.exports=router;