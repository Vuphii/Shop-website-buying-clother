const {Order, ShippingAddress, OrderItem, Product}= require('../models/SetupModel');
const bcrypt = require("bcrypt");
const {genneralAccessToken, genneralRefreshToken} = require('./JwtService');
const Sequelize = require('sequelize'); // Make sure Sequelize is properly imported


const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {orderItems, paymentMethod, itemPrice, shippingPrice, totalPrice, userId, fullName, address, city, phone} = newOrder
        try {
            console.log('new order', newOrder);

            // Bắt đầu một transaction để đảm bảo tính nhất quán dữ liệu
            const transaction = await Order.sequelize.transaction();

            try {
                // Tạo đơn hàng mới
                const createdOrder = await Order.create({
                    paymentMethod,
                    itemPrice,
                    shippingPrice,
                    totalPrice,
                    userId
                }, { transaction });

                // Tạo địa chỉ giao hàng mới
                await ShippingAddress.create({
                    fullName,
                    address,
                    city,
                    phone,
                    orderId: createdOrder.id,
                }, { transaction });

                // Xử lý từng sản phẩm trong orderItems
                const promises = orderItems.map(async (item) => {
                    const product = await Product.findOne({
                        where: {
                            id: item.product,
                            countInStock: { [Sequelize.Op.gt]: item.amount } // Kiểm tra số lượng tồn kho
                        }
                    }, { transaction });

                    if (product) {
                        // Cập nhật số lượng tồn kho và số lượng đã bán
                        const updatedProduct = await product.update({
                            countInStock: product.countInStock - item.amount,
                            selled: product.selled + item.amount,
                        }, { transaction });
                        console.log(`Product ID: ${product.id}, Remaining Stock: ${updatedProduct.countInStock}, Sold: ${updatedProduct.selled}`);


                        // Tạo OrderItem mới
                        await OrderItem.create({
                            name: item.name,
                            amount: item.amount,
                            image: item.image,
                            price: item.price,
                            color: item.color,
                            size: item.size,
                            orderId: createdOrder.id,
                            productId: item.product,
                        }, { transaction });
                    } else {
                        throw new Error(`Product with id ${item.product} is out of stock.`);
                    }
                });

                // Đợi tất cả các promises hoàn thành
                await Promise.all(promises);

                // Commit transaction sau khi tất cả thao tác hoàn thành
                await transaction.commit();

                resolve({
                    status: 'OK',
                    message: 'Order has been created successfully',
                });

            } catch (err) {
                // Rollback transaction nếu có lỗi xảy ra
                await transaction.rollback();
                reject({
                    status: 'FAILED',
                    message: 'Order creation failed',
                    error: err.message
                });
            }

        } catch (e) {
            reject({
                status: 'FAILED',
                message: 'Order creation failed',
                error: e
            });
        }
    });


   /*     try{
            console.log('new order', newOrder);
            const promises = orderItems.map(async (order) => {
                const productdata = await Product.findOneAndUpdate({
                    id: order.product,
                        countInStock: {$gt: order.amount}
    
                },{
                    $inc: {countInStock: -order.amount,
                        selled: +order.amount
                    }
                },
                {new: true}
            )
            if(productdata){  
                            const createdOrder = await Order.create({
                                paymentMethod: paymentMethod,
                                itemPrice: itemPrice,
                                shippingPrice: shippingPrice,
                                totalPrice: totalPrice,
                                userId: userId,
                               
                            }); 
                            await ShippingAddress.create({
                                fullName: fullName,
                                address: address,
                                city: city,
                                phone: phone,
                                orderId: createdOrder.id,
                            })
                
                            for (let item of orderItems){
                                await OrderItem.create({
                                    name: item.name,
                                    amount: item.amount,
                                    image: item.image,
                                    price: item.price,
                                    color: item.color,
                                    size: item.size,
                                    orderId: createdOrder.id,
                                    productId: item.product,
                                   
                                })
                            }
                           if(createOrder){
                               return {
                                   status: 'OK',
                                   message: 'Order has been created successfully',
            
                               };
                            
                           }else{
                            return {
                                status: 'OK',
                                message: 'ERR',
                                data: [order.product]
                            };
                             
                           }
            }
            })
            const results = await Promise.all(promises);
            console.log('results: ', results)

        } catch (e) {
            reject({
                status: 'FAILED',
                message: 'Order creation failed',
                error: e
            });
        }       
    });*/

}
const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm đơn hàng theo ID của người dùng và bao gồm các sản phẩm trong đơn hàng (OrderItems) và địa chỉ giao hàng (ShippingAddress)
            const orders = await Order.findAll({
                where: { userId: id },
                include: [
                    {
                        model: OrderItem,
                        as: 'orderItems', // Bao gồm các sản phẩm trong đơn hàng
                    },
                    {
                        model: ShippingAddress,
                        as: 'shippingAddress' // Bao gồm địa chỉ giao hàng
                    }
                ]
            });

            // Kiểm tra nếu đơn hàng không tồn tại
            if (orders.length === 0) {
                return resolve({
                    status: 'FAILED',
                    message: 'khong thay don hang nao cua user nay',
                });
            }

            // Trả về thông tin chi tiết đơn hàng nếu tìm thấy
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: orders
            });

        } catch (e) {
            // Bắt lỗi và reject với thông báo lỗi
            reject({
                status: 'FAILED',
                message: 'Lỗi khi lấy chi tiết đơn hàng',
                error: e.message
            });
        }
    });
};
    
module.exports = {
    createOrder,
    getOrderDetails

}