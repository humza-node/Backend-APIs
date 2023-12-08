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
res.status(200).json({message: "Favorites Data ", results});

};