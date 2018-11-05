const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @api {post} /login Log in
 * @apiName Login
 * @apiGroup Authentication
 * @apiDescription Checks the given credentials and returns an authentication token
 *
 * @apiParam {String}   userName    Username
 * @apiParam {String}   password    Password
 *
 * @apiParamExample Request example
 *  {
 *      "userName": "TheWeetchr",
 *      "password": "ikillghosts4pleasure"
 *  }
 *
 * @apiSuccess {String} token JWT token
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmRmZTBiMmRlOTcxODQxOTAzN2RkYzYiLCJleHAiOjE1NDIwMDQxMTIuOTI4LCJpYXQiOjE1NDEzOTkzMTJ9.sxIQTddwcud-h_bDvDBCveU8co0zh_91htgOiZm7IbM"
 *  }
 *
 * @apiError (400)  MissingData         The username or password is missing
 * @apiError (404)  UserNotFound        User was not found
 * @apiError (400)  PasswordIncorrect   The password is incorrect
 */
router.post('/login', (req, res, next) => {
    let userName = req.body.userName;
    let password = req.body.password;

    // Check for missing data
    if (!userName || !password) return res.status(400).send('MissingData');

    // Find the user
    User.where({userName: userName}).findOne((err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('UserNotFound');

        // Check the password
        bcrypt.compare(password, user.password, (err, valid) => {
            if (err) return next(err);
            if (!valid) return res.status(400).send('PasswordIncorrect');

            // Create and send JWT token
            const secretKey = process.env.SECRET_KEY || 'changeme';
            const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
            jwt.sign({sub: user._id, exp: exp}, secretKey, (err, token) => {
                if (err) return next(err);
                return res.status(200).send({token:token});
            });
        });
    });
});

/**
 * @api {post} /signup Sign up
 * @apiName Sign up
 * @apiGroup Authentication
 * @apiDescription User signup
 * - The email address and username must be unique
 * - The password must be at least 6 characters long and contain at least a number and a letter
 *
 * @apiParam {String}   email       Email address
 * @apiParam {String}   userName    Username
 * @apiParam {String}   password    Password
 *
 * @apiParamExample Request example
 *  {
 *      "email": "geralt@ofrivia.com",
 *      "userName": "TheWeetchr",
 *      "password": "ikillghosts4pleasure"
 *  }
 *
 * @apiSuccess {String}   _id           Id
 * @apiSuccess {String}   email         Email
 * @apiSuccess {String}   userName      Username
 * @apiSuccess {String}   registration  Registration date
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "_id": "5bdfe0b2de9718419037ddc6",
 *      "email": "geralt@ofrivia.com",
 *      "userName": "TheWeetchr",
 *      "registration": "2018-11-05T06:18:26.360Z"
 *  }
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
        return res.status(400).send('MissingData');
    }
    // Check for invalid password
    if (password.length < 6 || !password.match(/\d/g) || !password.match(/[a-zA-z]/g)) {
        return res.status(400).send('PasswordInvalid');
    }
    // Check for existing email or username
    User.where({'email': email}).findOne((err, user) => {
        if (err) return next(err);
        if (user) return res.status(400).send('EmailAlreadyExists');
        User.where({'userName': userName}).findOne((err, user) => {
            if (err) return next(err);
            if (user) return res.status(400).send('UsernameAlreadyExists');
            // Create the user
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return next(err);
                new User({
                    email: email,
                    userName: userName,
                    password: hashedPassword
                }).save((err, user) => {
                    if (err) return next(err);
                    return res.status(201).send(user);
                });
            });
        });
    });
});

module.exports = router;
