var mongoose = require("mongoose");

var positionSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: String, unique: true }]
});

var Position = mongoose.model('Position', positionSchema);

module.exports = Position;