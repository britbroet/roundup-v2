var express = require('express');
var Candidate = require('../models/candidate');
var router = express.Router();

//Find a candidate
router.get('/', function(req, res) {
  Candidate.find(function(err, candidates) {
    if (err) return res.send({message: 'An error occurred when finding candidate'});
    res.send(candidates);
  });
});

router.post('/', function(req, res) {
  console.log('new candidate req.body: ', req.body)
  var candidate = new Candidate(req.body);
  candidate.save(function(err) {
    if (err) return res.send({message: 'An error occurred when creating a candidate'});
    res.send(candidate);
  });
});

router.get('/:id', function(req, res) {
  Candidate.findById(req.params.id, function(err, candidate) {
    if (err) return res.status(500).send(err);
    return res.send(candidate);
  });
});

router.put('/:id', function(req, res) {
  Candidate.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) return res.status(500).send(err);
    return res.send({ message: 'success' });
  });
});

router.delete('/:id', function(req, res) {
  Candidate.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.status(500).send(err);
    return res.send({ message: 'success' });
  });
  console.log('here: candidates - ', candidate);
});

module.exports = router;