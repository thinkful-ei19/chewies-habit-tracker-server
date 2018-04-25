'use strict';

const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    meals: {
    mealsEaten:[],
    mealDetails: String
    },
    walkTimes: [],
    poop: {
    poopQuality: Number,
    poopsTaken: Number,
    poopDetails: String
    }
});

dailySchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Daily', dailySchema);