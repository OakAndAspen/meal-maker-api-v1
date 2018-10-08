const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

/* POST new meal */
router.post('/', (req, res, next) => {
    new Meal(req.body).save(function(err, savedMeal) {
        if (err) return next(err);
        res.send(savedMeal);
    });
});

/* GET existing meal */
router.get('/:id', findMealById, (req, res, next) => {
    res.send(req.meal);
});

/* GET all meals */
router.get('/', (req, res, next) => {
    Meal.find().sort('name').exec(function(err, meals) {
        if (err) return next(err);
        res.send(meals);
    });
});

/* PATCH existing meal */
router.patch('/:id', findMealById, (req, res, next) => {
    req.meal.set(req.body);
    req.meal.save((err, savedMeal) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedMeal);
    });
});

/* DELETE existing meal */
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