const PayController = require('../controllers/payments');
const express = require('express');
const router = express.Router();
router.post('/create-order', PayController.PostOrder);
router.post('/pay-success/:orderId',PayController.getSucess);
router.get('/get-payments', PayController.getPayments);
module.exports=router;