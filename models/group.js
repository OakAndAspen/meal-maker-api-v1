const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short']
    },
    members: {
        type: Array,
        required: true,
        minlength: [2, 'A group must contain at least two members']
    },
    recipes: {
        type: Array
    }
});

module.exports = mongoose.model('Group', groupSchema);