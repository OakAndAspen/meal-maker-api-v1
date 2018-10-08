const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short']
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);