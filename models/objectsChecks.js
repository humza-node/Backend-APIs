const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectSchema = new Schema(
    {
        objectname:
        {
            type: String,
            required: true
        },
        persons:
            {
                weight:
                {
                    type: String, 
                    required: true
                },
                height:
                {
                    type: String,
                    required: true
                }
            },
        data:
            {
            email:{
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            username: 
            {
                type: String,
                required: true
            }   
            }
    }
);
module.exports = mongoose.model('Object', objectSchema);