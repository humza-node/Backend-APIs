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
        status: String
    }
);
module.exports=mongoose.model("Payment", paymentSchema);