const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const sequelizeDB = require('./lib/sequelize');

const  app = express();

const {boomErrorHandler} = require('./middleware/errorhandler');
   
  require('dotenv').config();
  
  
  require('./auth/index');
  require('./auth/passport');

  app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));



  app.use(passport.initialize());
  app.use(passport.session());

  



const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const SalesRouter = require('./routes/sales');
const productsRouter = require('./routes/products');
const StoreRouter = require('./routes/stores');
const OrdersRouter =  require('./routes/orders'); 

app.use('/', indexRouter);
app.use('/users',userRouter );
app.use('/sales', SalesRouter);
app.use('/products',productsRouter);
app.use('/stores', StoreRouter);
app.use('/orders',OrdersRouter );


app.use(express.static('public'));


//////Handling errors



app.use(boomErrorHandler);


////User  port variable for heroku
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{console.log('connected to port 3000')});



module.exports = app;
