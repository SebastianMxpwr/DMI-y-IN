const User = require('../models/User_model')
const bcrypt = require('bcrypt-nodejs')
const fs = require('fs');
const jwt = require('../helpers/jwt')

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
    
        let {name, email,password, typeUser} = req.body
    
    const duplicateUser = await User.findOne({email: email})

    if(!duplicateUser){
        if(!password){
            res.status(400).send({
                msg: 'No se introdujo una contraseña'
            })
        }else if(password.length<8){
            res.status(400).send({
                msg: 'La contraseña es muy corta'
            })
        }else{
            const newUser ={
                name,
                email,
                password,
                typeUser,
                imagePath: req.file.path
            } 
            bcrypt.hash(password,null,null, async(req,hash)=>{
                if(hash){
                    newUser.password = hash
                    const userAdded = new User(newUser)
                    await userAdded.save()
                    res.status(200).send({
                        msg:'Empleado Creado',
                        res: userAdded
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
        console.log(err)
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

const updateUser = async(req, res)=>{
    try {
        const id = req.params.id
    let {name, email} = req.body
    const newImage = req.file.path

    const userFounded = await User.findById(id)
    if(!userFounded){
        res.status(404).send({
            msg: 'No se enuentra el usuario'
        })
    }else{
        fs.unlink(userFounded.imagePath, (err)=>{
            if(err){
                console.log(err);
            }
            console.log('imagen eliminada');
        })
        const userUpdate = {
            name,
            email,
            imagePath: req.file.path
        }

        const userFoundedAndUpdated = await User.findByIdAndUpdate(id,userUpdate,{new: true})
        if(!userFoundedAndUpdated){
            res.status(400).send({
                msg: 'No se pudo actualizar el usuario intente de nuevo'
            })
        }else{
            res.status(200).send({
                msg: 'Exito al actualizar el empleado',
                cont: userFoundedAndUpdated
            })
        }
    }
    } catch (error) {
        res.status(500).send({
            msg: 'Ocurrio un error interno, intene de nuevo',
            err: err
        })
    }

    
}
module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUser
}