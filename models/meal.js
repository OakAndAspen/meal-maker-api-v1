const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    groupId: {
        type: String,
        required: true
    },
    recipeId: {
        type: String
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Meal', mealSchema);