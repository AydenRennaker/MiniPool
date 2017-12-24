var mongoose = require('mongoose');
var WorkerSchema = new mongoose.Schema({
  workerName: String,
  difficulty: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  algo: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now },
});
mongoose.model('Worker', WorkerSchema);

var EtherMineStats = new mongoose.Schema({
  lastSeen: { type: Number, default: 0 },
  reportedHashrate: { type: Number, default: 0 },
  currentHashrate: { type: Number, default: 0 },
  validShares: { type: Number, default: 0 },
  invalidShares: { type: Number, default: 0 },
  staleShares: { type: Number, default: 0 },
  averageHashrate: { type: Number, default: 0 },
  coinsPerMin: { type: Number, default: 0 },
  usdPerMin: { type: Number, default: 0 },
  btcPerMin: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now },
});
mongoose.model('EtherMineStats', EtherMineStats);
