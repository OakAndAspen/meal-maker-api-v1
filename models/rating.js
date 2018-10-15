const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    health: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    taste: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Rating', ratingSchema);