const FavoritesControl = require('../controllers/favorites');
const express = require('express');
const router = express.Router();
router.post('/add-favorite', FavoritesControl.getAdd);
router.get('/get-favorites', FavoritesControl.getFavorites);
router.put('/update-fav/:favoriteId', FavoritesControl.UpdateFavorite);
router.delete('/delete-favou/:favouId', FavoritesControl.deleteFavorites);
module.exports = router;
