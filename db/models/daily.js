'use strict';

const mongoose = require('mongoose');

const dailySchema = new.mongoose.Schema({
    mealsEaten:[],
    mealDetails: String,
    walkTimes: [],
    poopQuality: Number,
    poopsTaken: Number,
    poopDetails: String
});

dailySchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
    }
});

module.exports = mongoose.model('Daily', dailySchema);