const PayController = require('../controllers/payments');
const express = require('express');
const router = express.Router();
router.post('/create-order', PayController.PostOrder);
router.post('/pay-success',PayController.getSucess);
module.exports=router;