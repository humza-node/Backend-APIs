const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notifySchema = new Schema(
    {
notifymessage:
{
    type: String,
    required: true
},
notifyDuration:
 {
    type: Date,
    required: true
 },
 plans: [
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Plans'
    }
 ],
users:[
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
]

    }
);
module.exports=mongoose.model("Notification", notifySchema);