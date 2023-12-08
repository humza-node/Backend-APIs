const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reminderSchema = new Schema(
    {
        set_time:
        {
            type: Date,
             required: true
        },
        repeatDays:
        
            {
                type: String,
                required: true
            },
        start_time:
        {
            type: Date,
            required: true
        },
        end_time:
        {
            type: Date,
            required: true
        },
        Interval:
        {
            type: String,
            required: true
        },
        Sleep_set_time:
        {
            type: Date,
            required: true
        },
       Sleep_repeatDays: 
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
module.exports = mongoose.model('Reminder', reminderSchema);