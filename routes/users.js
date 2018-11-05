const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * TODO: aggregate of rated recipes
 * @api {get} /users/:id Show
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Request a user's info
 *
 * @apiParamExample Request example
 * {
 *     id: "5bbb621c4d7da43f508b9d5a"
 * }
 *
 * @apiSuccess {String} userName    Username
 * @apiSuccess {String} email       Email address
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *     userName: "TheAwesomeUser",
 *     email: "awesome@stanton.xyz"
 * }
 *
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 */
router.get('/:id', findUserById, (req, res, next) => {
    res.send(req.user);
});

/**
 * TODO: only show partial information
 * @api {get} /users Index
 * @apiName GetUsers
 * @apiGroup User
 * @apiDescription Request a list of users
 *
 * @apiSuccess {Object[]}   users           List of users
 * @apiSuccess {Number}     users.id        Id
 * @apiSuccess {String}     users.userName  Username
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *     users: [
 *       {id: "5bbb621c4d7da43f508b9d5a", userName: "TheAwesomeUser"}
 *       {id: "5bbb61284d7da43f508b9d59", userName: "TheOtherAwesomeUser"}
 *       {id: "5bd7083ed584b00d1c768f2e", userName: "YetAgainAnAwesomeUser"}
 *     ]
 * }
 */
router.get('/', (req, res, next) => {
    User.find().sort('userName').exec(function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

/**
 * TODO: test
 * @api {patch} /users/:id Update
 * @apiName PatchUser
 * @apiGroup User
 * @apiDescription Update an existing user
 * - The authenticated user can only update itself
 *
 * @apiParam {String}   id          Id
 * @apiParam {String}   password    New password
 *
 * @apiParamExample Request example
 * {
 *     password: "Yennefer4Ever"
 * }
 *
 * @apiSuccess  (200) UserWasUpdated    User was updated
 * @apiError    (404) UserNotFound      User was not found
 */
router.patch('/:id', findUserById, (req, res, next) => {
    let user = req.user;
    if(user._id !== req.userId) return req.sendStatus(403);
    let password = req.body.password;

    // Check for invalid password
    if (password.length < 6 || !password.match(/\d/g) || !password.match(/[a-zA-z]/g)) {
        return res.status(400).send('PasswordInvalid');
    }

    // Save the user
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        user.password = hashedPassword;
        user.save((err, updatedUser) => {
            if (err) return next(err);
            return res.status(200).send('UserWasUpdated');
        });
    });
});

/**
 * @api {delete} /users/:id Delete
 * @apiName DeleteUser
 * @apiGroup User
 * @apiDescription Delete a user
 * - The authenticated user can only delete itself
 *
 * @apiParam {String} id    Id
 *
 * @apiError    (404) UserNotFound      User was not found
 */
router.delete('/:id', findUserById, (req, res, next) => {
    let user = req.user;
    if(user._id !== req.userId) return req.sendStatus(403);
    user.remove(function (err) {
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