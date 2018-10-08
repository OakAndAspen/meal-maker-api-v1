const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET existing user */
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id).exec(function(err, user) {
        if (err) return next(err);
        res.send(user);
    });
});

/* GET all users */
router.get('/', function(req, res, next) {
    User.find().sort('name').exec(function(err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

/* POST new user */
router.post('/', function(req, res, next) {
    const newUser = new User(req.body);
    newUser.save(function(err, savedUser) {
        if (err) return next(err);
        res.send(savedUser);
    });
});

module.exports = router;