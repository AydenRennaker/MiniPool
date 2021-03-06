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
  var result = {}
  Worker.find(function(err, workers){
    if(err){ return next(err); }
    var groups = _.groupBy(workers, w => w.algo);
    Object.keys(groups).forEach(function(key) {
      console.log(key);
      var workerNames = _.groupBy(groups[key], g => g.workerName);
      Object.keys(workerNames).forEach(function(name) {
        var speeds = _.sumBy(workerNames[name], function(obj) {
          return obj.speed * obj.difficulty;
        });
        console.log(key, name, speeds)

        if(result[key] == null) {
          console.log("first");
          result[key] = {workers: []};
        }
        result[key]['workers'].push({workerName: name, totalShare: speeds, algorithm: key});
      })
    })
    Object.keys(result).forEach(function(key) {
      result[key].totalShare = _.sumBy(result[key]['workers'], 'totalShare');
    });



    res.json(result);
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Pool' });
});

router.get('/percentages', function(req, res, next) {
  res.render('percentages.html', { title: 'Mini Pool' });
});

module.exports = router;
