const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

/* GET existing recipe */
router.get('/:id', function(req, res, next) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        if (err) return next(err);
        res.send(recipe);
    });
});

/* GET all recipes */
router.get('/', function(req, res, next) {
    Recipe.find().sort('name').exec(function(err, recipes) {
        if (err) return next(err);
        res.send(recipes);
    });
});

/* POST new recipe */
router.post('/', function(req, res, next) {
    const newRecipe = new Recipe(req.body);
    newRecipe.save(function(err, savedRecipe) {
        if (err) return next(err);
        res.send(savedRecipe);
    });
});

module.exports = router;