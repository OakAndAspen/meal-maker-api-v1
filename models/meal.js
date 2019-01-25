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
    participants: {
        type: Array,
        required: true,
        minlength: [1, 'A meal must contain at least one participant']
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model('Meal', mealSchema);