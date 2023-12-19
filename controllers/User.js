const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const postmarkClient = require('../postmark');
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
res.status(200).json({token: token, userId:  loadedUser._id.toString(), email: email});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode=500;
                    }
                    next(err);
                });
};

exports.postReset = async (req, res, next) =>
{
const users = User.find();
const otpvalues = (await users).map(user => user.otp);
crypto.randomBytes(32, (err, buffer) => {
    if(err)
    {
        console.log(err);
    }
const token = buffer.toString('hex');
User.findOne({email: req.body.email}).then(user =>
    {
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();  
    })
    .then(result =>
        {
            postmarkClient.sendEmail(
                {
                    to: req.body.email,
                    from: 'srs1@3rdeyesoft.com',
                    subject: 'Password Reset',
                    HtmlBody: `
                    <p> You requested a password Reset </p>
                    <p> Click this <a href ="http://localhost:3000/${token}/${otpvalues}">link</a> To Set a New Password. </p>
                    `      }
            )
        }).catch(err =>
            {
                const error = new Error(err);
                err.statusCode=500;
                return next(err);
            });
});
};
exports.postNewPassword = async (req, res, next) =>
{
const newpassword = req.body.password;
const userId = req.body.userId;
const passwordToken=req.body.passwordToken;
let resetUser;
User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {$gt: Date.now()},
    _id: userId
})
.then(user =>
    {
        resetUser = user;
        return bcrypt.hash(newpassword, 12);

    })
    .then(hashedPassword =>
        {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .catch(err =>
            {
               if(!err.statusCode)
               {
                err.statusCode=500;
               }
               next(err);
            });
};
