const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const planSchema = new Schema (
    {
        planName:{
            type: String,
            required: true
        },
        planDescription:
        {
            type: String,
            required: true
        },
        planDuration:
        {
            type: String,
            required: true
        },
        WeeklyDays:
        {
            type: String,
            required: true
        },
        WeeklyGoals:{
            type: String,
            required: true
        },
        planImageUrl:
        {
            type: String,
            required: true
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        ]
    }
);
module.exports = mongoose.model("Plans", planSchema);