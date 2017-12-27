var express = require('express');
var router = express.Router();
var config = require('../config');
var Query = require('../Query');
var _ = require('lodash');

var mongoose = require('mongoose');
var Worker = mongoose.model('Worker');
var EtherMineStats = mongoose.model('EtherMineStats');


/* GET users listing. */
router.get('/EtherMineStats', function(req, res, next) {
  EtherMineStats.find(function(err, stats){
    if(err){ return next(err); }
    res.json(stats);
  });

});

router.get('/minDay', function(req, res, next) {
  EtherMineStats.find(function(err, stats){
    if(err){ return next(err); }
    let min = _.minBy(stats, function(s){
      return s.coinsPerMin / s.currentHashrate;
    });




    res.json(min);
  });

});

/* GET users listing. */
router.get('/:algo', function(req, res, next) {
  Worker.find({algo: req.params.algo}, function(err, workers){
    if(err){ return next(err); }
    res.json(workers);
  });

});

module.exports = router;
