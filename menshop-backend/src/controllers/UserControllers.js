const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async(req, res) => {

    try{
        const {email, password, confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email ||!password ||!confirmPassword) {
             res.status(200).json({
                status: 'ERR',
                message: 'The input is requied'
             })
            
         }else if(!isCheckEmail){
             res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
             })
         }else if(password !== confirmPassword){ 
             res.status(200).json({
                status: 'ERR',
                message: 'Password is equal confirmpassword'
             })
         }
        const response = await UserService.createUser(req.body);
        
        return res.status(200).json(response);

    }catch (e) {
        console.error('Error creating user:', e); // Log error details
        return res.status(500).json({
            status: 'ERR',
            message: 'An error occurred while creating the user'
        });
    }


}
const loginUser = async(req, res) => {

    try{
        const {email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email ||!password) {
             res.status(200).json({
                status: 'ERR',
                message: 'The input is requied'
             })
            
         }else if(!isCheckEmail){
             res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
             })
        }
        const response = await UserService.loginUser(req.body);
        const {refresh_token, ...newResponse} = response;

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newResponse);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const updateUser = async(req, res) => {

    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            res.status(200).json({
                status: 'ERR',
                message: 'The userId khong ton tai'
             })
        }
        console.log('userId', userId)

        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const deleteUser = async(req, res) => {

    try{
        const userId = req.params.id
        const token = req.headers
        //console.log(token);
        if(!userId){
            
            res.status(200).json({
                status: 'ERR',
                message: 'The userId khong ton tai'
             })
        }
    console.log('userId', userId)

        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const deleteManyUser = async(req, res) => {

    try{
        const ids = req.body
        //console.log(token);

        if(!ids){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids khong ton tai'
             })
        }

        const response = await UserService.deleteManyUser(ids);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const getAllUser = async(req, res) => {

    try{
        const response = await UserService.getAllUser();
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const getDetailUser = async(req, res) => {

    try{
        const userId = req.params.id
        //console.log(token);
        if(!userId){
            
            res.status(200).json({
                status: 'ERR',
                message: 'The userId khong ton tai'
             })
        }

        const response = await UserService.getDetailUser(userId);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const refreshToken = async(req, res) => {
    console.log('req.cookie', req.cookies.refresh_token);

    try{
        const token = req.cookies.refresh_token;
        //console.log(token);
        if(!token){
            
            res.status(200).json({
                status: 'ERR',
                message: 'The token khong hop le'
             })
        }

        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
const logOutUser = async(req, res) => {

    try{
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'User dang xuat'
        });

    }catch(e){
        return res.status(404).json({
            err: e
        })
    }


}
module.exports ={
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken,
    logOutUser,
    deleteManyUser,
 
}