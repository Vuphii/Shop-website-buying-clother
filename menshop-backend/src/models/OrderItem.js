const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('db_shop', 'dbShop', '265', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});
// Định nghĩa mô hình OrderItem
const Product = require('./ProductModel');
const Order = require('./Order');
const OrderItem = sequelize.define('OrderItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    allowNull: false,  // Thông tin đơn hàng liên kết với OrderItem
  }

}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});


module.exports = OrderItem;
