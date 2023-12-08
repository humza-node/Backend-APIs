const Otpgenerator = require("otp-generator");
const User =  require('../models/user');
exports.postOtp = async(req, res, next) =>
{
  const email = req.body.email;
const otp = Otpgenerator.generate(6, {upperCaseAlphabets: false, specialChars: false});
await User.findOneAndUpdate({email}, {otp}, {upsert: true});
console.log('OTP for ${email}: ${otp}');
console.log(otp);
res.json({message: "OTP generated Sent Succesfully"});
};
exports.verifyOtp = async(req, res, next) =>
{
const email = req.body.email;
const EnterOtp = req.body.otp;
const user = await User.findOne({email});
if(!user || user.otp !==EnterOtp)
return res.status(401).json({message: "Invalid OTP"});
await User.findOneAndUpdate({email}, {otp: null});
res.json({message: "OTP Verified Successfully"});

};
