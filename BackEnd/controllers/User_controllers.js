const User = require('../models/User_model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../helpers/jwt')

//TODO: hacer los get de los empleados
//TODO: Hacer el get por id del empleado

const getUserById = async(req, res)=>{
    try {
        let {id} = req.params
        if(!id){
            res.status(404).send({
                msg: 'No se recibio un id'
            })
        }else{
            const userFound = await User.findById(id)
            if(!userFound){
                res.status(404).send({
                    msg: 'Este usuario ya no esta registrado o no existe'
                })
            }else{
                res.status(200).send({
                    msg: 'Usuario encontrado',
                    res: userFound
                })
            }
        }
    } catch (err) {
        res.status(500).send({
            msg: 'Ocurrio un error interno intene de nuevo',
        })
    }
}

const registerUser = async(req, res) =>{
    try {
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
                    const userRegistered = await User.create(body)
                    res.status(200).send({
                        msg:'Empleado Creado',
                        res: userRegistered
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
    } catch (err) {
        res.status(500).send({
            msg:'Ocurrio un error interno, intene de nuevo',
            err: err
        })
    }
}

const loginUser = async(req,res)=>{
    try {
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
    } catch (err) {
        res.status(500).send({
            msg: 'Ocurrio un error interno, intene de nuevo',
            err: err
        })
    }

}

module.exports = {
    registerUser,
    loginUser,
    getUserById
}