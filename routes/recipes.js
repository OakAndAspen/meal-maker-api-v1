const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Group = require('../models/group');

/**
 * @api {post} /recipes Create a new recipe
 * @apiName PostRecipe
 * @apiGroup Recipe
 *
 * @apiParam {Number}   authorId    Author's id
 * @apiParam {String}   name        Name
 * @apiParam {String}   description Description
 * @apiParam {String}   imgUrl      Image URL
 *
 * @apiParamExample
 * {
 *     authorId: "5bbb621c4d7da43f508b9d5a",
 *     name: "Fancy recipe",
 *     description: "This will be good... probably",
 *     imgUrl: "//cdn.myapp.net/img/jhsdfo4837f.jpg"
 * }
 *
 * @apiSuccess (201) {Number}   authorId    Author's id
 * @apiSuccess (201) {String}   name        Name
 * @apiSuccess (201) {String}   description Description
 * @apiSuccess (201) {String}   imgUrl      Image URL
 *
 * @apiSuccessExample
 * {
 *     authorId: "5bbb621c4d7da43f508b9d5a",
 *     name: "Fancy recipe",
 *     description: "This will be good... probably",
 *     imgUrl: "https://cdn.myapp.net/img/jhsdfo4837f.jpg"
 * }
 *
 * @apiError (404)  UserNotFound        User was not found
 * @apiError (404)  NameTooShort        Name is too short
 * @apiError (404)  DescriptionTooShort Description is too short
 */
router.post('/', (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;
    let servings = req.body.servings;

    if (!name || name.length < 3) return res.status(400).send('NameTooShort');
    if (!description) return res.status(400).send('NoDescription');
    if (!imageUrl) return res.status(400).send('NoImageUrl');
    if (!servings || servings < 1) return res.status(400).send('ServingsInvalid');

    let newRecipe = new Recipe({
        authorId: req.userId,
        name: name,
        description: description,
        imageUrl: imageUrl,
        servings: req.servings
    });

    newRecipe.save((err, recipe) => {
        if (err) return next(err);
        return res.status(201).send(recipe);
    });
});

/**
 * @api {get} /recipes/:id Request a recipe's info
 * @apiName GetRecipe
 * @apiGroup Recipe
 *
 * @apiParamSuccess
 * {
 *     id: "5bbb621c4d7da43f508b9d5a"
 * }
 *
 * @apiSuccess {String}     id                  Id
 * @apiSuccess {String}     name                Name
 * @apiSuccess {Object}     author              Author
 * @apiSuccess {String}     author.id           The author's id
 * @apiSuccess {String}     author.userName     The author's name
 * @apiSuccess {String}     description         Description
 * @apiSuccess {String}     imgUrl              Image URL
 *
 * @apiSuccessExample
 * {
 *   id: "5bbb621c4d7da43f508b9d5a",
 *   name: "Fancy recipe for fancy people",
 *   author: {
 *     id: "7zui621c4d7da43f508b9d5a",
 *     userName: "Dad"
 *   },
 *   description: "This is probably good, or so they say",
 *   imgUrl: "https://cdn.myapp.net/img/jhsdfo4837f.jpg"
 * }
 *
 * @apiError (404)  RecipeNotFound    Recipe with id {id} was not found.
 */
router.get('/:id', findRecipeById, (req, res, next) => {
    res.send(req.recipe);
});

/**
 * @api {get} /recipes Request a list of recipes, optionally filtered by
 *  - group (only the recipes that have been added to the given group)
 *  - author (only the recipes that have been created by the given user)
 *  - current user (only the recipes that the current user has rated)
 * @apiName GetRecipes
 * @apiGroup Recipe
 *
 * @apiParam {String}   filter      The kind of filter to use ("group", "author" or "user")
 * @apiParam {String}   authorId    Author's id
 * @apiParam {String}   groupId     Group's id
 *
 * @apiSuccess {Object[]}   recipes                 List of recipes
 * @apiSuccess {Number}     recipes.id              The recipe's id
 * @apiSuccess {String}     recipes.name            The recipe's name
 * @apiSuccess {Object}     recipes.author          The recipe's author
 * @apiSuccess {String}     recipes.author.id       The author's id
 * @apiSuccess {String}     recipes.author.userName The author's username
 *
 * @apiSuccessExample
 * {
 *     recipes: [
 *       {
 *          id: "7zui621c4d7da43f508b9d5a",
 *          name: "Recipe 1",
 *          author: {
 *            id: "5bbb621c4d7da43f508b9d5a",
 *            userName: "TheGreatJoe"
 *          }
 *        }
 *     ]
 * }
 */
