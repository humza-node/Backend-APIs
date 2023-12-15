const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema (
    {
        workout:
        {
            type: String,
            required: true
        },
        workoutdescription:
        {
            type: String,
            required: true
        },
        workoutCategory:
        {
            type: String,
            required: true
        },
        workoutImageUrl:
        {
            type: String,
            required: true
        }
    }
);
module.exports = mongoose.model("Workout", workoutSchema);