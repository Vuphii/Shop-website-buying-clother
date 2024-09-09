const ProductService = require('../services/ProductService');

const createProduct = async(req, res) => {

    try{
    const {name, type, price, countInStock, rating, color, size} = req.body
    console.log('req.body', req.body);
   
      
        if(!name ||!type ||!price ||!countInStock ||!rating ||!color ||!size) {

             res.status(200).json({
                status: 'ERR',
                message: 'The input is requied'
             })
            }
        
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const updateProduct = async(req, res) => {

    try{
        const productId = req.params.id
        const data = req.body
        if(!productId){
            res.status(200).json({
                status: 'ERR',
                message: 'The product khong ton tai'
             })
        }
        console.log('productId', productId)

        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const getDetailProduct = async(req, res) => {

    try{
        const productId = req.params.id
        //console.log(token);
        if(!productId){
            
            res.status(200).json({
                status: 'ERR',
                message: 'The productId khong ton tai'
             })
        }

        const response = await ProductService.getDetailProduct(productId);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}

const deleteProduct = async(req, res) => {

    try{
        const productId = req.params.id
        const token = req.headers
        //console.log(token);
        console.log('productId: ', productId);

        if(!productId){
            console.log('productId: ', productId);
            return res.status(200).json({
                status: 'ERR',
                message: 'The product khong ton tai'
             })
        }

        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const deleteManyProduct = async(req, res) => {

    try{
        const ids = req.body
        //console.log(token);
        console.log('productId: ', productId);

        if(!ids){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids khong ton tai'
             })
        }

        const response = await ProductService.deleteManyProduct(ids);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}

const getAllProduct = async(req, res) => {

    try{
        const {limit, page, sort, filter} = req.query
        const response = await ProductService.getAllProduct(Number(page) || 0, Number(limit) || 8, sort, filter);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const getAllType = async(req, res) => {

    try{
        const response = await ProductService.getAllType();
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
module.exports ={
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,

 
    
}


