var mongoose = require('mongoose');

var roundSchema = new mongoose.Schema({
  candidate: { firstName: String, lastName: String, linkedIn: String},
  position: { title: String, description: String},
  date: String,
  questions: [
  	{question: String
  	}],
  interviews: [
  	{name: String}],
  responses: [{ userName: String, questionId: String, interviewId: String, score: String, notes: String }]
});

var Round = mongoose.model('Round', roundSchema);

module.exports = Round;

