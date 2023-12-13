const Card = require('../models/cardinfo');
const User = require('../models/user');
exports.PostCard = async (req, res, next) =>
{
const cardName = req.body.cardName;
const cardNo=req.body.cardNo;
const expiry = req.body.expiry;
const cvv = req.body.cvv;
const userId = req.body.userId;
const user = await User.findById(userId);
const cards = new Card(
    {
        cardName: cardName,
        cardNo: cardNo,
        expiry: expiry,
        cvv:cvv,
        users: [user._id]
    }
);
const result = await cards.save();
res.status(200).json({message: "Card Added", result});
};
exports.getCards = async(req, res, next) =>
{
const results = await Card.find();
res.status(200).json({message: "Cards Fetched", results});
};
exports.deleteCards = async (req, res, next) =>
{
    const cardId = req.params.cardId;
    Card.findById(cardId).then(card =>
        {
            if(!card)
            {
                const error = new Error("Card Not Found");
                error.statusCode = 404;
                throw error;
            }
            return Card.findByIdAndDelete(cardId);
        }).then(results =>
            {
                res.status(200).json({message: "Deleted Cards", results});
            }).catch(err =>
                {
                    if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                });
};
exports.updateCards = async (req, res, next) =>
{
    const cardId = req.params.cardId;
    const cardName = req.body.cardName;
    const cardNo = req.body.cardNo;
    const expiry = req.body.expiry;
    const cvv = req.body.cvv;
    const userId = req.body.userId;
const user = await User.findById(userId);
Card.findById(cardId).then(cards =>
    {
        if(!cards)
        {
            const error = new Error("No Cards Found");
            error.statusCode=404;
            throw error;
        }
        cards.cardName=cardName;
        cards.cardNo = cardNo;
        cards.expiry = expiry;
        cards.cvv = cvv;
        cards.users=[user._id];
        return cards.save();
    }).then(results =>
        {
            console.log(results);
            res.status(200).json({message: "Cards Updated", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode = 500;
                }
                next(err);
            });

};