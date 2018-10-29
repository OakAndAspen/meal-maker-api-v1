const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

/**
 * @api {post} /meals Create a new meal
 * @apiName PostMeal
 * @apiGroup Meal
 *
 * @apiParam {Number}   groupId         Group's id
 * @apiParam {Number}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {Object[]} participants    Participating users
 * @apiParam {Number}   participants.id User's id
 *
 * @apiSuccess (201) {Number}   groupId         Group's id
 * @apiSuccess (201) {Number}   recipeId        Recipe's id
 * @apiSuccess (201) {DateTime} date            Date
 * @apiSuccess (201) {Object[]} participants    Participating users
 * @apiSuccess (201) {Number}   participants.id User's id
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
 * @apiSuccess {Number}     id                      Id
 * @apiSuccess {Date}       date                    Date
 * @apiSuccess {Object[]}   recipe                  Recipe
 * @apiSuccess {Number}     recipe.id               Recipe'id
 * @apiSuccess {String}     recipe.name             Recipe's name
 * @apiSuccess {Object[]}   participants            Participating users
 * @apiSuccess {Number}     participants.id         User's id
 * @apiSuccess {Number}     participants.userName   User's name
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
 * @apiSuccess {Number}     id                      Id
 * @apiSuccess {Date}       date                    Date
 * @apiSuccess {Object[]}   recipe                  Recipe
 * @apiSuccess {Number}     recipe.id               Recipe'id
 * @apiSuccess {String}     recipe.name             Recipe's name
 */
router.get('/', (req, res, next) => {
    Meal.find().sort('name').exec(function(err, meals) {
        if (err) return next(err);
        res.send(meals);
    });
});

/**
 * @api {patch} /meals:id  Update an existing meal
 * @apiName PatchMeal
 * @apiGroup Meal
 *
 * @apiParam {Number}   recipeId        Recipe's id
 * @apiParam {DateTime} date            Date
 * @apiParam {Object[]} participants    Participating users
 * @apiParam {Number}   participants.id User's id
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
 * @api {delete} /meals:id  Delete a meal
 * @apiName DeleteMeal
 * @apiGroup Meal
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