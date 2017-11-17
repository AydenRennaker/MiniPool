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
  var result = []
  Worker.find(function(err, workers){
    if(err){ return next(err); }
    var groups = _.groupBy(workers, w => w.algo);
    Object.keys(groups).forEach(function(key) {
      console.log(key);
      var workerNames = _.groupBy(groups[key], g => g.workerName);
      //console.log(workerNames);
      result.push(workerNames);
      Object.keys(workerNames).forEach(function(name) {
        console.log(key, name)
        res.json(groups[key])
        //console.log(key, name, groups[key][name].length);

        var speeds = _.sumBy(groups[key][name], function(obj) {
          return obj.speed * obj.difficulty;
        });
        result.push(speeds);
        console.log(key, JSON.stringify(speeds));
      })
    })


    res.json(result);
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Pool' });
});

module.exports = router;
