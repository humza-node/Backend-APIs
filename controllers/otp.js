const Otpgenerator = require("otp-generator");
const User =  require('../models/user');
const bcrypt = require('bcryptjs');
const postmarkClient = require("../postmark");

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
exports.changePasswordWithOTp = async (req, res, next) =>
{
const email = req.body.email;
const Newpassword = req.body.password;
const otp = req.body.otp;
const user = await User.findOne({email, otp: otp});
if(!user)
{
  return res.status(401).json({message: "Invalid OTP"});
}
const hashedPassword = await bcrypt.hash(Newpassword, 12);
user.password = hashedPassword;
await user.save();
await User.findOneAndUpdate({email}, {otp: null});
res.json({message: "Password Change SuccessFully"});
};
exports.PostOtpEmail = async(req, res, next) =>
{
  const email = req.body.email;
  const otp = Otpgenerator.generate(6, {upperCaseAlphabets: false, specialChars: false});
try 
{

  await User.findOneAndUpdate({email}, {otp} ,{upsert: true});
}
catch(err)
{
  console.log(err);
}
  const message = {
    From: 'srs1@3rdeyesoft.com',
    To: email,
    Subject: "Your OTP",
    TextBody: `Your OTP is ${otp}`,
  };
  const response = await postmarkClient.sendEmail(message);
  console.log("Email Send With OTP", response);
};