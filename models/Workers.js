var mongoose = require('mongoose');
var WorkerSchema = new mongoose.Schema({
  workerName: String,
});
mongoose.model('Worker', WorkerSchema);
