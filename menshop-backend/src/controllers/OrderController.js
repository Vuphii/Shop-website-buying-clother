const OrderService = require('../services/OrderService');
const JwtService = require('../services/JwtService');

const createOrder = async(req, res) => {

    try{
    
        const {paymentMethod, itemPrice, shippingPrice, totalPrice, fullName, address, city, phone} = req.body
        if(!paymentMethod || !itemPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            console.log('req-body', req.body);
             res.status(200).json({
                status: 'ERR',
                message: 'The input is requied'
             })
            }
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response);
    }catch (e) {
        console.log('Error', e);
        return res.status(404).json({
            status: 'ERR',
            message: 'An error occurred while creating the order',
        });
    }
}

const getOrderDetails = async(req, res) => {

    try{
        const productId = req.params.id
        //console.log(token);
        if(!productId){
            
            res.status(200).json({
                status: 'ERR',
                message: 'The productId khong ton tai'
             })
        }

        const response = await OrderService.getOrderDetails(productId);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
module.exports ={
    createOrder,
    getOrderDetails
}