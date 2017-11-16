var request = require('request');

module.exports = Query;
function Query(config) {
  this.config = config;
}

Query.prototype.getWorkers = function(){
  request('https://api.nicehash.com/api?method=stats.provider.workers&addr=' + this.config.addr, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       var importedJSON = JSON.parse(body);
       var algos = importedJSON.result.current;
       importedJSON.result.workers.forEach(function(algo) {
         console.log(algo);
       })
    }
  })
}

Query.prototype.getHistory = function(){
  request('https://api.nicehash.com/api?method=stats.provider.ex&addr=' + this.config.addr, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       var importedJSON = JSON.parse(body);
       var algos = importedJSON.result.current;
       importedJSON.result.current.forEach(function(algo) {
         console.log(algo);
       })
       //console.log(JSON.stringify(importedJSON));
    }
  })
}
