const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* POST new user */
router.post('/', (req, res, next) => {
    new User(req.body).save(function(err, savedUser) {
        if (err) return next(err);
        res.send(savedUser);
    });
});

/* GET existing user */
router.get('/:id', findUserById, (req, res, next) => {
    res.send(req.user);
});

/* GET all users */
router.get('/', (req, res, next) => {
    User.find().sort('userName').exec(function(err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

/* PATCH existing user */
router.patch('/:id', findUserById, (req, res, next) => {
    req.user.set(req.body);
    req.user.save((err, savedUser) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedUser);
    });
});

/* DELETE existing user */
router.delete('/:id', findUserById, (req, res, next) => {
    req.user.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findUserById(req, res, next) {
    User.findById(req.params.id).exec(function(err, user) {
        if (err) return next(err);
        else if (!user) return res.status(404).send({
            error: 'No user found with ID ' + req.params.id
        });
        req.user = user;
        next();
    });
}

module.exports = router;