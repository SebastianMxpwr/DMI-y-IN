const Store = require('../models/Store_model')

const getAllStores = async(req,res)=>{
    
    const allStores = await Store.find({Active: true})

    if(allStores.length > 0){
        res.status(200).send({
            msg: 'Tiendas obtenidas con exito',
            res: allStores
        })
    }else{
        res.status(200).send({
            msg: 'No hay ninguna tienda registrada',
            res: 0
        }) 
    }
}

const getStoreById = async(req,res)=>{
    const { id } = req.params

    if(!id){
        res.status(404).send({
            msg: 'No hay id como parametro',
            res: 0
        })
    }else{
        const StoreFounded = Store.findOne({ _id: id })
        if(!Store){
            res.status(404).send({
                msg: 'Esta tienda no existe',
                res: 0
            })
        }else{
            res.status(200).send({
                msg: 'tienda obtenida con exito',
                res: StoreFounded
            })
        }

    }
}   

const registerStore = async(req,res)=>{
    let { name, directionStore, lat, long, products } = req.body

    const newStore = {
        name,
        directionStore,
        lat,
        long,
        products,
        imagePath: req.file.path
    }

    const storeAdded = new Store(newStore)
    await storeAdded.save()
    if(!storeAdded){
        res.status(500).send({
            msg: 'No se pudo agregar la tienda intente de nuevo'
        })
    }else{
        res.status(200).send({
            msg: 'Tienda Agregada',
            cont: storeAdded
        })
    }


}
module.exports = {
    getAllStores,
    getStoreById,
    registerStore
}