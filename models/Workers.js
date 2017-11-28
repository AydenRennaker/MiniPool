var mongoose = require('mongoose');
var WorkerSchema = new mongoose.Schema({
  workerName: String,
  difficulty: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  algo: { type: Number, default: 0 },
  utc: { type: Number, default: 0 },
  paid: {type: Boolean, default: false},
  updated: { type: Date, default: Date.now },
});
mongoose.model('Worker', WorkerSchema);
