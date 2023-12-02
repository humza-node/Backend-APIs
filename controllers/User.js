const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) =>
{
const email=req.body.email;
const password = req.body.password;
const name=req.body.name;
bcrypt.hash
(password, 12)
.then(hashedPw =>
    {
        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        });
        return user.save();
    }).then(result =>
        {
            res.status(201).json({message: 'User Created', userId: result._id});
        }).
        catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode= 500;
                }
                next(err);
            });
};
exports.getUsers = async (req, res, next) =>
{
    const results = await User.find();
    res.status(200).json({ message: "Fetched Users ", results
            });
    
};
exports.login = async (req, res, next) =>
{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
    .then(user =>
        {
            if(!user)
            {
                const error = new Error('A user with this email could not be found');
                error.statusCode=401;
                throw error;

            }
            loadedUser=user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual =>
            {
                if(!isEqual)
                {
const error = new Error("A Wrong Password");
error.statusCode=401;
throw error;
                }
const token = jwt.sign({
    email: loadedUser.email,
    userId: loadedUser._id.toString()
},
'somesupersecretsecret',
{
    expiresIn: '1h'
}
);
res.status(200).json({token: token, userId:  loadedUser._id.toString()});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};