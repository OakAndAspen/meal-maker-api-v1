const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Group = require('../models/group');

/**
 * @api {post}  /recipes Create
 * @apiName     PostRecipe
 * @apiGroup    Recipe
 * @apiDescription Create a new recipe
 * - The authenticated user will be used as author
 * - The name must be at least 3 characters long
 * - The servings amount must be >= 1
 *
 * @apiParam {String}   name        Name
 * @apiParam {String}   description Description
 * @apiParam {String}   imageUrl    Image URL
 * @apiParam {Number}   servings    Servings amount
 *
 * @apiParamExample Request example
 * {
 *     "name": "Werewolf soup",
 *     "description": "A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.",
 *     "imageUrl": "//cdn.myapp.net/img/jhsdfo4837f.jpg",
 *     "servings": 4
 * }
 *
 * @apiSuccess (201) {String}   _id             Id
 * @apiSuccess (201) {String}   authorId        Author user's id
 * @apiSuccess (201) {String}   name            Name
 * @apiSuccess (201) {String}   description     Description
 * @apiSuccess (201) {String}   imageUrl        Image URL
 * @apiSuccess (201) {Number}   servings        Servings
 * @apiSuccess (201) {Object[]} ratings         Users ratings of this recipe
 * @apiSuccess (201) {String}   ratings.userId  Rating's user's is
 * @apiSuccess (201) {Number}   ratings.health  Health rating
 * @apiSuccess (201) {Number}   ratings.taste   Taste rating
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 201 Created
 *  {
 *      "_id": "5be01b75570f034068fc97af",
 *      "authorId": "5bdffb3d53618745c0bba83e",
 *      "name": "Werewolf soup",
 *      "description": "A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.",
 *      "imageUrl": "//cdn.myapp.net/img/jhsdfo4837f.jpg",
 *      "servings": 4,
 *      "ratings": [],
 *  }
 *
 * @apiError (404)  UserNotFound        User was not found
 * @apiError (400)  MissingData         One of the mandatory parameters is missing
 * @apiError (400)  NameTooShort        Name is too short
 * @apiError (400)  ServingsInvalid     The servings amount is not valid
 */
router.post('/', (req, res, next) => {
    let name = req.body.name || null;
    let description = req.body.description || null;
    let imageUrl = req.body.imageUrl || null;
    let servings = req.body.servings || null;

    if (!name || !description || !imageUrl || !servings) return res.status(400).send('MissingData');
    if (name.length < 3) return res.status(400).send('NameTooShort');
    if (isNaN(servings) || servings < 1) return res.status(400).send('ServingsInvalid');

    let newRecipe = new Recipe({
        authorId: req.userId,
        name: name,
        description: description,
        imageUrl: imageUrl,
        servings: servings
    });

    newRecipe.save((err, recipe) => {
        if (err) return next(err);
        return res.status(201).send(recipe);
    });
});

/**
 * @api {get} /recipes/:id Show
 * @apiName GetRecipe
 * @apiGroup Recipe
 * @apiDescription Request a recipe's info
 *
 * @apiParam {String} id    Id
 *
 * @apiSuccess {String}     id                  Id
 * @apiSuccess {String}     name                Name
 * @apiSuccess {Object}     author              Author
 * @apiSuccess {String}     author.id           The author's id
 * @apiSuccess {String}     author.userName     The author's name
 * @apiSuccess {String}     description         Description
 * @apiSuccess {String}     imgUrl              Image URL
 *
 * @apiSuccessExample Response example
 * HTTP/1.1 200 OK
 * {
 *   _id: "5bbb621c4d7da43f508b9d5a",
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
 * @api {get}   /recipes Index
 * @apiName     GetRecipes
 * @apiGroup    Recipe
 * @apiDescription Request a list of recipes, paginated, with a max. of 5 recipes per page
 *
 * @apiParam {Number}   page        The current page, showing max. 5 results
 *
 * @apiParamExample Request example
 * {
 *      page: 2
 * }
 *
 * @apiSuccess {Object[]}   recipes                 List of recipes
 * @apiSuccess {String}     recipes._id             Id
 * @apiSuccess {String}     recipes.authorId        Author user's id
 * @apiSuccess {String}     recipes.name            Name
 * @apiSuccess {String}     recipes.description     Description
 * @apiSuccess {String}     recipes.imageUrl        Image URL
 * @apiSuccess {Number}     recipes.servings        Servings
 * @apiSuccess {Object[]}   recipes.ratings         Users ratings of this recipe
 * @apiSuccess {String}     recipes.ratings.userId  Rating's user's is
 * @apiSuccess {Number}     recipes.ratings.health  Health rating
 * @apiSuccess {Number}     recipes.ratings.taste   Taste rating
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 201 Created
 *  {
 *      "recipes": [
 *          {
 *              "_id": "5be01b75570f034068fc97af",
 *              "authorId": "5bdffb3d53618745c0bba83e",
 *              "name": "Werewolf soup",
 *              "description": "A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.",
 *              "imageUrl": "//cdn.myapp.net/img/jhsdfo4837f.jpg",
 *              "servings": 4,
 *              "ratings": []
 *          },
 *          {
 *              "_id": "5be01dddca9c3f4e801310c9",
 *              "authorId": "5bdffb3d53618745c0bba83e",
 *              "name": "Griffin soup",
 *              "description": "A witcher delicacy! Juste take the eyes and claws of your freshly killed griffin and boil them in orange juice.",
 *              "imageUrl": "//cdn.myapp.net/img/jhso4837f.jpg",
 *              "servings": 10,
 *              "ratings": []
 *          }
 *      ]
 *  }
 *
 */
