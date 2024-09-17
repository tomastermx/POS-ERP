const express = require('express');
const bodyParser = require('body-parser');
const  cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const  app = express();
const passport = require('passport');
const sequelizeDB = require('./lib/sequelize');

const {boomErrorHandler} = require('./middleware/errorhandler');

  require('./auth/index');

  app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
app.use(cookieParser());

app.use(session({
    secret: 'H9U5eMWzYt8g3hjlISyB',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));


  require('./auth/passport')(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  

app.use(express.static('public'));

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

//////Handling errors

app.use(boomErrorHandler);


////User  port variable for heroku
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{console.log('connected to port 3000')});



module.exports = app;
