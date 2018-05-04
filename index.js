'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const { PORT, CLIENT_ORIGIN, JWT_SECRET, JWT_EXPIRY } = require('./config');
const { dbConnect } = require('./db-mongoose');
const dailyRouter = require('./routes/daily');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
// const {dbConnect} = require('./db-knex');
//Utilize passport
passport.use(localStrategy);
passport.use(jwtStrategy);

//create express app
const app = express();
//utilize body parser
app.use(
  bodyParser.json()
)
//log all request. skip logging during
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);
//use client origin
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
//mount routers
app.use('/api', usersRouter);
app.use('/api', authRouter);

// Endpoints below this require a valid JWT
app.use(passport.authenticate('jwt', { session: false, failWithError: true }));

app.use('/api', dailyRouter);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});


//hii

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
