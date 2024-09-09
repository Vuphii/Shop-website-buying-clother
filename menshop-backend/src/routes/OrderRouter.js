const express = require('express');
const router = express.Router()
const orderController = require('../controllers/OrderController');
const { authmidleware, authUsermidleware } = require('../middleware/authmiddleware');


router.post('/create', authUsermidleware, orderController.createOrder);
router.get('/get-order-details/:id', orderController.getOrderDetails)


module.exports = router; 