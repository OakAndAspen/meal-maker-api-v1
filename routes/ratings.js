const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

/* POST new rating */
router.post('/', (req, res, next) => {
    new Rating(req.body).save(function(err, savedRating) {
        if (err) return next(err);
        res.send(savedRating);
    });
});

/* GET existing rating */
router.get('/:id', findRatingById, (req, res, next) => {
    res.send(req.rating);
});

/* GET all ratings */
router.get('/', (req, res, next) => {
    Rating.find().sort('name').exec(function(err, ratings) {
        if (err) return next(err);
        res.send(ratings);
    });
});

/* PATCH existing rating */
router.patch('/:id', findRatingById, (req, res, next) => {
    req.rating.set(req.body);
    req.rating.save((err, savedRating) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedRating);
    });
});

/* DELETE existing rating */
router.delete('/:id', findRatingById, (req, res, next) => {
    req.rating.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findRatingById(req, res, next) {
    Rating.findById(req.params.id).exec(function(err, rating) {
        if (err) return next(err);
        else if (!rating) return res.status(404).send({
            error: 'No rating found with ID ' + req.params.id
        });
        req.rating = rating;
        next();
    });
}

module.exports = router;