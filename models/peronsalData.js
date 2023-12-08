const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personalSchema = new Schema(
    {
imageUrl:
{
    type: String,
    required: true
},
firstname:
{
    type: String,
    required: true
},
lastname:
{
    type: String,
    required: true
},
dateofbirth:
{
    type: Date,
    required: true
},
weight:
{
    type: String,
    required: true
},
height:
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

    }
);
module.exports = mongoose.model("Personal", personalSchema);