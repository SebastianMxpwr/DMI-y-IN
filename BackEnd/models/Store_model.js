const {Schema, model} = require('mongoose')

const storeModel = new Schema({
    name:{
        type: String,
        required: true,
    },
    directionStore:{
        type: String,
        required: true
    },
    lat:{
        type: String
    },
    long:{
        type: String
    },
    products: [
        {
            name: String,
            amount: Number,
            description: String,
            price: Number,
            pathImage: String,
        }
    ],
    imagePath:{
        type:String
    },
    Active:{
        type:Boolean,
        default: true
    }
})

module.exports = model('Stores', storeModel)