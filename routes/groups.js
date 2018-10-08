const express = require('express');
const router = express.Router();
const Group = require('../models/group');

/* GET existing group */
router.get('/:id', function(req, res, next) {
    Group.findById(req.params.id).exec(function(err, group) {
        if (err) return next(err);
        res.send(group);
    });
});

/* GET all groups */
router.get('/', function(req, res, next) {
    Group.find().sort('name').exec(function(err, groups) {
        if (err) return next(err);
        res.send(groups);
    });
});

/* POST new group */
router.post('/', function(req, res, next) {
    const newGroup = new Group(req.body);
    newGroup.save(function(err, savedGroup) {
        if (err) return next(err);
        res.send(savedGroup);
    });
});

module.exports = router;