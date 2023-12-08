const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const soundSchema = new Schema (
    {
        soundName:
        {
            type: String, 
            required: true
        },
        soundtype:
        {
            type:String,
            required: true
        },
        soundduration:
        {
            type: String,
            required: true
        },
        soundUrl:
        {
            type:String,
            required: true
        }
    }
);
module.exports = mongoose.model("Sounds", soundSchema);