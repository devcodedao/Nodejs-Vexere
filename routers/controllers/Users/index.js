const UserController = require('./Users')
const LoginController=require('./Login')
const express = require('express');
const router = express();
router.post('/', UserController.registerUser)
router.post('/login',LoginController.login)

module.exports = router;