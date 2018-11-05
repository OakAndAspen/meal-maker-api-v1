const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');
const Group = require('../models/group');
const Recipe = require('../models/recipe');

/**
 * @api {post} /meals Create
 * @apiName PostMeal
 * @apiGroup Meal
 * @apiDescription Create a new meal
 * - All participants must be members of the group
 *
 *
 * @apiParam {String}   groupId         Group's id
 * @apiParam {String}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {String[]} participants    Participating users
 *
 * @apiParamExample Request example
 * {
 *     groupId: "5bbb621c4d7da43f508b9d5a",
 *     recipeId: "7ddd897c4d7da43f508b9d5a",
 *     date: "1995-12-17",
 *     participants: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"]
 * }
 *
 * @apiSuccess (201) {String}   groupId         Group's id
 * @apiSuccess (201) {String}   recipeId        Recipe's id
 * @apiSuccess (201) {DateTime} date            Date
 * @apiSuccess (201) {String[]} participants    Participating users
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *     groupId: "5bbb621c4d7da43f508b9d5a",
 *     recipeId: "7ddd897c4d7da43f508b9d5a",
 *     date: "1995-12-17",
 *     participants: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"}]
 * }
 *
 * @apiError (404)  UserNotFound    User was not found
 * @apiError (404)  RecipeNotFound  Recipe was not found
 * @apiError (400)  DateInvalid     Date is invalid
 * @apiError (400)  Missing Data    Missing data
 */
router.post('/', (req, res, next) => {
    let groupId = req.body.groupId || null;
    let recipeId = req.body.recipeId || null;
    let date = req.body.date || null;
    let participants = req.body.participants || null;

    if(!groupId || !recipeId || !date || !participants || !participants.length) {
        return res.status(400).send('MissingData');
    }

    // Create the meal
    let meal = new Meal();

    // TODO: Check the date
    meal.date = date;

    // Check the group
    let checkGroup = new Promise((resolve) => {
        Group.find({_id: groupId}).findOne((err, group) => {
            if (err) return next(err);
            if(!group) return res.status(404).send('GroupNotFound');
            // TODO: check that all participants are in that group
            meal.groupId = groupId;
            return resolve();
        });
    });

    // Check the recipe
    let checkRecipe = new Promise((resolve) => {
        Recipe.find({_id: recipeId}).findOne((err, recipe) => {
            if (err) return next(err);
            if(!recipe) return res.status(404).send('RecipeNotFound');
            meal.recipeId = recipeId;
            return resolve();
        });
    });

    Promise.all([checkGroup, checkRecipe]).then(() => {
        meal.save((err, savedMeal) => {
            if (err) return next(err);
            return res.status(201).send(savedMeal);
        });
    })
});

/**
 * @api {get} /meals/:id Show
 * @apiName GetMeal
 * @apiGroup Meal
 * @apiDescription Request a meal's info
 *
 * @apiParam {String} id    Meal's id
 *
 * @apiSuccess {String}     id                      Id
 * @apiSuccess {Date}       date                    Date
 * @apiSuccess {Object}     recipe                  Recipe
 * @apiSuccess {String}     recipe.id               Recipe'id
 * @apiSuccess {String}     recipe.name             Recipe's name
 * @apiSuccess {Object[]}   participants            Participating users
 * @apiSuccess {String}     participants.id         User's id
 * @apiSuccess {String}     participants.userName   User's name
 *
 * @apiSuccessExample Response example
 * {
 *     id: "5bbb621c4d7da43f508b9d5a",
 *     date: "1995-12-17"
 *     recipe: {
 *          id: "5bbb621c4d7da43f508b9d67d",
 *          name: "Hottest curry every conceived by mankind"
 *     },
 *     participants: {
 *       {id: "5bbb61284d7da43f508b9d59", userName: "Kevin"}
 *       {id: "5bbb61284d7da43f50876zu9", userName: "Grandma"}
 *     }
 * }
 *
 * @apiError (404)  MealNotFound   Meal with id {id} was not found.
 */
router.get('/:id', findMealById, (req, res, next) => {
    return res.status(200).send(req.meal);
});

/**
 * @api {get} /meals Index
 * @apiName GetMeals
 * @apiGroup Meal
 * @apiDescription Request a list of meals
 *
 * @apiParam {String} id    Meal's id
 *
 * @apiSuccess {String}     id                      Id
 * @apiSuccess {Date}       date                    Date
 * @apiSuccess {Object[]}   recipe                  Recipe
 * @apiSuccess {String}     recipe.id               Recipe'id
 * @apiSuccess {String}     recipe.name             Recipe's name
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *     id: "7ddd897c4d7da43f508b9d5a",
 *     date: "2018-11-17",
 *     recipe: {
 *       id: "7ddd897c4d7da43f50878io0",
 *       name: "Fried chicken"
 *     }
 * }
 */
router.get('/', (req, res, next) => {
    Meal.find().sort('name').exec((err, meals) => {
        if (err) return next(err);
        return res.status(200).send(meals);
    });
});

/**
 * @api {patch} /meals/:id  Update
 * @apiName PatchMeal
 * @apiGroup Meal
 * @apiDescription Update an existing meal
 *
 * @apiParam {String}   id              Meal's id
 * @apiParam {String}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {String[]} participants    Participating users
 *
 * @apiParamExample Response example
 * {
 *     recipeId: "7ddd897c4d7da43f508b9d5a",
 *     date: "2018-11-21 19:00:00",
 *     participants: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"]
 * }
 *
 * @apiSuccess (200)    Success     Meal was updated
 *
 * @apiError (404)  UserNotFound    User was not found
 * @apiError (404)  RecipeNotFound  Recipe was not found
 */
router.patch('/:id', findMealById, (req, res, next) => {
    req.meal.set(req.body);
    req.meal.save((err, savedMeal) => {
        if (err) return next(err);
        return res.status(200).send(savedMeal);
    });
});

/**
 * @api {delete} /meals/:id  Delete
 * @apiName DeleteMeal
 * @apiGroup Meal
 * @apiDescription Delete a meal
 *
 * @apiParam {String} id    Meal's id
 *
 * @apiSuccess (200)    Success     Meal was deleted
 *
 * @apiError (404)  MealNotFound   Meal was not found
 */
router.delete('/:id', findMealById, (req, res, next) => {
    req.meal.remove(function(err) {
        if (err) return next(err);
        return res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findMealById(req, res, next) {
    Meal.findById(req.params.id).exec(function(err, meal) {
        if (err) return next(err);
        else if (!meal) return res.status(404).send({
            error: 'No meal found with ID ' + req.params.id
        });
        req.meal = meal;
        next();
    });
}

module.exports = router;