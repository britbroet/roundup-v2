var mongoose = require('mongoose');

var interviewSchema = new mongoose.Schema({
  // candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate'},
  // question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
  // position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // score: Number,
  // notes: String
  name: String,
  roundId: String,
  userId: String
});

var Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;