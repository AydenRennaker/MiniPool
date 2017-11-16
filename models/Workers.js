var mongoose = require('mongoose');
var WorkerSchema = new mongoose.Schema({
  workerName: String,
  difficulty: Number,
  speed: Number,
  algo: Number
});
mongoose.model('Worker', WorkerSchema);
