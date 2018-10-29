const express = require('express');
const router = express.Router();
const Group = require('../models/group');

/**
 * @api {post} /groups Create a new group
 * @apiName PostGroup
 * @apiGroup Group
 *
 * @apiParam {String}   name        Group name
 * @apiParam {Object[]} users       Participating users
 * @apiParam {Number}   users.id    User's id
 *
 * @apiSuccess (200)    Success     Group was created.
 *
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 */
router.post('/', (req, res, next) => {
    new Group(req.body).save(function(err, savedGroup) {
        if (err) return next(err);
        res.send(savedGroup);
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
    Group.find().sort('name').exec(function(err, groups) {
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
    req.group.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findGroupById(req, res, next) {
    Group.findById(req.params.id).exec(function(err, group) {
        if (err) return next(err);
        else if (!group) return res.status(404).send({
            error: 'No group found with ID ' + req.params.id
        });
        req.group = group;
        next();
    });
}

module.exports = router;