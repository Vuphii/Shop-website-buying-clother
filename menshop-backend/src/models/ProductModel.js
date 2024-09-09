
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('db_shop', 'dbShop', '265', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.TEXT('long'), // Sử dụng TEXT để lưu trữ các URL ảnh
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT, // Hoặc DataTypes.DECIMAL tùy thuộc vào yêu cầu chính xác của bạn
    allowNull: false
  },
  countInStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT, // Có thể sử dụng DECIMAL nếu cần chính xác hơn
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  color: {
    type: DataTypes.JSON, // Sử dụng JSON để lưu trữ mảng màu
    allowNull: false
  },
  size: {
    type: DataTypes.JSON, // Sử dụng JSON để lưu trữ mảng kích cỡ
    allowNull: false
  },
  discount: {
    type: DataTypes.FLOAT, // Hoặc DataTypes.DECIMAL tùy thuộc vào yêu cầu chính xác của bạn
    allowNull: true
  },
  selled: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Đồng bộ mô hình với cơ sở dữ liệu
/*sequelize.sync({ alter: true })
  .then(() => {
    console.log('Product table has been created.');
  })
  .catch(err => {
    console.error('Unable to create table:', err);
  });
*/
module.exports = Product;
