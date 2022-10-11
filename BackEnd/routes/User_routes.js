const userController = require('../controllers/User_controllers')
const express = require('express');
const api = express()

api.post('/login', userController.loginUser)
api.post('/register', userController.registerUser)

module.exports = api