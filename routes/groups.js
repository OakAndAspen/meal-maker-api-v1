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
 *     members: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"]
 * }
 *
 * @apiSuccess (201) {String}   name        Group name
 * @apiSuccess (201) {String[]} members     Participating users ids
 * @apiSuccess (201) {String[]} recipes     Recipes ids
 *
 * @apiSuccessExample
 * {
 *     name: "Stanton family",
 *     members: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"],
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

    if (!name || name.length < 3) return res.status(400).send('NameTooShort');
    if (!membersIds.includes(req.userId)) membersIds.push(req.userId);
    if (!membersIds || membersIds.length < 2) return res.status(400).send('NotEnoughMembers');

    User.where('_id').in(membersIds).find((err, members) => {
        if (err) return next(err);
        if (members.length !== membersIds.length) return res.status(404).send('UserNotFound');

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
 * @apiParam {String} id Group id
 *
 * @apiParamExample
 * {
 *    id: "7cd5621c4d7da43f508b9d5a"
 * }
 *
 * @apiSuccess {String}     id              Id
 * @apiSuccess {String}     name            Name
 * @apiSuccess {Object[]}   recipes         Recipes
 * @apiSuccess {String}     recipes.id      Recipe's id
 * @apiSuccess {String}     recipes.name    Recipe's name
 * @apiSuccess {Object[]}   members         Participating users
 * @apiSuccess {String}     members.id      User's id
 * @apiSuccess {String}     members.name    User's name
 *
 * @apiSuccessExample
 * {
 *     id: "7zui621c4d7da43f508b9d5a",
 *     name: "The group of awesome",
 *     recipes: [
 *       {id: "7zui621c4d7da43f508b9d5a", name: "Some recipe"},
 *       {id: "7zui621c4d7da43f508b9d4d", name: "Some other recipe"}
 *     ],
 *     members: [
 *       {id: "5ccc621c4d7da43f508b9d5a", name: "Dad"}
 *       {id: "5ccc621c4d7da43f508b6f8g", name: "Mom"}
 *     ]
 * }
 *
 * @apiError (404)  GroupNotFound   Group was not found
 */
router.get('/:id', getGroup, (req, res) => {
    return res.send(req.group);
});

/**
 * @api {get} /groups Request a list of all groups the user is in
 * @apiName GetGroups
 * @apiGroup Group
 *
 * @apiSuccess {Object[]}   groups          List of groups
 * @apiSuccess {String}     groups.id       Group's id
 * @apiSuccess {String}     groups.name     Group's name
 * @apiSuccess {String[]}   groups.recipes  Group's recipes' ids
 * @apiSuccess {String[]}   groups.members  Group's participating users' ids
 *
 * @apiSuccessExample
 * {
 *      groups: [
 *          {
 *              id: "7zui621c4d7da43f508b9d5a",
 *              name: "The group of awesome",
 *              recipes: ["7zui621c4d7da43f508b9d5a", "7zui621c4d7da43f508b9d4d"],
 *              members: ["5ccc621c4d7da43f508b9d5a", "5ccc621c4d7da43f508b6f8g"]
 *          },
 *          {
 *              id: "da43f508b9d5a5ccc621c4d7",
 *              name: "The best group",
 *              recipes: ["5ccc621c4d7da43f508b9d5a", "7zui621c4d7da43f508b9d4d"],
 *              members: ["7zui621c4d7da43f508b9d4d", "5ccc621c4d7da43f508b6f8g"]
 *          }
 *      ]
 * }
 */
router.get('/', (req, res, next) => {
    Group.find({members: req.userId}).sort('name').exec((err, groups) => {
        if (err) return next(err);
        res.send(groups);
    });
});

/**
 * @api {patch} /groups/:id  Update an existing group
 * @apiName PatchGroup
 * @apiGroup Group
 *
 * @apiParam {String}       id          Group's id
 * @apiParam {String}       name        Group name
 * @apiParam {String[]}     members     Participating users' ids
 * @apiParam {String[]}     recipes     The group's recipes' ids
 *
 * @apiParamExample
 * {
 *     name: "Group's name",
 *     members: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59"],
 *     recipes: ["7zui621c4d7da43f508b9d5a", "7zui621c4d7da43f508b9d5a"]
 * }
 *
 * @apiSuccess (200)    Success     Group was updated
 *
 * @apiError (404)  GroupNotFound   Group was not found
 * @apiError (404)  UserNotFound    User was not found
 * @apiError (404)  RecipeNotFound  Recipe was not found
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
 * @apiParamExample
 * {
 *     id: "5bbb621c4d7da43f508b9d5a"
 * }
 *
 * @apiSuccess (200)    Success     Group was deleted.
 *
 * @apiError (404)  GroupNotFound   Group was not found.
 */
router.delete('/:id', getGroup, (req, res, next) => {
    req.group.remove(function (err) {
        if (err) return next(err);
        return res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function getGroup(req, res, next) {
    Group.findById(req.params.id).exec((err, group) => {
        if (err) return next(err);
        // Checking if group exists
        if (!group) return res.status(404).send('GroupNotFound');
        // Checking if current user is a member of that group
        if (!group.members.includes(req.userId)) return res.sendStatus(403);
        req.group = group;
        next();
    });
}

module.exports = router;