const express = require('express');
const User = require('../models/user');
const router = express.Router();
const UserController = require('../controllers/User');
router.put('/signup', UserController.signup);
router.get('/getUsers', UserController.getUsers);
router.post('/login', UserController.login);
router.post('/reset',UserController.postReset);
router.post('/new-password', UserController.postNewPassword);

module.exports =router;