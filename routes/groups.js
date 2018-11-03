const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');
const Recipe = require('../models/recipe');

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
router.get('/:id', getGroup, (req, res) => {
    return res.send(req.group);
});

/**
 * @api {get} /groups Request a list of all groups the user is in
 * @apiName GetGroups
 * @apiGroup Group
 *
 * @apiSuccess {Object[]}   groups               List of groups
 * @apiSuccess {Number}     groups.id            The group's id
 * @apiSuccess {String}     groups.name          The group's name
 */
router.get('/', (req, res, next) => {
    Group.find({members: req.userId}).sort('name').exec((err, groups) => {
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
router.patch('/:id', getGroup, (req, res, next) => {
    let group = req.group;
    let name = req.body.name || null;
    let members = req.body.members || null;
    let recipes = req.body.recipes || null;

    // Update the name
    if (name) {
        if (name.length < 3) return res.status(400).send('NameTooShort');
        else group.name = name;
    }

    // Update the members
    let uM = new Promise((resolve) => {
        if (!members) return resolve(group.members);
        if (members.length < 2) return res.status(400).send('NotEnoughMembers');
        User.where('_id').in(members).find((err, existingMembers) => {
            if (err) return next(err);
            if (members.length !== existingMembers.length) return res.status(404).send('UserNotFound');
            group.members = members;
            return resolve();
        });
    });

    // Update the recipes
    let uR = new Promise((resolve) => {
        if (!recipes) return resolve(group.recipes);
        Recipe.where('_id').in(recipes).find((err, existingRecipes) => {
            if (err) return next(err);
            if (recipes.length !== existingRecipes.length) return res.status(404).send('RecipeNotFound');
            group.recipes = recipes;
            return resolve();
        });
    });

    Promise.all([uM, uR]).then(() => {
        group.save((err, group) => {
            if (err) return next(err);
            return res.status(201).send(group);
        });
    })
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
router.delete('/:id', getGroup, (req, res, next) => {
    req.group.remove(function (err) {
        if (err) return next(err);
        return res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function getGroup(req, res, next) {
    Group.findById(req.params.id).exec(function (err, group) {
        if (err) return next(err);
        // Checking if group exists
        if (!group) return res.status(404).send({error: 'GroupNotFound'});
        // Checking if current user is a member of that group
        if (!group.members.includes(req.userId)) return res.sendStatus(403);
        req.group = group;
        next();
    });
}

module.exports = router;