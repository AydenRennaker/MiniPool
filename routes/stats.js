var express = require('express');
var router = express.Router();
var config = require('../config');
var Query = require('../Query');

/* GET users listing. */
router.get('/:algo', function(req, res, next) {
  res.send(algo);
});

module.exports = router;
