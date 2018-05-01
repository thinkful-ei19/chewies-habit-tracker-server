'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Daily = require('../models/daily');

/* ========== GET/READ ALL ITEMS ========== */
router.get('/daily', (req, res, next) => {

    const userId = req.user.id;
  
    let filter = { userId };
  
    Daily.find(filter)
      .sort('created')
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        next(err);
      });
  });
  //get by id enpoint 
  router.get('/daily/:id', (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error('The `id` is not valid');
      err.status = 400;
      return next(err);
    }
  
    Daily.findOne({ _id: id, userId })
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  });
  /*============POST/CREATE A NEW DAILY POST============= */
router.post('/daily', (req,res, next) => {
  
  //if re.body.meals ! there throw err
  console.log(req.body)
  const { meals, walkTimes, poops, userId } = req.body;
    console.log(userId);
  //const userId = req.id;
  
   const newItem ={ meals, walkTimes, poops, userId }
    Daily.create(newItem)
      .then(result => {
        res.status(201).json(result.serialize())
  
      })
      .catch(err => {
        //consolelog error
        next(err);
      });
  })
  //update
  router.put('/daily/:id', (req, res, next) => {
    const { id } = req.params;
   
    const userId = req.user.id;
    const updateItem = { meals, walkTimes, poops, userId };
      
    const options = { new: true };
  
    Daily.findByIdAndUpdate(id, updateItem, options)
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  });

//delete daily
router.delete('/daily/:id', (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    Daily.findOneAndRemove({_id: id, userId})
      .then((result) => {
        if(result){
        res.status(204).end();
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  });
  
  module.exports = router;