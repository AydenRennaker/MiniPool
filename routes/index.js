var express = require('express');
var router = express.Router();
var _ = require('lodash');

var mongoose = require('mongoose');
var Worker = mongoose.model('Worker');

router.get('/workers', function(req, res, next) {
  Worker.find(function(err, workers){
    if(err){ return next(err); }
    res.json(workers);
  });
});

router.get('/alloc', function(req, res, next) {
  Worker.find(function(err, workers){
    if(err){ return next(err); }
    var groups = _.groupBy(workers, w => w.algo);



    res.json(groups);
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Pool' });
});

module.exports = router;
