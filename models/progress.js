const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const progressSchema = new Schema({
currentDate:
{
    type: Date,
    default: Date.now
},
kcalinfo:
{
    type: Number,
    required: true
},
targetKcal:
{
    type: Number,
    required: true
},
burnKcal:
{
    type: Number,
    required: true
},
dailyGoals:
{
    type: String,
    required: true
},
waterlevel:
{
    type: String,
    required: true
},
runningPoints:
{
    type: Number,
    required: true
},
heartPoints:
{
    type: Number,
    required: true
},
sleepProgress:
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
]
});
module.exports=mongoose.model("Progress", progressSchema);