router.get('/', (req, res, next) => {
    let filter = req.body.filter;

    // Get recipes filtered by group
    if (filter === 'group') {
        let groupId = req.body.groupId;
        if (!groupId) return res.status(400).send('NoGroupId');
        Group.where({_id: groupId}).findOne((err, group) => {
            if (err) return next(err);
            if (!group) return res.status(400).send('GroupNotFound');
            Recipe.find().where('_id').in(group.recipes).sort('name').exec((err, recipes) => {
                if (err) return next(err);
                return res.status(200).send(recipes);
            });
        });
    }
    // Get recipes filtered by author
    else if (filter === 'author') {
        let authorId = req.body.authorId;
        if (!authorId) return res.status(400).send('NoAuthorId');
        Recipe.find({authorId: authorId}).sort('name').exec((err, recipes) => {
            if (err) return next(err);
            return res.status(200).send(recipes);
        });
    }
    // Get recipes filtered by current user
    else if (filter === 'user') {
        let userId = req.userId;
        Recipe.find({'ratings.userId': userId}).sort('name').exec((err, recipes) => {
            if (err) return next(err);
            return res.status(200).send(recipes);
        });
    }

});

/**
 * @api {patch} /recipes/:id  Update an existing recipe
 * @apiName PatchRecipe
 * @apiGroup Recipe
 *
 * @apiParamExample
 * {
 *     id: "7zui621c4d7da43f508b9d5a
 * }
 *
 * @apiParam {String}   name                Name
 * @apiParam {String}   description         Description
 * @apiParam {String}   imgUrl              Image URL
 * @apiParam {Object[]} ratings             Ratings
 * @apiParam {Number}   ratings.userId      Rating's user's id
 * @apiParam {Number}   ratings.health      Rating's health value
 * @apiParam {Number}   ratings.taste       Rating's taste value
 *
 * @apiParamExample
 * {
 *     name: "Recipe's name",
 *     description: "Some awesome recipe",
 *     imgUrl: "https://images.xyz/image.jpg",
 *     ratings: [
 *       {userId: "5bbb621c4d7da43f508b9d5a", health: 5, taste: 2}
 *       {userId: "5bbb61284d7da43f508b9d59", health: 1, taste: 5}
 *     ]
 * }
 *
 * @apiSuccess (200)    Success     Recipe was updated.
 *
 * @apiError (404)  RecipeNotFound   Recipe with id {id} was not found.
 */
router.patch('/:id', findRecipeById, (req, res, next) => {
    let recipe = req.recipe;
    let name = req.body.name;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;
    let servings = req.body.servings;

    if (name) {
        if (name.length < 3) return res.status(400).send('NameTooShort');
        recipe.name = name;
    }
    if (description) recipe.description = description;
    if (imageUrl) recipe.imageUrl = imageUrl;
    if (servings) {
        if (servings < 1) return res.status(400).send('ServingsInvalid');
        recipe.servings = servings;
    }

    recipe.save((err, savedRecipe) => {
        if (err) return next(err);
        return res.status(200).send(savedRecipe);
    });
});

/**
 * @api {delete} /recipes/:id  Delete a recipe
 * @apiName DeleteRecipe
 * @apiGroup Recipe
 *
 * @apiParamExample
 * {
 *     id: "7zui621c4d7da43f508b9d5a"
 * }
 *
 * @apiSuccess (200)    Success     Recipe was deleted.
 *
 * @apiError (404)  RecipeNotFound   Recipe with id {id} was not found.
 */
router.delete('/:id', findRecipeById, (req, res, next) => {
    if(req.recipe.authorId !== req.userId) res.sendStatus(403);
    req.recipe.remove(function (err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findRecipeById(req, res, next) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        if (err) return next(err);
        else if (!recipe) return res.status(404).send('RecipeNotFound');
        req.recipe = recipe;
        next();
    });
}

module.exports = router;