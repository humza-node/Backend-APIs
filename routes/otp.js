const optController = require('../controllers/otp');
const express= require('express');
const router = express.Router();

router.post('/generate-otp', optController.postOtp);
router.post('/verify-otp',optController.verifyOtp);
router.put('/changePasswordOtp', optController.changePasswordWithOTp);
router.post('/sendOtpEmail', optController.PostOtpEmail);
module.exports = router;