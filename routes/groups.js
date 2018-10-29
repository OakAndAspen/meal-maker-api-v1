const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');

/**
 * @api {post} /groups Create a new group
 * @apiName PostGroup
 * @apiGroup Group
 *
 * @apiParam {String}   name    Group name
 * @apiParam {String[]} members Participating users' ids
 *
 * @apiParamExample
 * {
 *     name: "Stanton family"
 *     members: [5bbb621c4d7da43f508b9d5a, 5bbb61284d7da43f508b9d59, 5bd7083ed584b00d1c768f2e]
 * }
 *
 * @apiSuccess (201) {String}   name        Group name
 * @apiSuccess (201) {String[]} members     Participating users ids
 * @apiSuccess (201) {String[]} recipes     Recipes ids
 *
 * @apiSuccessExample
 * {
 *     name: "Stanton family"
 *     members: [5bbb621c4d7da43f508b9d5a, 5bbb61284d7da43f508b9d59, 5bd7083ed584b00d1c768f2e],
 *     recipes: []
 * }
 *
 * @apiError (404)  UserNotFound        User was not found
 * @apiError (400)  NameTooShort        Name is too short
 * @apiError (400)  NotEnoughMembers    Not enough members in the group
 */
router.post('/', (req, res, next) => {
    let name = req.body.name;
    let membersIds = req.body.members;

    if (!name || name.length < 3) return next({status: 400, message: 'NameTooShort'});
    if (!membersIds.includes(req.userId)) membersIds.push(req.userId);
    if (!membersIds || membersIds.length < 2) return next({status: 400, message: 'NotEnoughMembers'});


    User.where('_id').in(membersIds).find((err, members) => {
        if (err) return next(err);
        if (members.length !== membersIds.length) return next({status: 404, message: 'UserNotFound'});

        new Group({name: name, members: membersIds}).save((err, group) => {
            if (err) return next(err);
            return res.status(201).send(group);
        });
    });
});

/**
 * @api {get} /groups/:id Request a group's info
 * @apiName GetGroup
 * @apiGroup Group
 *
 * @apiSuccess {Number}     id              Id
 * @apiSuccess {String}     name            Name
 * @apiSuccess {Object[]}   recipes         Recipes
 * @apiSuccess {Number}     recipes.id      Recipe's id
 * @apiSuccess {Number}     recipes.name    Recipe's name
 * @apiSuccess {Object[]}   members         Participating users
 * @apiSuccess {Number}     members.id      User's id
 * @apiSuccess {Number}     members.name    User's name
 *
 * @apiError (404)  GroupNotFound   Group with id {id} was not found.
 */
router.get('/:id', findGroupById, (req, res, next) => {
    res.send(req.group);
});

/**
 * @api {get} /groups Request a list of groups
 * @apiName GetGroups
 * @apiGroup Group
 *
 * @apiSuccess {Object[]}   groups               List of groups
 * @apiSuccess {Number}     groups.id            The group's id
 * @apiSuccess {String}     groups.name          The group's name
 */
router.get('/', (req, res, next) => {
    Group.find().sort('name').exec(function (err, groups) {
        if (err) return next(err);
        res.send(groups);
    });
});

/**
 * @api {patch} /groups:id  Update an existing group
 * @apiName PatchGroup
 * @apiGroup Group
 *
 * @apiParam {String}   name        Group name
 * @apiParam {Object[]} users       Participating users
 * @apiParam {Number}   users.id    The user's id
 * @apiParam {Object[]} recipes     The group's recipes
 * @apiParam {Number}   recipes.id  The recipe's id
 *
 * @apiSuccess (200)    Success     Group was updated.
 *
 * @apiError (404)  GroupNotFound   Group with id {id} was not found.
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 * @apiError (404)  RecipeNotFound  Recipe with id {id} was not found.
 */
router.patch('/:id', findGroupById, (req, res, next) => {
    req.group.set(req.body);
    req.group.save((err, savedGroup) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedGroup);
    });
});

/**
 * @api {delete} /groups:id  Delete a group
 * @apiName DeleteGroup
 * @apiGroup Group
 *
 * @apiSuccess (200)    Success     Group was deleted.
 *
 * @apiError (404)  GroupNotFound   Group with id {id} was not found.
 */
router.delete('/:id', findGroupById, (req, res, next) => {
    req.group.remove(function (err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findGroupById(req, res, next) {
    Group.findById(req.params.id).exec(function (err, group) {
        if (err) return next(err);
        else if (!group) return res.status(404).send({
            error: 'No group found with ID ' + req.params.id
        });
        req.group = group;
        next();
    });
}

module.exports = router;