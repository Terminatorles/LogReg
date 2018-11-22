let express = require('express');
let path = require('path');
let favicon =require('serve-favicon');
let logger =require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser =require('body-parser');
let session =require('express-session');
let passport =require('passport');
let expressValidator = require('express-validator');
let localStrategy = require('passport-local').strategy;
let multer =require('multer');
let upload = multer({dest: './uploads'});
let flash = require('connect-flash');
let bcrypt =require('bcryptjs');
let mongo =require('mongodb');
let mongoose =require('mongoose');
let db = mongoose.connection;

let routes =require('./routes/index');
let users =require('./routes/users');

let app = express();
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine, ''jade');

//app.use(favicon(path.join(__dirname,)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'secret',
  saveUninitialised:true,
  resave:true
}));

//passport
app.use(passport.initialize());
app.use(passport.session())

//Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value)
  var namespace = parem.split('.')
  , root = namespace.shift()
  , formParam = root;

  while(namespace.length){
    formParam += '[' + namespace.shift()
  }
    return {
      param: formParam,
      msg : msg,
      value : value
    };
  }));

app.use(flash());
app.use(function (req, res, next){
  res.locals.messages = require('express-message');
  next();
});
 app.get('*', function(req, res, next){
   res.locals.user = req.user || null;
   next();
 });

app.use('/', routes);
app.use('/users', users);

//catch 404 abd forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
