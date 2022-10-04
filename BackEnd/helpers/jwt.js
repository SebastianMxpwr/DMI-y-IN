const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'BeaconsProximity'

exports.crearToken = (user)=>{
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        typeUser: user.typeUser,
        iat: moment().unix(),
        expiresIn: moment().add(1,'days').unix()
    }

    return jwt.encode(payload,secret)
}