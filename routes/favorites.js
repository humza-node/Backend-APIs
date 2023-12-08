const FavoritesControl = require('../controllers/favorites');
const express = require('express');
const router = express.Router();
router.post('/add-favorite', FavoritesControl.getAdd);
router.get('/get-favorites', FavoritesControl.getFavorites);
module.exports = router;
