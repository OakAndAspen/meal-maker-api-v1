const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    if (!email || !userName || !password) {
        return next({status: 406, message: 'MissingData'});
    }
    // Check for invalid password
    if (password.length < 6 || !password.match(/\d/g) || !password.match(/[a-zA-z]/g)) {
        return next({status: 406, message: 'PasswordInvalid'});
    }
    // Check for existing email or username
    User.where({'email': email}).findOne((err, user) => {
        if (err) return next(err);
        if (user) return next({status: 409, message: 'EmailAlreadyExists'});
        User.where({'userName': userName}).findOne((err, user) => {
            if (err) return next(err);
            if (user) return next({status: 409, message: 'UsernameAlreadyExists'});
            // Create the user
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return next(err);
                new User({email: email, userName: userName, password: hashedPassword}).save((err, user) => {
                    if (err) return next(err);
                    return res.send(user);
                });
            });
        });
    });
});

/**
 * @api {post} /users/login Log in
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String}   userName    Username
 * @apiParam {String}   password    Password
 *
 * @apiSuccess {String} token JWT token
 *
 * @apiError (406)  MissingData         The username or password is missing
 * @apiError (404)  UserNotFound        User was not found
 * @apiError (406)  PasswordIncorrect   The password is incorrect
 */
router.post('/login', (req, res, next) => {
    let userName = req.body.userName;
    let password = req.body.password;

    // Check for missing data
    if (!userName || !password) return res.status(406).send({'error': 'MissingData'});

    // Find the user
    User.where({userName: userName}).findOne((err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send({'error': 'UserNotFound'});

        // Check the password
        bcrypt.compare(password, user.password, (err, valid) => {
            if (err) return next(err);
            if (!valid) return next({status: 406, message: 'PasswordIncorrect'});

            // Create and send JWT token
            const secretKey = process.env.SECRET_KEY || 'changeme';
            const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
            jwt.sign({sub: user._id, exp: exp}, secretKey, (err, token) => {
                if (err) return next(err);
                return res.send({token:token});
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