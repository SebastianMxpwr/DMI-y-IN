const User = require('../models/User_model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../helpers/jwt')

//TODO: hacer los get de los empleados

const registerUser = async(req, res) =>{
    let {body} = req
    
    const duplicateUser = await User.findOne({email: body.email})

    if(!duplicateUser){
        if(!body.password){
            res.status(400).send({
                msg: 'No se introdujo una contraseña'
            })
        }else if(body.password.length<8){
            res.status(400).send({
                msg: 'La contraseña es muy corta'
            })
        }else{
            bcrypt.hash(body.password,null,null, async(req,hash)=>{
                if(hash){
                    body.password = hash
                    const reg = await User.create(body)
                    res.status(200).send({
                        msg:'Empleado Creado',
                        res: reg
                    })
                }else{
                    res.status(400).send({
                        msg: 'Error del servidor, intente de nuevo'
                    })
                }
            })
        }
    }else{
        res.status(400).send({
            msg: 'Ya esta registrado este email'
        })
    }
}

const loginUser = async(req,res)=>{
    let {body} = req

    const userFound = await User.findOne({email: body.email})

 
    if(!userFound){
        res.status(404).send({
            msg: 'El correo no esta registrado'
        })
    }else{
        bcrypt.compare(body.password, userFound.password, async(err, check)=>{
            if(!check){
                res.status(400).send({
                    msg: 'la contraseña no es correcta'
                })
            }
            res.status(200).send({
                msg: 'Usuario logedo',
                user: userFound,
                jwt: jwt.crearToken(userFound)
            })
        })
    }

}

module.exports = {
    registerUser,
    loginUser,
}