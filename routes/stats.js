var express = require('express');
var router = express.Router();
var config = require('../config');
var Query = require('../Query');

var mongoose = require('mongoose');
var Worker = mongoose.model('Worker');

router.get('/workers', function(req, res, next) {
  Worker.find(function(err, workers){
    if(err){ return next(err); }
    res.json(workers);
  });
});

/* GET users listing. */
router.get('/:algo', function(req, res, next) {
  Worker.find({algo: req.params.algo}.function(err, workers){
    if(err){ return next(err); }
    res.render('index', { title: req.params.algo, workers: workers});
  });

});

module.exports = router;
