const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');
const Group = require('../models/group');
const Recipe = require('../models/recipe');

/**
 * @api {post}      /meals      Create
 * @apiName         PostMeal
 * @apiGroup        Meal
 * @apiDescription  Create a new meal
 * - All participants must be members of the group
 * - The date must be in the future
 *
 * @apiParam {String}   groupId         Group's id
 * @apiParam {String}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {String[]} participants    Participating users
 * @apiParam {Object}   location        Location of the meal
 * @apiParam {Number}   location.x      x coordinate
 * @apiParam {Number}   location.y      y coordinate
 *
 * @apiParamExample Request example
 * {
 *     "groupId": "5bbb621c4d7da43f508b9d5a",
 *     "recipeId": "7ddd897c4d7da43f508b9d5a",
 *     "date": "2020-11-05T08:12:54",
 *     "participants": ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59"]
 *     "location": {
 *          "x": 6.8394017,
 *          "y": 46.464769
 *      }
 * }
 *
 * @apiSuccess (201) {String}   _id             Id
 * @apiSuccess (201) {String}   groupId         Group's id
 * @apiSuccess (201) {String}   recipeId        Recipe's id
 * @apiSuccess (201) {DateTime} date            Date
 * @apiSuccess (201) {String[]} participants    Participating users
 * @apiSuccess (201) {Object}   location        Location of the meal
 * @apiSuccess (201) {Number}   location.x      x coordinate
 * @apiSuccess (201) {Number}   location.y      y coordinate
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 201 Created
 * {
 *     "_id": "5be05aa8286aae3f3491ec24",
 *     "groupId": "5bbb621c4d7da43f508b9d5a",
 *     "recipeId": "7ddd897c4d7da43f508b9d5a",
 *     "date": "2020-11-05T07:12:54.000Z",
 *     "participants": ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59"]
 *     "location": {
 *          "x": 6.8394017,
 *          "y": 46.464769
 *      }
 * }
 *
 * @apiError (404)  UserNotFound            User was not found
 * @apiError (404)  RecipeNotFound          Recipe was not found
 * @apiError (400)  DateInvalid             Date is invalid
 * @apiError (400)  MissingData             Missing data
 * @apiError (400)  ParticipantsInvalid     Participants are not all members of this group
 */
router.post('/', (req, res, next) => {
    let groupId = req.body.groupId || null;
    let recipeId = req.body.recipeId || null;
    let date = req.body.date || null;
    let participants = req.body.participants || null;
    let location = req.body.location || null;

    if (!groupId || !recipeId || !date || !participants || !participants.length) {
        return res.status(400).send('MissingData');
    }
    let meal = new Meal();

    // Check the date
    let now = Date.now();
    date = Date.parse(date);
    if (date < now) return res.status(400).send('DateInvalid');
    meal.date = date;

    // Check the group
    let checkGroup = new Promise((resolve) => {
        Group.find({_id: groupId}).findOne((err, group) => {
            if (err) return next(err);
            if (!group) return res.status(404).send('GroupNotFound');
            for (let p of participants) {
                if (!group.members.includes(p)) {
                    return res.status(400).send('ParticipantsInvalid');
                }
            }
            meal.groupId = groupId;
            meal.participants = participants;
            return resolve();
        });
    });

    // Check the recipe
    let checkRecipe = new Promise((resolve) => {
        Recipe.find({_id: recipeId}).findOne((err, recipe) => {
            if (err) return next(err);
            if (!recipe) return res.status(404).send('RecipeNotFound');
            meal.recipeId = recipeId;
            return resolve();
        });
    });

    // Assign the location
    meal.location = location;

    Promise.all([checkGroup, checkRecipe]).then(() => {
        meal.save((err, savedMeal) => {
            if (err) return next(err);
            return res.status(201).send(savedMeal);
        });
    })
});

