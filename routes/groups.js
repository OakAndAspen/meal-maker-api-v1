const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');
const Recipe = require('../models/recipe');

/**
 * @api {post}      /groups     Create
 * @apiName         PostGroup
 * @apiGroup        Group
 * @apiDescription  Create a new group
 * - The name must be at least 3 characters long
 * - There must be at least 2 members
 * - If the authenticated user is not listed in the members, it is automatically added
 *
 * @apiParam {String}   name    Group name
 * @apiParam {String[]} members Participating users' ids
 *
 * @apiParamExample Request example
 *  {
 *      "name": "RedBaronCastle",
 *      "members": [
 *          "5bdffb8653618745c0bba83f",
 *          "5bdffb3d53618745c0bba83e"
 *      ]
 *  }
 *
 * @apiSuccess (201) {String}   _id         Id
 * @apiSuccess (201) {String}   name        Name
 * @apiSuccess (201) {String[]} members     Participating users ids
 * @apiSuccess (201) {String[]} recipes     Recipes ids
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 201 Created
 *  {
 *      "_id": "5be00086ba644a266c20906e",
 *      "name": "RedBaronCastle",
 *      "members": [
 *          "5bdffb8653618745c0bba83f",
 *          "5bdffb3d53618745c0bba83e"
 *       ],
 *      "recipes": []
 *  }
 *
 * @apiError (404)  UserNotFound        User was not found
 * @apiError (400)  MissingData         One of the mandatory parameters is missing
 * @apiError (400)  NameTooShort        Name is too short
 * @apiError (400)  NotEnoughMembers    Not enough members in the group
 */
router.post('/', (req, res, next) => {
    let name = req.body.name || null;
    let members = req.body.members || null;

    if (!name || !members) return res.status(400).send('MissingData');
    if (name.length < 3) return res.status(400).send('NameTooShort');

    // Check members
    if (!members.includes(req.userId)) members.push(req.userId);
    members = members.filter((m, i) => members.indexOf(m) === i);
    if (members.length < 2) return res.status(400).send('NotEnoughMembers');

    User.where('_id').in(members).find((err, existingMembers) => {
        if (err) return next(err);
        if (existingMembers.length !== members.length) return res.status(404).send('UserNotFound');

        new Group({name: name, members: members}).save((err, group) => {
            if (err) return next(err);
            return res.status(201).send(group);
        });
    });
});

/**
 * @api {get}       /groups/:id Show
 * @apiName         GetGroup
 * @apiGroup        Group
 * @apiDescription  Request a group's info
 * - The authenticated user must be part of that group
 *
 * @apiParam    {String}    id              Id
 *
 * @apiSuccess {String}     _id              Id
 * @apiSuccess {String}     name            Name
 * @apiSuccess {String[]}   recipes         Recipes
 * @apiSuccess {String[]}   members         Participating users
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "_id": "5be00126b1dd7244940b9c6d",
 *      "name": "RedBaronCastle",
 *      "members": ["5bdffb8653618745c0bba83f","5bdffb3d53618745c0bba83e"],
 *      "recipes": ["6adffb8653618745c0bba83f"]
 *  }
 *
 * @apiError (404)  GroupNotFound   Group was not found
 * @apiError (403)  NotAllowed      Authenticated user is not part of that group
 */
router.get('/:id', getGroup, (req, res) => {
    return res.status(200).send(req.group);
});

/**
 * @api {get}       /groups     Index
 * @apiName         GetGroups
 * @apiGroup        Group
 * @apiDescription  Request a list of all groups the user is in
 *
 * @apiSuccess {Object[]}   groups          List of groups
 * @apiSuccess {String}     groups._id      Id
 * @apiSuccess {String}     groups.name     Name
 * @apiSuccess {String[]}   groups.recipes  Recipes' ids
 * @apiSuccess {String[]}   groups.members  Participating users' ids
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "groups": [
 *          {
 *              "members": ["5bdfe46d7c9e2801085676bf", "5bdffb3d53618745c0bba83e"],
*               "recipes": [],
 *              "_id": "5be004248563073e743b8688",
 *              "name": "KaerMorhenKitchen"
 *          },
 *          {
 *              "members": ["5bdffb8653618745c0bba83f", "5bdffb3d53618745c0bba83e"],
 *              "recipes": [],
 *              "_id": "5be00126b1dd7244940b9c6d",
 *              "name": "RedBaronCastle"
 *          }
 *      ]
 *  }
 */
