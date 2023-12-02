const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
    coursetitle:
    {
        type: String,
        required: true
    },
    coursedescription:
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
    ] ,
    students:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        }
    ]
});
module.exports = mongoose.model("Course", courseSchema);