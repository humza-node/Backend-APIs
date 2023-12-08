const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favSchema = new Schema(
    {
       plans: [
       {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Plans'
       }],
       users: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
       ],
sounds: [
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Sounds'
    }
]
    }
);
module.exports = mongoose.model("Favorites", favSchema);