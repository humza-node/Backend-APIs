const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    fname: {
        type: String,
        required: [true, 'Father name is required'],
    },
    contact: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
