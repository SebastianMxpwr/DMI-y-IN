const userController = require('../controllers/User_controllers')
const express = require('express');
const api = express()
const upload = require('../helpers/multer')

api.post('/login', userController.loginUser)
api.post('/register', upload.single('imagePath'),userController.registerUser)
api.get('/userID/:id', userController.getUserById)

module.exports = api