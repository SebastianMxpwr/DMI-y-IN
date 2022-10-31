const StoreController = require('../controllers/Store_controller')
const express = require('express');
const api = express()
const upload = require('../helpers/multer')

api.get('/stores', StoreController.getAllStores)
api.get('/store/:id', StoreController.getStoreById)
api.get('/product/:idStore/:idProduct', StoreController.getProductById)
api.post('/addStore', upload.single('imagePath'), StoreController.registerStore)
api.post('/addProductStore/:id', upload.single('pathImage'), StoreController.registerProducts)

module.exports = api