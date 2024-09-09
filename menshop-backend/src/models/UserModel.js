
//---lien ket voi mysqli--------------------------------
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_Shop', 'dbShop', '265', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307, 
  logging: false,
});


// Định nghĩa mô hình User
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   avatar: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
  },
 }, 
{
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

// Đồng bộ mô hình với cơ sở dữ liệu
/*User.sync({ alter: true })
  .then(() => {
    console.log('User table has been created.');
  })
  .catch(err => {
    console.error('Unable to create table:', err);
  });*/

module.exports = User;
