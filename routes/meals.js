const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

/**
 * @api {post} /meals Create a new meal
 * @apiName PostMeal
 * @apiGroup Meal
 *
 * @apiParam {String}   groupId         Group's id
 * @apiParam {String}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {String[]} participants    Participating users
 *
 * @apiParamExample
 * {
 *     groupId: "5bbb621c4d7da43f508b9d5a",
 *     recipeId: "7ddd897c4d7da43f508b9d5a",
 *     date: "1995-12-17",
 *     participants: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"]
 * }
 *
 * @apiSuccess (201) {Number}   groupId         Group's id
 * @apiSuccess (201) {Number}   recipeId        Recipe's id
 * @apiSuccess (201) {DateTime} date            Date
 * @apiSuccess (201) {String[]} participants    Participating users
 *
 * @apiSuccessExample
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
 * @apiError (400)  NoParticipants  No participants
 */
router.post('/', (req, res, next) => {
    new Meal(req.body).save(function(err, meal) {
        if (err) return next(err);
        return res.status(201).send(meal);
    });
});

/**
 * @api {get} /meals/:id Request a meal's info
 * @apiName GetMeal
 * @apiGroup Meal
 *
 * @apiParamExample
 * {
 *     id: 5ccc621c4d7da43f508b9d5a
 * }
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
 * @apiSuccessExample
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
    res.send(req.meal);
});

/**
 * @api {get} /meals Request a list of meals
 * @apiName GetMeals
 * @apiGroup Meal
 *
 * @apiSuccess {String}     id                      Id
 * @apiSuccess {Date}       date                    Date
 * @apiSuccess {Object[]}   recipe                  Recipe
 * @apiSuccess {String}     recipe.id               Recipe'id
 * @apiSuccess {String}     recipe.name             Recipe's name
 *
 * @apiSuccessExample
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
    Meal.find().sort('name').exec(function(err, meals) {
        if (err) return next(err);
        res.send(meals);
    });
});

/**
 * @api {patch} /meals/:id  Update an existing meal
 * @apiName PatchMeal
 * @apiGroup Meal
 *
 * @apiParam {Number}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {String[]} participants    Participating users
 *
 * @apiParamExample
 * {
 *     id: "7ddd897c4d7da43f508b9d5a",
 *     date: "2018-11-21",
 *     participants: ["5bbb621c4d7da43f508b9d5a", "5bbb61284d7da43f508b9d59", "5bd7083ed584b00d1c768f2e"]
 * }
 *
 * @apiSuccess (200)    Success     Group was updated.
 *
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 * @apiError (404)  RecipeNotFound  Recipe with id {id} was not found.
 */
router.patch('/:id', findMealById, (req, res, next) => {
    req.meal.set(req.body);
    req.meal.save((err, savedMeal) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedMeal);
    });
});

/**
 * @api {delete} /meals/:id  Delete a meal
 * @apiName DeleteMeal
 * @apiGroup Meal
 *
 * @apiParamExample
 * {
 *     id: 5ccc621c4d7da43f508b9d5a
 * }
 *
 * @apiSuccess (200)    Success     Meal was deleted.
 *
 * @apiError (404)  MealNotFound   Meal with id {id} was not found.
 */
router.delete('/:id', findMealById, (req, res, next) => {
    req.meal.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(204);
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