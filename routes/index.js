const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @api {post} /signup Sign up
 * @apiName Signup
 * @apiGroup Authentication
 *
 * @apiParam {String}   [email]       Email address
 * @apiParam {String}   userName    Username
 * @apiParam {String}   password    Password
 *
 * @apiSuccess {Object[]}   user    User's info
 *
 * @apiError (400)  MissingData             The email, username or password is missing
 * @apiError (400)  PasswordInvalid         The password must be at least 6 characters long and contain a letter and a number
 * @apiError (400)  EmailAlreadyExists      The email already exists
 * @apiError (400)  UsernameAlreadyExists   The username already exists
 */
router.post('/signup', (req, res, next) => {
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
                    return res.status(201).send(user);
                });
            });
        });
    });
});

/**
 * @api {post} /login Log in
 * @apiName Login
 * @apiGroup Authentication
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

module.exports = router;
