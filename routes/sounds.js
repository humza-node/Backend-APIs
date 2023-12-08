const SoundControl = require('../controllers/sounds');
const express = require('express');
const router = express.Router();
router.post('/add-music', SoundControl.getAddMusic);
router.get('/get-Music', SoundControl.getMusic);
module.exports=router;