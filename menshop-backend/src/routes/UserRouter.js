const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserControllers');
const { authmidleware, authUsermidleware } = require('../middleware/authmiddleware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logOutUser);
router.put('/update-user/:id', authUsermidleware, userController.updateUser);
router.delete('/delete-user/:id', authmidleware, userController.deleteUser);
router.delete('/delete-many', authmidleware, userController.deleteManyUser);

router.get('/getall', authmidleware, userController.getAllUser);
router.get('/getDetail/:id', authUsermidleware, userController.getDetailUser);
router.post('/refresh-token', userController.refreshToken);




module.exports = router;