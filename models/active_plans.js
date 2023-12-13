const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activeSchema = new Schema(
    {
        users: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        ],
        plans: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref:'Plans'
            }
        ],
        payments:
        [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Payment'
            }
        ]

    }
);
module.exports = mongoose.model("ActivePlan", activeSchema);