/**
 * @api {get}       /meals/:id  Show
 * @apiName         GetMeal
 * @apiGroup        Meal
 * @apiDescription  Request a meal's info
 *
 * @apiParam    {String}    id              Meal's id
 *
 * @apiSuccess  {String}    _id             Id
 * @apiSuccess  {String}    groupId         Group's id
 * @apiSuccess  {String}    recipeId        Recipe's id
 * @apiSuccess  {DateTime}  date            Date
 * @apiSuccess  {String[]}  participants    Participating users
 * @apiSuccess  {Object}    location        Location of the meal
 * @apiSuccess  {Number}    location.x      x coordinate
 * @apiSuccess  {Number}    location.y      y coordinate
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *     "_id": "5be05aa8286aae3f3491ec24",
 *     "groupId": "5bbb621c4d7da43f508b9d5a",
 *     "recipeId": "7ddd897c4d7da43f508b9d5a",
 *     "date": "2020-11-05T07:12:54.000Z",
 *     "participants": ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59"]
 *     "location": {
 *          "x": 6.8394017,
 *          "y": 46.464769
 *      }
 * }
 *
 * @apiError (404)  MealNotFound    Meal was not found
 * @apiError (403)  NotAllowed      Authenticated user is not participating in the meal
 */
router.get('/:id', findMealById, (req, res) => {
    return res.status(200).send(req.meal);
});

/**
 * @api {get}       /meals      Index
 * @apiName         GetMeals
 * @apiGroup        Meal
 * @apiDescription  Request a list of meals the authenticated user participates in
 *
 * @apiSuccess  {Object[]}  meals               List of meals
 * @apiSuccess  {String}    meals._id           Id
 * @apiSuccess  {String}    meals.groupId       Group's id
 * @apiSuccess  {String}    meals.recipeId      Recipe's id
 * @apiSuccess  {DateTime}  meals.date          Date
 * @apiSuccess  {String[]}  meals.participants  Participating users
 * @apiSuccess  {Object}    location        Location of the meal
 * @apiSuccess  {Number}    location.x      x coordinate
 * @apiSuccess  {Number}    location.y      y coordinate
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 200 OK
 *  {
 *      "meals": [
 *          {
 *              "_id": "5be05aa8286aae3f3491ec24",
 *              "groupId": "5bbb621c4d7da43f508b9d5a",
*               "recipeId": "7ddd897c4d7da43f508b9d5a",
 *              "date": "2020-11-05T07:12:54.000Z",
 *              "participants": ["5bdffb8653618745c0bba83f", "5bbb61284d7da43f508b9d59"],
 *              "location": {
 *                  "x": 6.8394017,
 *                  "y": 46.464769
 *              }
 *          },
 *          {
 *              "_id": "5be060bbfcd6c3145cb42fa0",
 *              "groupId": "5be00126b1dd7244940b9c6d",
 *              "recipeId": "5be01dddca9c3f4e801310c9",
 *              "date": "2020-12-05T07:12:54.000Z",
 *              "participants": ["5bdffb8653618745c0bba83f","5bdffb3d53618745c0bba83e"]
 *              "location": {
 *                  "x": 6.8394017,
 *                  "y": 46.464769
 *              }
 *          }
 *      ]
 *  }
 */
router.get('/', (req, res, next) => {
    Meal.find({participants: req.userId}).sort('name').exec((err, meals) => {
        if (err) return next(err);
        return res.status(200).send({meals:meals});
    });
});

