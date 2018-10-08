const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

/* POST new recipe */
router.post('/', (req, res, next) => {
    new Recipe(req.body).save(function(err, savedRecipe) {
        if (err) return next(err);
        res.send(savedRecipe);
    });
});

/* GET existing recipe */
router.get('/:id', findRecipeById, (req, res, next) => {
    res.send(req.recipe);
});

/* GET all recipes */
router.get('/', (req, res, next) => {
    Recipe.find().sort('name').exec(function(err, recipes) {
        if (err) return next(err);
        res.send(recipes);
    });
});

/* PATCH existing recipe */
router.patch('/:id', findRecipeById, (req, res, next) => {
    req.recipe.set(req.body);
    req.recipe.save((err, savedRecipe) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedRecipe);
    });
});

/* DELETE existing recipe */
router.delete('/:id', findRecipeById, (req, res, next) => {
    req.recipe.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findRecipeById(req, res, next) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        if (err) return next(err);
        else if (!recipe) return res.status(404).send({
            error: 'No recipe found with ID ' + req.params.id
        });
        req.recipe = recipe;
        next();
    });
}

module.exports = router;