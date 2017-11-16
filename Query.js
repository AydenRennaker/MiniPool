var request = require('request');

module.exports = Query;
function Query(config) {
  this.config = config;
}

Query.prototype.getWorkers = function(algo){
  request('https://api.nicehash.com/api?method=stats.provider.workers&addr=' + this.config.addr + '&algo=' + algo, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       var importedJSON = JSON.parse(body);
       var algos = importedJSON.result.current;
       importedJSON.result.workers.forEach(function(algo) {
         console.log(algo);
       })
    }
  })
}

Query.prototype.getAlgos = function(){
  var activeAlgos = [];
  return new Promise(function(resolve, reject) {
    request('https://api.nicehash.com/api?method=stats.provider.ex&addr=' + this.config.addr, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         var importedJSON = JSON.parse(body);
         if(importedJSON.result.error) {
           console.log("error", importedJSON);
           return;
         }
         var algos = importedJSON.result.current;

         importedJSON.result.current.forEach(function(algo) {
           console.log("test", algo);
           if(algo.data[0].a) {
             activeAlgos.push(algo.algo);
           }
         })
         console.log(JSON.stringify(activeAlgos))
         resolve(activeAlgos);
      }
    })
  });

}

Query.prototype.getAlgosFull = function(){
  request('https://api.nicehash.com/api?method=stats.provider.ex&addr=' + this.config.addr, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       var importedJSON = JSON.parse(body);
       if(importedJSON.result.error) {
         console.log("error", importedJSON);
         return;
       }
       var algos = importedJSON.result.current;
       var activeAlgos = []
       importedJSON.result.current.forEach(function(algo) {
         console.log("test", algo);
         if(algo.data[0].a) {
           activeAlgos.push(algo.algo);
         }
       })
       console.log(JSON.stringify(activeAlgos))
       activeAlgos.forEach(function(algo) {
         Query.getWorkers(algo)
       });
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