/**
 * @api {patch}     /meals/:id  Update
 * @apiName         PatchMeal
 * @apiGroup        Meal
 * @apiDescription  Update an existing meal
 *
 * @apiParam {String}   id              Meal's id
 * @apiParam {String}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {String[]} participants    Participating users
 * @apiParam {Object}   location        Location of the meal
 * @apiParam {Number}   location.x      x coordinate
 * @apiParam {Number}   location.y      y coordinate
 *
 * @apiParamExample Request example
 *  {
 *      "date": "2020-08-05T07:12:54"
 *  }
 *
 * @apiSuccess (201) {String}   _id             Id
 * @apiSuccess (201) {String}   groupId         Group's id
 * @apiSuccess (201) {String}   recipeId        Recipe's id
 * @apiSuccess (201) {DateTime} date            Date
 * @apiSuccess (201) {String[]} participants    Participating users
 * @apiSuccess (201) {Object}   location        Location of the meal
 * @apiSuccess (201) {Number}   location.x      x coordinate
 * @apiSuccess (201) {Number}   location.y      y coordinate
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *     "_id": "5be05aa8286aae3f3491ec24",
 *     "groupId": "5bbb621c4d7da43f508b9d5a",
 *     "recipeId": "7ddd897c4d7da43f508b9d5a",
 *     "date": "2020-08-05T07:12:54.000Z",
 *     "participants": ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59"],
 *     "location": {
 *          "x": 6.8394017,
 *          "y": 46.464769
 *      }
 * }
 *
 * @apiError (404)  MealNotFound            Meal was not found
 * @apiError (403)  NotAllowed              Authenticated user is not participating in the meal
 * @apiError (404)  UserNotFound            User was not found
 * @apiError (404)  RecipeNotFound          Recipe was not found
 * @apiError (400)  DateInvalid             Date is invalid
 * @apiError (400)  ParticipantsInvalid     Participants are not all members of this group
 */
router.patch('/:id', findMealById, (req, res, next) => {
    let meal = req.meal;
    let recipeId = req.body.recipeId || null;
    let date = req.body.date || null;
    let participants = req.body.participants || null;

    // Check the date
    if(date) {
        let now = Date.now();
        date = Date.parse(date);
        if (date < now) return res.status(400).send('DateInvalid');
        meal.date = date;
    }

    // Check the group
    let checkGroup = new Promise((resolve) => {
        if(!participants) return resolve();
        Group.find({_id: meal.groupId}).findOne((err, group) => {
            if (err) return next(err);
            if (!group) return res.status(404).send('GroupNotFound');
            for (let p of participants) {
                if (!group.members.includes(p)) {
                    return res.status(400).send('ParticipantsInvalid');
                }
            }
            meal.participants = participants;
            return resolve();
        });
    });

    // Check the recipe
    let checkRecipe = new Promise((resolve) => {
        if(!recipeId) return resolve();
        Recipe.find({_id: recipeId}).findOne((err, recipe) => {
            if (err) return next(err);
            if (!recipe) return res.status(404).send('RecipeNotFound');
            meal.recipeId = recipeId;
            return resolve();
        });
    });

    meal.location = location;

    Promise.all([checkGroup, checkRecipe]).then(() => {
        meal.save((err, updatedMeal) => {
            if (err) return next(err);
            return res.status(200).send(updatedMeal);
        });
    })
});

/**
 * @api {delete}    /meals/:id  Delete
 * @apiName         DeleteMeal
 * @apiGroup        Meal
 * @apiDescription  Delete a meal
 *
 * @apiParam {String}   id              Meal's id
 *
 * @apiSuccess  (204)   Success         Meal was deleted
 * @apiError    (404)   MealNotFound    Meal was not found
 * @apiError    (403)   NotAllowed      Authenticated user is not participating in the meal
 */
router.delete('/:id', findMealById, (req, res, next) => {
    req.meal.remove((err) => {
        if (err) return next(err);
        return res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findMealById(req, res, next) {
    Meal.findById(req.params.id).exec(function (err, meal) {
        if (err) return next(err);
        // Checking if meal exists
        if (!meal) return res.status(404).send('GroupNotFound');
        // Checking if current user is participating in that meal
        if (!meal.participants.includes(req.userId)) {
            return res.status(403).send('NotAllowed');
        }
        req.meal = meal;
        next();
    });
}

module.exports = router;