const Payment = require('../models/Payments');
const User = require('../models/user');
const Plan = require('../models/plans');
const RazorPay = require('razorpay');
const razorpay = new RazorPay({
    key_id: 'rzp_test_G7ejft0CS9SFtD',
    key_secret: 'qUcJXaDIQjRrkpnpmp4P9SwI',
});
const crypto = require('crypto');

// Function to generate a random string (for simulation purposes)
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

exports.PostOrder = async (req, res, next) =>
{
    const amount = req.body.amount;
    const currency = req.body.currency;
    const userId = req.body.userId;
    const planId = req.body.planId;
   const user = await User.findById(userId);
   const plan = await Plan.findById(planId);
    try
    {
     
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency,
            receipt: 'order_receipt_' + Date.now(),
            payment_capture: 1,
        });
        const payment = new Payment({
            amount,
            currency,
            razorpay_order_id: order.id,
            status: "created",
            users: [user._id],
            plans: [plan._id]
        });
        await payment.save();
        res.json({success: true, order});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Failed To Create Order"});
    }
   
};
exports.getSucess = async(req, res, next) =>
{
  const razor_order = req.params.orderId;
    const {razorpay_payment_id} = generateRandomString(20);
    const razorpay_order_id  = await Payment.findOne({razor_order});

  try {
    // Update payment status and payment ID in MongoDB
    const payment = await Payment.findOneAndUpdate(
      { razorpay_order_id },
      { $set: { razorpay_payment_id, status: 'success' } },
      { new: true }
    );

    // Your additional logic for handling successful payments

    res.json({ success: true, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }

};
exports.getPayments = async(req, res, next) =>
{
  const pays = await Payment.find();
  res.status(200).json({message: "Payments Fetched", pays});
};