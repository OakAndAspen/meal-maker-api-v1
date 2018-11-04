const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @api {get} /users/:id Request a user's info
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParamExample
 * {
 *     id: "5bbb621c4d7da43f508b9d5a"
 * }
 *
 * @apiSuccess {String} userName    Username
 * @apiSuccess {String} email       Email address
 *
 * @apiSuccessExample
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
 * @api {get} /users Request a list of users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]}   users           List of users
 * @apiSuccess {Number}     users.id        Id
 * @apiSuccess {String}     users.userName  Username
 *
 * @apiSuccessExample
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
 * @api {patch} /users/:id Update an existing user
 * @apiName PatchUser
 * @apiGroup User
 *
 * @apiParam {String}   email     Email address
 * @apiParam {String}   userName  Username
 * @apiParam {String}   password  Password
 *
 * @apiParamExample
 * {
 *     id: 5bd7083ed584b00d1c768f2e
 * }
 *
 * @apiSuccess {String} userName    Username
 * @apiSuccess {String} email       Email address
 *
 * @apiSuccessExample
 * {
 *     email: "joe@stanton.xyz",
 *     userName: "TheAwesomeUser",
 *     password: "AtLeastThisOneIsEasyToRemember"
 * }
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
 * @apiParamExample
 * {
 *     id: "5bbb621c4d7da43f508b9d5a"
 * }
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