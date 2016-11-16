var express = require('express');
var Round = require('../models/round');
var router = express.Router();

// ALL ROUNDS
router.get('/', function(req, res) {
  console.log('in round controller');
  Round.find(function(err, rounds) {
    console.log('rounds: ', rounds);
    if (err) return res.send({message: 'An error occurred when finding questions'});

    res.send(rounds);
  });
});

router.post('/', function(req, res) {
  console.log('in router.post');
  var round = new Round(req.body);
  console.log('rounds controller, req.body: ', round);
  round.save(function(err) {
    if (err) return res.send({message: 'An error occurred when creating a question'});
    res.send(round);
  });
});

// SPECIFIC ROUND
router.route('/:id')
  .get(function(req, res) {
    console.log('in round get route');
    Round.findById(req.params.id, function(err, round) {
      if (err) return res.status(500).send(err);
      return res.send(round);
    });
  })
  .put(function(req, res) {
    Round.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      return res.send({ message: 'success' });
    });
  })
  .delete(function(req, res) {
    Round.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      return res.send({ message: 'success' });
    });
  });

router.route('/:id/questions')
  .get(function(req, res) {
    console.log('in round get route');
    Round.findById(req.params.id, function(err, round) {
      if (err) return res.status(500).send(err);
      return res.send(round.questions);
    });
  })
  .put(function(req, res) {
    Round.findOneAndUpdate({ _id: req.params.id }, {$set:{questions:req.body}}, function(err) {
      if (err) return res.status(500).send(err);
      console.log('in success');
      return res.send({ message: 'success' });
    });
  });

router.route('/:id/responses')
  .put(function(req, res) {
    Round.findOneAndUpdate({ _id: req.params.id }, {$set:{responses:req.body}}, function(err) {
      if (err) return res.status(500).send(err);
      console.log('response success');
      return res.send({ message: 'success' });
    });
  });

module.exports = router;