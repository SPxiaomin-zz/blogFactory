var express = require('express');
var router = express.Router();

router.route('/')
.get(function(req, res, next) {
    res.render('index');
});

router.route('/lm')
.get(function(req, res, next) {
    res.render('lm');
});

router.route('/intro')
.get(function(req, res, next) {
    res.render('intro');
});

router.route('/resume')
.get(function(req, res, next) {
    res.render('resume');
});

router.route('/test')
.get(function(req, res, next) {
    res.render('test');
});


module.exports = router;
