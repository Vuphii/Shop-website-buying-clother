
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('db_shop', 'dbShop', '265', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});

const User = require('./UserModel');

const Order = sequelize.define('Order', {
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  itemPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  shippingPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isDelivered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  deliveredAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  }
  
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = Order;
