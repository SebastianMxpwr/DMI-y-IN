const Store = require('../models/Store_model')

const getAllStores = async (req, res) => {
    try {
        const allStores = await Store.find({ Active: true })

        if (allStores.length > 0) {
            res.status(200).send({
                msg: 'Tiendas obtenidas con exito',
                res: allStores
            })
        } else {
            res.status(200).send({
                msg: 'No hay ninguna tienda registrada',
                res: 0
            })
        }
    } catch (err) {
        res.status(500).send({
            msg: 'Error interno',
            err
        })
    }

}

const getStoreById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            res.status(404).send({
                msg: 'No hay id como parametro',
                res: 0
            })
        } else {
            const StoreFounded = await Store.findById(id)
            if (!Store) {
                res.status(404).send({
                    msg: 'Esta tienda no existe',
                    res: 0
                })
            } else {
                res.status(200).send({
                    msg: 'tienda obtenida con exito',
                    res: StoreFounded
                })
            }

        }
    } catch (err) {
        res.status(500).send({
            msg: 'Error interno',
            err
        })
    }

}

const registerStore = async (req, res) => {
    try {
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
        if (!storeAdded) {
            res.status(500).send({
                msg: 'No se pudo agregar la tienda intente de nuevo'
            })
        } else {
            res.status(200).send({
                msg: 'Tienda Agregada',
                cont: storeAdded
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err
        })
    }
}

const registerProducts = async(req, res)=>{
    try {
        const {id} = req.params
        if(!id){
            res.status(404).send({
                msg: 'NO se recibio ningun id valido'
            })
        }else{
            const { name , amount, description, price} = req.body

            const newProduct = {
                name,
                amount,
                description,
                price,
                pathImage: req.file.path
            }

            const storeFounded = await Store.findById(id)
            if(!storeFounded){
                res.status(404).send({
                    msg: 'La tienda ya no esta registrada o no existe',
                })
            }else{
                storeFounded.products.push(newProduct)
                storeFounded.save()
                res.status(200).send({
                    msg: 'Exito al añadir',
                    storeFounded
                })
            }
        }
    } catch (err) {
        res.status(500).send({
            msg: 'Error interno',
            err
        })
    }
}

const getProductById = async( req, res)=>{

    const { idStore, idProduct } = req.params
    let productRes = {}

    const storeFounded = await Store.findById(idStore)
    if(!storeFounded){
        res.status(404).send({
            msg: 'No se encontro a tienda'
        })
    }else{
        storeFounded.products.forEach(product => {

            if(product._id == idProduct){
                productRes = product
                console.log(productRes)
            }else{
                productRes = null
            }
        })

        if(productRes != null){
            res.status(200).send({
                msg: 'producto encontrado y macheado',
                res: productRes
            })
        }else{
            res.status(404).send({
                msg: 'productono no encontrado'
            })
        }
    }

}



module.exports = {
    getAllStores,
    getStoreById,
    registerStore,
    registerProducts,
    getProductById
}