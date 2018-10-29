const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @api {post} /users Create a new user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String}   email       Email address
 * @apiParam {String}   userName    Username
 * @apiParam {String}   password    Password
 *
 * @apiSuccess (200)    Success     User was created.
 *
 * @apiError (406)  MissingData             The email, username or password is missing
 * @apiError (406)  PasswordInvalid         The password must be at least 6 characters long and contain a letter and a number
 * @apiError (409)  EmailAlreadyExists      The email already exists
 * @apiError (409)  UsernameAlreadyExists   The username already exists
 */
router.post('/', (req, res, next) => {
    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;

    // Check for missing data
    if (!email || !userName || !password) return res.status(406).send({'error': 'MissingData'});
    // Check for invalid password
    if (password.length < 6 || !password.match(/\d/g) || !password.match(/[a-zA-z]/g)) {
        return res.status(406).send({'error': 'PasswordInvalid'});
    }

    // Check for existing email or username
    User.where({'email': email}).findOne((err, user) => {
        if (err) return res.send({error: 'err1'});
        if (user) return res.status(409).send({'error': 'EmailAlreadyExists'});
        User.where({'userName': userName}).findOne((err, user) => {
            if (err) return res.send({error: 'err2'});
            if (user) return res.status(409).send({'error': 'UsernameAlreadyExists'});

            // Create the user
            new User({email: email, userName: userName, password: password}).save((err) => {
                if (err) return next(err);
                return res.send({'success': 'User was created.'})
            });
        });
    });
});

/**
 * @api {get} /users/:id Request a user's info
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {String} userName    Username
 * @apiSuccess {String} email       Email address
 *
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 */
router.get('/:id', findUserById, (req, res, next) => {
    res.send(req.user);
});

/**
 * @api {get} /users Request a list of users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]}   users           List of users
 * @apiSuccess {Number}     users.id        Id
 * @apiSuccess {String}     users.userName  Username
 */
router.get('/', (req, res, next) => {
    User.find().sort('userName').exec(function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

/**
 * @api {patch} /users/:id Update an existing user
 * @apiName PatchUser
 * @apiGroup User
 *
 * @apiParam {String}   email     Email address
 * @apiParam {String}   userName  Username
 * @apiParam {String}   password  Password
 *
 * @apiSuccess {String} userName    Username
 * @apiSuccess {String} email       Email address
 *
 * @apiError (404) UserNotFound User with id {id} was not found.
 */
router.patch('/:id', findUserById, (req, res, next) => {
    req.user.set(req.body);
    req.user.save((err, savedUser) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedUser);
    });
});

/**
 * @api {delete} /users/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiSuccess (200)    Success     User was deleted.
 *
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 */
router.delete('/:id', findUserById, (req, res, next) => {
    req.user.remove(function (err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findUserById(req, res, next) {
    User.findById(req.params.id).exec(function (err, user) {
        if (err) return next(err);
        else if (!user) return res.status(404).send({
            error: 'No user found with ID ' + req.params.id
        });
        req.user = user;
        next();
    });
}

module.exports = router;