const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter=require('./Routes/auth-routes');
const productRouter=require('./Routes/product-routes');
const orderRouter=require('./Routes/order-routes');
const cartRouter=require('./Routes/cart-routes');

require('dotenv').config();

const connectionString = 'mongodb+srv://'+process.env.USER+':'+process.env.PASSWORD+'@mongodb-wt.rmne2.mongodb.net/btech_cse_116';
mongoose.connect(connectionString).then(() => {
  console.log("Connected");
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/auth',authRouter);
  app.use('/',productRouter);
  app.use('/',orderRouter);
  app.use('/',cartRouter);

  app.listen(3001, () => {
    console.log("Server started @ "+3001);
  });
});