const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('db_shop', 'dbShop', '265', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});

// Định nghĩa mô hình ShippingAddress
const ShippingAddress = sequelize.define('ShippingAddress', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING, // Dùng STRING để lưu số điện thoại vì có thể bao gồm ký tự đặc biệt như dấu '+'
    allowNull: false
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = ShippingAddress;
