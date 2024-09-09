const {User} = require('../models/SetupModel');
const bcrypt = require("bcrypt");
const {genneralAccessToken, genneralRefreshToken} = require('./JwtService');


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, avatar, address, isAdmin} = newUser

        try{
            const checkUser = await User.findOne({ where: { email: email } });
            /*const checkUser = await User.findOne({
                email: email
            })*/
            if(checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'Email đã tồn tại',
                
                })
            }
            const hash = bcrypt.hashSync(password, 10);
            //console.log('hash:', hash);
            /*const createUser = await User.create({email, password: hash,})*/
            const createUser = await User.create({name, email, password: hash, phone, avatar, address , isAdmin});

            if(createUser){

                resolve({
                    status: 'OK',
                    message: 'Tạo tài khoản thành công',
                    data: createUser
                });
            }

        }catch(e){
            reject(e);
        }

    })
}
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password}= userLogin

        try{
            const checkUser = await User.findOne(
                { where: {email: email}
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'Email khong ton tai',
                
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            console.log('comparePassword', comparePassword)
   
            if(!comparePassword){
                    resolve({
                        status: 'ERR',
                        message: 'Mật khẩu khong chinh xac',
                    })
            }
           const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            console.log('access_token:', access_token)
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
                resolve({
                    status: 'OK',
                    message: 'Dang nhap tài khoản thành công',
                    access_token,
                    refresh_token
                    
                });

        }catch(e){
            reject(e);
        }

    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try{
            const checkUser = await User.findOne({
                where: {id: id}
            })
               
            console.log('check user', checkUser);
            if(checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'Email khong ton tai',
                
                })
            }
            // Kiểm tra nếu người dùng cập nhật mật khẩu mới
            if (data.password) {
                const comparePassword = bcrypt.compareSync(data.password, checkUser.password);
                console.log('comparePassword', comparePassword);

                // Nếu mật khẩu không giống mật khẩu hiện tại, hash mật khẩu mới
                if (!comparePassword) {
                    data.password = bcrypt.hashSync(data.password, 10);
                } else {
                    return resolve({
                        status: 'OK',
                        message: 'Mật khẩu mới không thể trùng với mật khẩu hiện tại',
                    });
                }
            }
        
                const updateUser = await User.update(data, { where: { id: id }, returning: true });
                /*const updateUser = await User.findByIdAndUpdate(
                    id,
                    data,
                    {new: true}
            
                )*/

            console.log('update user: ', updateUser);
            
            /*
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            console.log('comparePassword', comparePassword)
   
            if(!comparePassword){
                    resolve({
                        status: 'OK',
                        message: 'Mật khẩu khong chinh xac',
                    })
            }
           const access_token = await generateAccessToken.genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generateAccessToken.genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })*/
                resolve({
                    status: 'OK',
                    message: 'update thành công',
                    data: updateUser
                    
                });

        }catch(e){
            reject(e);
        }

    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                where: {id: id}
            })
               
            //console.log('check user', checkUser);
            if(checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'Email khong ton tai',
                
                })
            }
            //await User.findByIdAndDelete(id)
            await User.destroy({ where: { id: id } });
            console.log('delete user: ', checkUser);

            
                resolve({
                    status: 'OK',
                    message: 'delete user thành công',
                    
                });

        }catch(e){
            reject(e);
        }

    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try{
            await User.deleteMany({id: ids})
    
                resolve({
                    status: 'OK',
                    message: 'delete user thành công',
                    
                });

        }catch(e){
            reject(e);
        }

    })
}



const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try{
            //const allUser = await User.find()
            const allUser = await User.findAll();            
                resolve({
                    status: 'OK',
                    message: 'delete user thành công',
                    data: allUser
                    
                });

        }catch(e){
            reject(e);
        }

    })
}
const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            /*const user = await User.findOne({
                _id: id
            })*/
            const user = await User.findOne({ where: { id: id } });
            if(user === null){
                resolve({
                    status: 'OK',
                    message: 'Email khong ton tai',
                
                })
            }            
                resolve({
                    status: 'OK',
                    message: ' thành công',
                    data: user
                    
                });

        }catch(e){
            reject(e);
        }

    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    deleteManyUser,
    
 
}