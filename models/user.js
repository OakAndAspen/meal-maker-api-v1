const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: [3, 'Username is too short']
    },
    password: {
        type: String,
        required: true
    },
    registration: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);