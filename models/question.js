var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  simpleId: { type: Number, required: true, unique: true },
  question: { type: String, required: true, unique: true }
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;