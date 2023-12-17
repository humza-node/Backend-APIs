const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diarySchema = new Schema(
    {
    calendarDate:
    {
        type: Date,
        required: false
    },
    moodRate:
    {
        type: Number,
        min:1,
        max: 10,
        required: false
    },
reminders: {type: String},
    deepSleep:
    {
        type: Date, 
        required: false
    },
    lightSleep:
    {
        type: Date,
        required: false
    },
    bedtime:
    {
        type: Date,
        required: false
    },
    wakeuptime:
    {
        type: Date,
        required: false
    },
    sleepGoals:
    {
        type: String,
        required: false
    },

    remaining:
    {
        type: String,
        required: false
    },
    intake:
    {
        type: String,
        required: false
    },
    target:[
    {
        type: Number,
        required: false
    }],

sounds:[
{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Sounds'
}],
users: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
]
    }
);
module.exports = mongoose.model("Dairy", diarySchema);