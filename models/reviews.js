const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
    {
        reviewName:
        {
            type: String,
            required: true
        },
        reviewRating:
        {
            type: Number,
            required: true
        },
        reviewText:
        {
            type: String,
            required: true
        },
        reviewImage:
        {
            type: String,
            required: true
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        plans:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Plans',
                required: false
            }
        ],
        workouts:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Workout',
                required: false
            }
        ]
    }
);
module.exports = mongoose.model("Reviews",reviewSchema);