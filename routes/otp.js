const optController = require('../controllers/otp');
const express= require('express');
const router = express.Router();

router.post('/generate-otp', optController.postOtp);
router.post('/verify-otp',optController.verifyOtp);
module.exports = router;