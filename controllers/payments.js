const Payment = require('../models/Payments');
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
            status: "created"
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
    const {razorpay_payment_id} = generateRandomString(20);
    const {razorpay_order_id } = generateRandomString(20);

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
