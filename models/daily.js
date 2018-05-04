'use strict';

const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    meals: {
        breakfastMeal: { type: Boolean, default: false },
        dinnerMeal: { type: Boolean, default: false },
    },
    
    walkTimes: {
        morningWalk: { type: Boolean, default: false },
        afternoonWalk: { type: Boolean, default: false },
        eveningWalk: { type: Boolean, default: false },
        nightWalk: { type: Boolean, default: false }

    },
    poops: {
        poopQuality: Number,
        poopsTaken: Number,
        poopDetails: String
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}

});

dailySchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Daily', dailySchema);