router.get('/', (req, res, next) => {
    Recipe.find({}).exec((err, recipes) => {
        if (err) return next(err);
        return res.status(200).send({recipes:recipes});
    });
});

/**
 * @api {get}   /recipes/filtered/:filter    Filter
 * @apiName     GetRecipes
 * @apiGroup    Recipe
 * @apiDescription Request a list of recipes, paginated and optionally filtered by
 *  - group (only the recipes that have been added to the given group)
 *  - author (only the recipes that have been created by the given user)
 *  - current user (only the recipes that the current user has rated)
 *
 * @apiParam {String}   filter      The kind of filter to use ("group", "author" or "user")
 * @apiParam {Number}   page        The current page, showing max. 5 results
 * @apiParam {String}   authorId    Author's id
 * @apiParam {String}   groupId     Group's id
 *
 * @apiParamExample Request example
 * {
 *      filter; "group",
 *      page: 2,
 *      groupId: "5bbb621c4d7da43f508b9d5a",
 * }
 *
 * @apiSuccess {Object[]}   recipes                 List of recipes
 * @apiSuccess {String}     recipes._id             Id
 * @apiSuccess {String}     recipes.authorId        Author user's id
 * @apiSuccess {String}     recipes.name            Name
 * @apiSuccess {String}     recipes.description     Description
 * @apiSuccess {String}     recipes.imageUrl        Image URL
 * @apiSuccess {Number}     recipes.servings        Servings
 * @apiSuccess {Object[]}   recipes.ratings         Users ratings of this recipe
 * @apiSuccess {String}     recipes.ratings.userId  Rating's user's is
 * @apiSuccess {Number}     recipes.ratings.health  Health rating
 * @apiSuccess {Number}     recipes.ratings.taste   Taste rating
 *
 * @apiSuccessExample Response example
 *  HTTP/1.1 201 Created
 *  {
 *      "recipes": [
 *          {
 *              "_id": "5be01b75570f034068fc97af",
 *              "authorId": "5bdffb3d53618745c0bba83e",
 *              "name": "Werewolf soup",
 *              "description": "A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.",
 *              "imageUrl": "//cdn.myapp.net/img/jhsdfo4837f.jpg",
 *              "servings": 4,
 *              "ratings": []
 *          },
 *          {
 *              "_id": "5be01dddca9c3f4e801310c9",
 *              "authorId": "5bdffb3d53618745c0bba83e",
 *              "name": "Griffin soup",
 *              "description": "A witcher delicacy! Juste take the eyes and claws of your freshly killed griffin and boil them in orange juice.",
 *              "imageUrl": "//cdn.myapp.net/img/jhso4837f.jpg",
 *              "servings": 10,
 *              "ratings": []
 *          }
 *      ]
 *  }
 *
 */
router.get('/filtered/:filter', (req, res, next) => {
    let filter = req.params.id;

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
 * @api {patch} /recipes/:id Update
 * @apiName PatchRecipe
 * @apiGroup Recipe
 * @apiDescription Update an existing recipe
 * - The authenticated user must be the author of the recipe
 *
 * @apiParam {String}   name                Name
 * @apiParam {String}   description         Description
 * @apiParam {String}   imgUrl              Image URL
 * @apiParam {Object[]} ratings             Ratings
 * @apiParam {Number}   ratings.userId      Rating's user's id
 * @apiParam {Number}   ratings.health      Rating's health value
 * @apiParam {Number}   ratings.taste       Rating's taste value
 *
 * @apiParamExample Request example
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
 * @apiError (404)  RecipeNotFound   Recipe was not found.
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
 * @api {delete} /recipes/:id  Delete
 * @apiName DeleteRecipe
 * @apiGroup Recipe
 * @apiDescription Delete a recipe
 * - The authenticated user must be the author of the recipe
 *
 * @apiParam {String} id    Recipe's id
 *
 * @apiSuccess (200)    Success     Recipe was deleted
 *
 * @apiError (404)  RecipeNotFound   Recipe was not found
 */
router.delete('/:id', findRecipeById, (req, res, next) => {
    if (req.recipe.authorId !== req.userId) res.sendStatus(403);
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