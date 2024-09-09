const express = require('express');
const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config()

const app = express();

const port = process.env.PORT || 3001;
const db = process.env.MYSQL_DB;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;


app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
routes(app);

/*

mongoose.connect(`${process.env.MONGO_DB}`)
   .then(() =>{

    console.log('MongoDB Connected')
   })
   .catch((err) => console.log(err));
app.listen(port, () => {
    console.log('server is running on port: ' + port);

})*/

const sequelize = new Sequelize('db_shop', 'dbShop', '265', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    logging: false,
  });
  
  sequelize.authenticate()
     .then(() => {
        console.log('MySQL Connected');
     })
     .catch(err => console.log(err));
  
  app.listen(port, () => {
      console.log('Server is running on port: ' + port);
  });