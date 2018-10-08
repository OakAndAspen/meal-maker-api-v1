const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: value => /^.+@.+\.[a-z]+$/gmi.test(value),
            message: '{VALUE} is not a valid email address'
        }
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