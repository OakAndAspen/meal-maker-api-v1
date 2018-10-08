const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short']
    },
    description: String,
    imageUrl: String,
    servings: {
        type: Number,
        required: true
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                enum: ['l', 'dl', 'cl', 'ml', 'kg', 'g', 'tea s.', 'coffee s.', 'table s.']
            }
        }
    ],
    steps: [
        {
            number: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);