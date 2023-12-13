const express = require('express');
const User = require('../models/user');
const {check, body} = require('express-validator');
const router = express.Router();
const UserController = require('../controllers/User');
router.post('/signup', [
check('email')
.isEmail()
.withMessage("Please Enter a Valid Email")
.custom((value, {req}) =>
{
return User.findOne({email: value}).then(userDoc =>
    {
        if(userDoc)
        {
            return Promise.reject("Email Already Exists, Pick different one");
        }
    });
}).normalizeEmail(),
body('password',
'Please Enter password with only numbers at least five characters')
.isLength({min: 5})
.isAlphanumeric()
.trim()
] , UserController.signup);
router.get('/getUsers', UserController.getUsers);
router.post('/login',[body('email').isEmail()
.withMessage("Please Enter the Valid Email Address")
.normalizeEmail(),
body('password', 'Password has to be valid')
.isLength({min: 5})
.isAlphanumeric()
.trim()
], UserController.login);
router.post('/reset',UserController.postReset);
router.post('/new-password', UserController.postNewPassword);

module.exports =router;