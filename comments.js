//create web server
var express = require('express');
var router = express.Router();
var comments = require('../models/comments');

//get comments
router.get('/', function(req, res, next) {
    comments.getAll(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

//get comments by id
router.get('/:id?', function(req, res, next) {
    comments.getById(req.params.id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

//add comments
router.post('/', function(req, res, next) {
    comments.add(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

//delete comments
router.delete('/:id?', function(req, res, next) {
    comments.delete(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

//update comments
router.put('/:id?', function(req, res, next) {
    comments.update(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
