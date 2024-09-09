const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_shop', 'dbShop', '265', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});

const Order = require('./Order');
const OrderItem = require('./OrderItem');
const ShippingAddress = require('./ShippingAddress');
const User = require('./UserModel');
const Product = require('./ProductModel');

// Định nghĩa mối quan hệ giữa các mô hình
Order.hasMany(OrderItem, { foreignKey: 'orderId', as:'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

Order.hasOne(ShippingAddress, { foreignKey: 'orderId', as: 'shippingAddress' });
ShippingAddress.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

async function syncModels() {
  try {
    // Đồng bộ hóa các mô hình một cách tuần tự
    await Product.sync({ alter: true });
    console.log('Product table has been created.');

    await User.sync({ alter: true });
    console.log('User table has been created.');
    await Order.sync({ alter: true });
    console.log('Order table has been created.');
    await ShippingAddress.sync({ alter: true });
    console.log('ShippingAddress table has been created.');
    
    await OrderItem.sync({ alter: true });
    console.log('OrderItem table has been created.');
    
    

    // Thực hiện đồng bộ hóa Product và User nếu cần
   

  } catch (err) {
    console.error('Unable to create tables:', err);
  }
}

syncModels();

module.exports = { Order, OrderItem, ShippingAddress, User, Product };
