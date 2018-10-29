const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

/**
 * @api {post} /recipes Create a new recipe
 * @apiName PostRecipe
 * @apiGroup Recipe
 *
 * @apiParam {Number}   authorId    The recipe's author's id
 * @apiParam {String}   name        The recipe's name
 * @apiParam {String}   description The recipe's description
 * @apiParam {String}   imgUrl      The recipe's image url
 *
 * @apiSuccess (200)    Success     Recipe was created.
 *
 * @apiError (404)  UserNotFound    User with id {id} was not found.
 */
router.post('/', (req, res, next) => {
    new Recipe(req.body).save(function(err, savedRecipe) {
        if (err) return next(err);
        res.send(savedRecipe);
    });
});

/**
 * @api {get} /recipes/:id Request a recipe's info
 * @apiName GetRecipe
 * @apiGroup Recipe
 *
 * @apiSuccess {Number}     id                  Id
 * @apiSuccess {String}     name                Name
 * @apiSuccess {Object[]}   author              Author
 * @apiSuccess {Number}     author.id           The author's id
 * @apiSuccess {String}     author.userName     The author's name
 * @apiSuccess {String}     description         Description
 * @apiSuccess {String}     imgUrl              Image URL
 *
 * @apiError (404)  RecipeNotFound    Recipe with id {id} was not found.
 */
router.get('/:id', findRecipeById, (req, res, next) => {
    res.send(req.recipe);
});

/**
 * @api {get} /recipes Request a list of recipes
 * @apiName GetRecipes
 * @apiGroup Recipe
 *
 * @apiSuccess {Object[]}   recipes                 List of recipes
 * @apiSuccess {Number}     recipes.id              The recipe's id
 * @apiSuccess {String}     recipes.name            The recipe's name
 * @apiSuccess {Object[]}   recipes.author          The recipe's author
 * @apiSuccess {Number}     recipes.author.id       The author's id
 * @apiSuccess {Number}     recipes.author.userName The author's username
 */
router.get('/', (req, res, next) => {
    Recipe.find().sort('name').exec(function(err, recipes) {
        if (err) return next(err);
        res.send(recipes);
    });
});

/**
 * @api {patch} /recipes:id  Update an existing recipe
 * @apiName PatchRecipe
 * @apiGroup Recipe
 *
 * @apiParam {String}   name                Name
 * @apiParam {String}   description         Description
 * @apiParam {String}   imgUrl              Image URL
 * @apiParam {Object[]} ratings             Ratings
 * @apiParam {Number}   ratings.userId      Rating's user's id
 * @apiParam {Number}   ratings.health      Rating's health value
 * @apiParam {Number}   ratings.taste       Rating's taste value
 *
 * @apiSuccess (200)    Success     Recipe was updated.
 *
 * @apiError (404)  RecipeNotFound   Recipe with id {id} was not found.
 */
router.patch('/:id', findRecipeById, (req, res, next) => {
    req.recipe.set(req.body);
    req.recipe.save((err, savedRecipe) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedRecipe);
    });
});

/**
 * @api {delete} /recipes:id  Delete a recipe
 * @apiName DeleteRecipe
 * @apiGroup Recipe
 *
 * @apiSuccess (200)    Success     Recipe was deleted.
 *
 * @apiError (404)  RecipeNotFound   Recipe with id {id} was not found.
 */
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