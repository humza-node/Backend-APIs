const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema(
    {
firstname: 
{
    type: String,
    required: true,
},
lastname:
{
    type: String,
    required: true,
},
gender:
{
    type: String,
    required: true
},
age: {
    type: Number,
    required: true,
},
weight: 
{
    type: Number,
    required: true,
},
fitnesslevel:
{
    type: String,
    required: true
},
focusarea:
{
type: String,
required: true
},
InjuryHealthIssue:
{
    type: String,
    required: true
},
exerciseEquipments:
{
    type: String,
    required: true
},
dietaryRequirements:
{
    type: String,
    required: true
},
dieseases:
{
    type: String,
    required: true
},
exerciseDays:
{
    type: String,
    required: true
},
users:
[
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
]
    },
    {
        timestamps: true
    }
);
module.exports=mongoose.model("Questions",questionSchema);

