const favorites = require('../models/favorites');
const User = require('../models/user');
const Plans = require('../models/plans');
const Sound = require('../models/sounds');
exports.getAdd = async(req, res, next) =>
{
    const planId = req.body.planId;
    const userId = req.body.userId;
    const soundId = req.body.soundId;
    const plan = await Plans.findById(planId);
    const user = await User.findById(userId);
    const sound = await Sound.findById(soundId);
    const favorite = new favorites(
        {
            plans: [plan._id],
            users: [user._id],
            sounds: [sound._id]
        }
    );
    const results = await favorite.save();
    res.status(200).json({message: "Favorites", results});
};
exports.getFavorites = async (req, res, next) =>
{
const results = await favorites.find();
res.status(200).json({message: "Favorites Data ", results})

};
exports.UpdateFavorite = async (req, res, next) =>
{
const favoriteId = req.params.favoriteId;
const planId = req.body.planId;
const userId = req.body.userId;
const soundId = req.body.soundId;
const plan = await Plans.findById(planId);
const user = await User.findById(userId);
const sound = await Sound.findById(soundId);
favorites.findById(favoriteId).then(favou =>
    {
        if(!favou)
        {
            const error = new Error("Not Found Favorites");
            error.statusCode = 404;
            throw error;
        }
        favou.plans = [plan._id];
        favou.users =[user._id];
        favou.sounds = [sound._id];
        return favou.save();
    }).then(result =>
        {
            res.status(200).json({message: "Favorites Updates", result});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
};
exports.deleteFavorites = async (req, res, next) =>
{
const favouId = req.params.favouId;
favorites.findById(favouId).then(fav =>
    {
        if(!fav)
        {
            const error = new Error('Favorites Not Found');
            error.statusCode = 404;
            throw error;
        }
        return favorites.findByIdAndDelete(favouId);
    }).then(results =>
        {
            console.log(results);
            res.status(200).json({message: "Deleted ", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=505;
                }
                next(err);
            });
};