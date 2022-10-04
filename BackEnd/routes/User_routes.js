const express = require('express');
const api = express()
const userController = require('../controllers/User_controllers')

api.post('/login', userController.loginUser)
api.post('/register', userController.registerUser)

module.exports = api