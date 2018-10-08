const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

/* GET existing meal */
router.get('/:id', function(req, res, next) {
    Meal.findById(req.params.id).exec(function(err, meal) {
        if (err) return next(err);
        res.send(meal);
    });
});

/* GET all meals */
router.get('/', function(req, res, next) {
    Meal.find().sort('name').exec(function(err, meals) {
        if (err) return next(err);
        res.send(meals);
    });
});

/* POST new meal */
router.post('/', function(req, res, next) {
    const newMeal = new Meal(req.body);
    newMeal.save(function(err, savedMeal) {
        if (err) return next(err);
        res.send(savedMeal);
    });
});

module.exports = router;