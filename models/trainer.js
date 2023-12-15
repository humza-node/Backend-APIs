const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trainSchema = new Schema(
    {
        trainerName:
        {
            type: String,
            required: true
        },
        trainerDescription:
        {
            type: String,
            required: true,
        },
        trainerExperience:
        {
            type: String,
            required: true
        },
        trainerRating:
        {
            type: Number,
            required: true
        },
        trainImage:
        {
            type: String,
            required: true
        },
        plans:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Plans',
                required: true
            }
        ],
        workouts: 
        [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Workout'
            }
        ]
    }
);
module.exports = mongoose.model("Trainer", trainSchema);