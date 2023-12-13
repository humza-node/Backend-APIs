const SoundControl = require('../controllers/sounds');
const express = require('express');
const router = express.Router();
router.post('/add-music', SoundControl.getAddMusic);
router.get('/get-Music', SoundControl.getMusic);
router.put('/get-updates/:soundId', SoundControl.UpdateMusic);
router.delete('/get-deletes', SoundControl.DeleteMusic);
module.exports=router;