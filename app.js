var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pen = require("./models/pen");

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){console.log("Connection to DB succeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PenRouter = require('./routes/pen');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

// const e = require('express');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pen', PenRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);
// We can seed the collection if needed on
//server start
async function recreateDB(){
// Delete everything
await pen.deleteMany();
let instance1 = new pen({Pen_color:"pink", Pen_Company:'large',Pen_cost:25.4});
instance1.save().then( () =>{
console.log("First object saved");
}).catch ((e)  =>{
  console.log('There was an error',e.message);
});

let instance2 = new pen({Pen_color:"Black",Pen_Company:"Butterfly",Pen_cost:30});
instance2.save().then( () =>{
console.log("Second object saved");
}).catch ((e)  =>{
  console.log('There was an error',e.message);
});
let instance3 = new pen({Pen_color:"Blue",Pen_Company:"NATRAJ",Pen_cost:20});
instance3.save().then( () =>{
console.log("Third object saved");
}).catch ((e)  =>{
  console.log('There was an error',e.message);
});

}
let reseed = true;
if (reseed) { recreateDB();}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
