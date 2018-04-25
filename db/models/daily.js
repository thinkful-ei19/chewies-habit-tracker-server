'use strict';

const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    meals: {
        breakfastMeal: { type: Boolean, default: false },
        dinnerMeal: { type: Boolean, default: false },
        mealDetails: String
    },
    
    walkTimes: {
        morning: { type: Boolean, default: false },
        afternoon: { type: Boolean, default: false },
        evening: { type: Boolean, default: false },
        morning: { type: Boolean, default: false }

    },
    poops: {
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