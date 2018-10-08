const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short']
    },
    members: [
        {
            userId: {
                type: String,
                required: true
            }
        }
    ],
    recipes: [
        {
            recipeId: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Group', groupSchema);