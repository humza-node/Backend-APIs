const Review = require('../models/reviews');
const Workout = require('../models/workout');
const User = require('../models/user');
const Personal = require('../models/peronsalData');
const Plan = require('../models/plans');
exports.getAddReview = async(req, res, next) =>
{
    const reviewName = req.body.reviewName;
    const reviewRating = req.body.reviewRating;
    const reviewText = req.body.reviewText;
    const userId = req.body.userId;
    const planId = req.body.planId;
    const workoutId = req.body.workoutId;
const personals = await Personal.find({users: userId});
const person_image = (await personals).map(person =>person.imageUrl);
const user = await User.findById(userId);
const plan = await Plan.findById(planId);
const workout = await Workout.findById(workoutId);
const reviews = new Review(
    {
        reviewName: reviewName,
        reviewRating: reviewRating,
        reviewText: reviewText,
        reviewImage: person_image.length > 0 ? person_image[0] : null,
        users: [user._id],
        plans: [plan._id],
        workouts: [workout._id],
    }
);
const results = await reviews.save();
res.status(200).json({message: "Review Saved", results});
};
exports.getReviews = async(req, res, next) =>
{
    const results = await Review.find();
    res.status(200).json({message: "Reviews Fetched", results});
};
exports.updateReview = async(req, res, next) =>
{
    const reviewId = req.params.reviewId;
    const reviewName = req.body.reviewName;
    const reviewRating = req.body.reviewRating;
    const reviewText = req.body.reviewText;
    const userId = req.body.userId;
    const planId = req.body.planId;
    const workoutId = req.body.workoutId;
    const personals = await Personal.find({users: userId});
    const person_image = (await personals).map(person =>person.imageUrl);
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);
    const workout = await Workout.findById(workoutId);
  Review.findById(reviewId).then(reviews =>
    {
        if(!reviews)
        {
            const error = new Error("Review Not Found");
            error.statusCode = 404;
            throw error;
        }
        reviews.reviewName = reviewName;
        reviews.reviewRating = reviewRating;
        reviews.reviewText = reviewText;
        reviews.reviewImage = person_image.length > 0 ? person_image[0] : null;
        reviews.users = [user._id];
        reviews.plans = [plan._id];
        reviews.workouts = [workout._id];
        return reviews.save();
    }).then(result =>
        {
            res.status(200).json({message: "Review Update", result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                next(err);
            });

};
exports.deleteReview = async(req, res, next) =>
{
    const reviewId = req.params.reviewId;
    Review.findById(reviewId).then(reviews =>
        {
            if(!reviews)
            {
                const error = new Error("Review not Found");
                error.statusCode=404;
                throw error;
            }
        return Review.findByIdAndDelete(reviewId);
        }).then(results  =>
            {
                res.status(200).json({message: "Reviews Deleted", results});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                    next(err);
                });
};
