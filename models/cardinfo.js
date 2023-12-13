const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cardSchema = new Schema(
    {
        cardName:
        {
            type: String,
            required: true
        },
        cardNo:
        {
            type:Number,
            required: true
        },
        expiry:
        {
            type: Date,
            required: true
        },
        cvv:
        {
            type: Number,
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
    }
);
module.exports=mongoose.model('Cards',cardSchema);