const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    typeUser:{
        type: Number,
        default: 0
    },
    Active:{
        type:Boolean,
        default: true
    }
})

module.exports = model('Users', userSchema)