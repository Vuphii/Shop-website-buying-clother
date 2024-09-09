const express = require('express');
const router = express.Router()
const productController = require('../controllers/ProductControllers');
const { authmidleware } = require('../middleware/authmiddleware');

router.post('/create', productController.createProduct);
router.put('/update/:id', authmidleware, productController.updateProduct);
router.get('/getDetail/:id', productController.getDetailProduct);
router.delete('/delete/:id', authmidleware, productController.deleteProduct);
router.delete('/delete-many', authmidleware, productController.deleteManyProduct);
router.get('/getAll', productController.getAllProduct);
router.get('/get-all-type', productController.getAllType);





module.exports = router;