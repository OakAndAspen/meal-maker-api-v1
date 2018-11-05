const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * TODO: aggregate of rated recipes
 * @api         {get}   /users/:id  Show
 * @apiName     GetUser
 * @apiGroup    User
 * @apiDescription      Request a user's info
 *
 * @apiParam    {String}    id          Id
 *
 * @apiSuccess  {String}    _id             Id
 * @apiSuccess  {String}    userName        Username
 * @apiSuccess  {String}    email           Email address
 * @apiSuccess  {String}    registration    Registration date
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "_id": "5bdfe46d7c9e2801085676bf",
 *      "email": "ciri@ofrivia.com",
 *      "userName": "SilverHair",
 *      "registration": "2018-11-05T06:34:21.286Z",
 *  }
 *
 * @apiError (404)  UserNotFound    User was not found.
 */
router.get('/:id', findUserById, (req, res, next) => {
    return res.status(200).send(req.user);
});

/**
 * @api {get} /users Index
 * @apiName GetUsers
 * @apiGroup User
 * @apiDescription Request a list of users
 *
 * @apiSuccess {Object[]}   users               List of users
 * @apiSuccess {Number}     users.id            Id
 * @apiSuccess {String}     users.email         Email
 * @apiSuccess {String}     users.userName      Username
 * @apiSuccess {DateTime}   users.registration  Registration date
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "users": [
 *          {
 *              "_id": "5bdfe46d7c9e2801085676bf",
 *              "email": "ciri@ofrivia.com",
 *              "userName": "SilverHair",
 *              "registration": "2018-11-05T06:34:21.286Z"
 *          },
 *          {
 *              "_id": "5bdfe0b2de9718419037ddc6",
 *              "email": "geralt@ofrivia.com",
 *              "userName": "TheWeetchr",
 *              "registration": "2018-11-05T06:18:26.360Z",
 *          }
 *      ]
 *  }
 */
router.get('/', (req, res, next) => {
    User.find().sort('userName').exec(function (err, users) {
        if (err) return next(err);
        return res.status(200).send({"users":users});
    });
});

/**
 * @api         {patch}     /users/:id  Update
 * @apiName     PatchUser
 * @apiGroup    User
 * @apiDescription          Update an existing user
 * - The authenticated user can only update itself
 * - The password must be at least 6 characters long and contain at least a number and a letter
 *
 * @apiParam {String}   id          Id
 * @apiParam {String}   password    New password
 *
 * @apiParamExample Request example
 * {
 *     "password": "Yennefer4Ever"
 * }
 *
 * @apiSuccess  (204) UserWasUpdated    User was updated
 *
 * @apiError    (404) UserNotFound      User was not found
 * @apiError    (403) NotAllowed        Authenticated user is not allowed to do this
 * @apiError    (400) PasswordInvalid   Password is invalid
 */
router.patch('/:id', findUserById, (req, res, next) => {
    let user = req.user;
    console.log(user._id);
    console.log(req.userId);
    if(user._id.toString() !== req.userId.toString()) return res.status(403).send('NotAllowed');
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
            return res.status(204).send('UserWasUpdated');
        });
    });
});

/**
 * @api         {delete}    /users/:id  Delete
 * @apiName     DeleteUser
 * @apiGroup    User
 * @apiDescription          Delete a user
 * - The authenticated user can only delete itself
 *
 * @apiParam {String} id    Id
 *
 * @apiSuccess  (204)   UserWasDeleted  User was deleted
 *
 * @apiError    (404)   UserNotFound    User was not found
 */
router.delete('/:id', findUserById, (req, res, next) => {
    let user = req.user;
    if(user._id.toString() !== req.userId.toString()) return res.status(403).send('NotAllowed');
    user.remove(function (err) {
        if (err) return next(err);
        return res.status(204).send('UserWasDeleted');
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