const express = require('express');
const router = express.Router();
const Group = require('../models/group');

/* POST new group */
router.post('/', (req, res, next) => {
    new Group(req.body).save(function(err, savedGroup) {
        if (err) return next(err);
        res.send(savedGroup);
    });
});

/* GET existing group */
router.get('/:id', findGroupById, (req, res, next) => {
    res.send(req.group);
});

/* GET all groups */
router.get('/', (req, res, next) => {
    Group.find().sort('name').exec(function(err, groups) {
        if (err) return next(err);
        res.send(groups);
    });
});

/* PATCH existing group */
router.patch('/:id', findGroupById, (req, res, next) => {
    req.group.set(req.body);
    req.group.save((err, savedGroup) => {
        if (err) return next(err);
        res.status(200);
        res.send(savedGroup);
    });
});

/* DELETE existing group */
router.delete('/:id', findGroupById, (req, res, next) => {
    req.group.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
});

/* --- Middlewares --- */
function findGroupById(req, res, next) {
    Group.findById(req.params.id).exec(function(err, group) {
        if (err) return next(err);
        else if (!group) return res.status(404).send({
            error: 'No group found with ID ' + req.params.id
        });
        req.group = group;
        next();
    });
}

module.exports = router;