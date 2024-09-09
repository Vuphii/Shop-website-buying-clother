/*const Product = require('../models/ProductModel');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, images, type, price, countInStock, rating, color, size} = newProduct

        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'Product đã tồn tại',
                
                })
            }
        
            const newProduct = await Product.create({
                name: name,
                images: images,
                type: type,
                price: price,
                countInStock: countInStock,
                rating: rating,
                color: color,
                size: size
            })
            if(newProduct){

                resolve({
                    status: 'OK',
                    message: 'Tạo san pham thành công',
                    data: newProduct
                });
            }

        }catch(e){
            reject(e);
        }

    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
               
            console.log('check product', checkProduct);
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'Product khong ton tai',
                
                })
            }          
            const updateProduct = await Product.findByIdAndUpdate(
                id,
                data,
                {new: true}
        
            )
            console.log('update product: ', updateProduct);
                 resolve({
                    status: 'OK',
                    message: 'update thành công',
                    data: updateProduct
                    
                });

        }catch(e){
            reject(e);
        }

    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })
               
            if(product === null){
                resolve({
                    status: 'OK',
                    message: 'Product khong ton tai',
                
                })
            }            
                resolve({
                    status: 'OK',
                    message: ' thành công',
                    data: product
                    
                });

        }catch(e){
            reject(e);
        }

    })
}


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
               
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'Product khong ton tai',
                
                })
            }
            await Product.findByIdAndDelete(id)
            
            console.log('delete product: ', checkProduct);
            
                resolve({
                    status: 'OK',
                    message: 'delete san pham thành công',
                    
                });

        }catch(e){
            reject(e);
        }

    })
}

const getAllProduct = (page, limit, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try{

            const totalProduct = await Product.countDocuments();
            if(filter){
                console.log('filter', filter);
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]:{'$regex': filter[1]}}).limit(limit).skip(Number(page)* Number(limit))
                resolve({
                    status: 'OK',
                    message: 'goi product thành công',
                    data: allObjectFilter
                });

            }
            if(sort){
                console.log('sort');
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                console.log('objectSort', objectSort);
                const allProductSort = await Product.find().limit(limit).skip(Number(page)* Number(limit)).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'goi product thành công',
                    data: allProductSort 
                });

            }
            const allProduct = await Product.find().limit(limit).skip(Number(page)* Number(limit))
            
                resolve({
                    status: 'OK',
                    message: 'goi product thành công',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPages: Math.ceil(totalProduct / limit)
                    
                });

        }catch(e){
            reject(e);
        }

    })
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
   
 
}*/

const Product = require('../models/ProductModel');
const { Op, Sequelize } = require('sequelize');



const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, images, type, price, countInStock, rating, color, size, description, discount}  = newProduct

        try{
            const checkProduct = await Product.findOne({
                where: { name: name}
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'Product đã tồn tại',
                
                })
            }
        
            const newProduct = await Product.create({
                name: name,
                images: images,
                type: type,
                price: price,
                countInStock: countInStock,
                rating: rating,
                color: color,
                size: size,
                description: description,
                discount: discount
            })
            if(newProduct){

                resolve({
                    status: 'OK',
                    message: 'Tạo san pham thành công',
                    data: newProduct
                });
            }

        }catch(e){
            reject(e);
        }

    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try{
            const checkProduct = await Product.findOne({
                where: {id: id}
            })
               
            console.log('check product', checkProduct);
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'Product khong ton tai',
                
                })
            }          
            const updateProduct = await Product.update(data, { where: { id: id }, returning: true });

            console.log('update product: ', updateProduct);
                 resolve({
                    status: 'OK',
                    message: 'update thành công',
                    data: updateProduct
                    
                });

        }catch(e){
            reject(e);
        }

    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const product = await Product.findOne({
                where: {id: id}
            })
               
            if(product === null){
                resolve({
                    status: 'OK',
                    message: 'Product khong ton tai',
                
                })
            }            
                resolve({
                    status: 'OK',
                    message: ' thành công',
                    data: product
                    
                });

        }catch(e){
            reject(e);
        }

    })
}


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
               where: {id: id}
            })
               
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'Product khong ton tai',
                
                })
            }
            await Product.destroy({ where: { id: id } });

            
            console.log('delete product: ', checkProduct);
            
                resolve({
                    status: 'OK',
                    message: 'delete san pham thành công',
                    
                });

        }catch(e){
            reject(e);
        }

    })
}
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try{
            await Product.deleteMany({id: ids})
    
                resolve({
                    status: 'OK',
                    message: 'delete san pham thành công',
                    
                });

        }catch(e){
            reject(e);
        }

    })
}



const getAllProduct = async (page, limit, sort, filter) => {
    try {
        // Chuyển đổi page và limit thành số
        const offset = Number(page) * Number(limit);

        // Tính tổng số sản phẩm
        const { count: totalProduct } = await Product.findAndCountAll({ where: filter ? {
            [filter[0]]: {
                [Op.like]: `%${filter[1]}%` // Tìm kiếm với điều kiện tương tự $regex trong MongoDB
            }
        } : {} });

        // Xây dựng điều kiện sắp xếp
        const order = sort ? [[sort[1], sort[0]]] : [];

        // Lấy danh sách sản phẩm
        const products = await Product.findAll({
            where: filter ? {
                [filter[0]]: {
                    [Op.like]: `%${filter[1]}%`
                }
            } : {},
            limit: Number(limit),
            offset: offset,
            order: order
        });

        return {
            status: 'OK',
            message: 'Gọi sản phẩm thành công',
            data: products,
            total: totalProduct,
            pageCurrent: Number(page)+1,
            totalPages: Math.ceil(totalProduct / limit)
        };
    } catch (e) {
        throw e;
    }
};

const getAllType = async () => {
    try {
        const allType = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type']
            ]
        });

        return {
            status: 'OK',
            message: 'Gọi sản phẩm thành công',
            data: allType.map(item => item.get('type')), // Sử dụng item.get('type') để lấy giá trị
        };
    } catch (e) {
        throw e;

    }
};



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
   
 
}