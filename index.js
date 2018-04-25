'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
const Daily = require('./db/models/daily');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.get('/api/daily', (req, res) => {
  const examples =[
    'chewie',
    'chewie',
    'chewie'
  ]
  res.json(examples)
})
/*============POST/CREATE A NEW DAILY POST============= */
app.post('/api/daily', (req,res, next) => {


  
  Daily.create()
    .then(result => {
      console.log(result);
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);

    })
    .catch(err => {
      next(err);
    });
})

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
