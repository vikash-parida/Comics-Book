const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');




mongoose.connect('mongodb://localhost:27017/books', {
  // useNewUrlParser: true,  useUnifiedTopology: true,
});

let bookRouter = require('./routes/bookRouter');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/books', bookRouter);
app.get('/hello',(req,res)=>{
  console.log(req)
  res.send("hiii vikash")})

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(400).json({
      message: "Url not found"
  });
});
// error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      console.error(err);
  }
  res.status(500).json({ message: err.message });
});

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  process.exit(1);
});

process.on('unhandledRejection', function (err) {
  console.error((new Date).toUTCString() + ' unhandledRejection:', err.message)
  process.exit(1);
});

module.exports = app;
