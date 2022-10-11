const StoreController = require('../controllers/Store_controller')
const express = require('express');
const api = express()
const upload = require('../helpers/multer')

api.get('/stores', StoreController.getAllStores)
api.get('/store/:id', StoreController.getStoreById)
api.post('/addStore', upload.single('imagePath'), StoreController.registerStore)

module.exports = api