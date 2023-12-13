const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema(
    {
        amount:
        {
            type: Number,
            required: true
        },
        currency:
        {
            type: String,
            required: true
        },
        razorpay_order_id:
        {
            type: String,
            required: true
        },
        razorpay_payment_id:
        {
            type: String,
            required: false
        },
        status: String,
        users:[
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        ],
        plans:[
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Plans'
            }
        ]
    }
);
module.exports=mongoose.model("Payment", paymentSchema);