router.get('/', (req, res, next) => {
    Group.find({members: req.userId}).sort('name').exec((err, groups) => {
        if (err) return next(err);
        return res.status(200).send({'groups': groups});
    });
});

/**
 * @api {patch}     /groups/:id Update
 * @apiName         PatchGroup
 * @apiGroup        Group
 * @apiDescription  Update an existing group
 * - The authenticated user must be part of that group
 * - The name must be at least 3 characters long
 * - There must be at least 2 members
 *
 * @apiParam {String}       id          Id
 * @apiParam {String}       [name]      Name
 * @apiParam {String[]}     [members]   Participating users' ids
 * @apiParam {String[]}     [recipes]   Recipes' ids
 *
 * @apiParamExample Request example
 *  {
 *      "members": [
 *          "5bdfe46d7c9e2801085676bf",
 *          "5bdffb3d53618745c0bba83e",
 *          "5bdffb8653618745c0bba83f"
 *      ]
 *  }
 *
 * @apiSuccess {String}   _id         Id
 * @apiSuccess {String}   name        Name
 * @apiSuccess {String[]} members     Participating users ids
 * @apiSuccess {String[]} recipes     Recipes ids
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "_id": "5be00086ba644a266c20906e",
 *      "name": "RedBaronCastle",
 *      "members": [
 *          "5bdffb8653618745c0bba83f",
 *          "5bdffb3d53618745c0bba83e"
 *       ],
 *      "recipes": []
 *  }
 *
 * @apiError    (404)   GroupNotFound   Group was not found
 * @apiError    (404)   UserNotFound    User was not found
 * @apiError    (404)   RecipeNotFound  Recipe was not found
 * @apiError    (403)   NotAllowed      Authenticated user is not part of that group
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
    let checkMembers = new Promise((resolve) => {
        if (!members) return resolve();
        members = members.filter((m, i) => members.indexOf(m) === i);
        if (members.length < 2) return res.status(400).send('NotEnoughMembers');
        User.where('_id').in(members).find((err, existingMembers) => {
            if (err) return next(err);
            if (members.length !== existingMembers.length) return res.status(404).send('UserNotFound');
            group.members = members;
            return resolve();
        });
    });

    // Update the recipes
    let checkRecipes = new Promise((resolve) => {
        if (!recipes) return resolve();
        recipes = recipes.filter((r, i) => recipes.indexOf(r) === i);
        Recipe.where('_id').in(recipes).find((err, existingRecipes) => {
            if (err) return next(err);
            if (recipes.length !== existingRecipes.length) return res.status(404).send('RecipeNotFound');
            group.recipes = recipes;
            return resolve();
        });
    });

    Promise.all([checkMembers, checkRecipes]).then(() => {
        group.save((err, group) => {
            if (err) return next(err);
            return res.status(200).send(group);
        });
    });
});

/**
 * @api {delete}    /groups:id  Delete
 * @apiName         DeleteGroup
 * @apiGroup        Group
 * @apiDescription  Delete a group
 * - The authenticated user must be part of that group
 *
 * @apiParam {String}   id              Id
 *
 * @apiSuccess  (204)   Success         Group was deleted
 * @apiError    (404)   GroupNotFound   Group was not found
 * @apiError    (403)   NotAllowed      Authenticated user is not part of that group
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
        if (!group.members.includes(req.userId)) return res.status(403).send('NotAllowed');
        req.group = group;
        next();
    });
}

module.exports = router;