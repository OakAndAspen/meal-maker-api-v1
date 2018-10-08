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
    participants: [
        {
            userId: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Meal', mealSchema);