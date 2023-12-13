const cardsControll = require('../controllers/cards');
const express = require('express');
const router = express.Router();
router.post('/add-card',cardsControll.PostCard);
router.get('/get-cards', cardsControll.getCards);
router.delete('/get-delete/:cardId',cardsControll.deleteCards);
router.put('/update-cards/:cardId', cardsControll.updateCards);
module.exports=router;