angular.module('Roundup')
.service('UserService', ['$http', function($http) {
  this.getAllUsers = function(callback) {
    $http({
      url: '/api/users',
      method: 'GET'
    }).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }

  this.addUser = function(userData, callback) {
    $http.post('/api/users', userData).then(function success(res) {
      console.log('successfully accessed api user', res);
      callback(res);
    }, function error(res) {
      console.log('error')
      console.log(userData)
      console.log(res);
    });
  }
}])
.service('CandidateService', ['$http', function($http) {
  this.getAllCandidates = function(callback) {
    $http({
      url: '/api/candidates',
      method: 'GET'
    }).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }

  this.addCandidate = function(candidateData, callback) {
    $http.post('/api/candidates', candidateData).then(function success(res) {
      console.log('successfully accessed api candidate', res);
      callback(res);
    }, function error(res) {
      console.log(res);
      console.log('Add Candidate error');
    });
  }
  //show one candidate's details
  this.getCandidate = function(id, callback) {
    $http.get('/api/candidates/' + id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }

  //edit one candidate
  this.updateCandidate = function(candidate, callback) {
    $http.put('/api/candidates/' + candidate._id, candidate).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  //delete one candidate
  this.deleteCandidate = function(candidate, callback) {
    console.log("candidate id:", candidate._id)
    $http.delete('/api/candidates/' + candidate._id).then(function success(res) {
      console.log("candidate id:", candidate._id)
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
}])
.service('QuestionService', ['$http', function($http) {
  this.getAllQuestions = function(callback) {
    $http({
      url: '/api/questions',
      method: 'GET'
    }).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }

  this.addQuestion = function(questionData, callback) {
    $http.post('/api/questions', questionData).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log('add Question error');
    });
  }
  //show one question's details
  this.getQuestion = function(id, callback) {
    $http.get('/api/questions/' + id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  //edit one question
  this.updateQuestion = function(question, callback) {
    $http.put('/api/questions/' + question._id, question).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  //delete one candidate
  this.deleteQuestion = function(question, callback) {
    $http.delete('/api/questions/' + question._id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
}])
.service('PositionService', ['$http', function($http) {
  this.getAllPositions = function(callback) {
    $http({
      url: '/api/positions',
      method: 'GET'
    }).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  this.addPosition = function(positionData, callback) {
    $http.post('/api/positions', positionData).then(function success(res) {
      callback(res);
    }, function error(res) {
    });
  }
  //show one position's details
  this.getPosition = function(id, callback) {
    $http.get('/api/positions/' + id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  //edit one position
  this.updatePosition = function(position, callback) {
    $http.put('/api/positions/' + position._id, position).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  //delete one position
  this.deletePosition = function(position, callback) {
    $http.delete('/api/positions/' + position._id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
}])

.service('RoundService', ['$http', function($http) {
  //GET ALL ROUNDS
  this.getAllRounds = function(callback) {
    $http({
      url: '/api/rounds',
      method: 'GET'
    }).then(function success(res) {
      callback(res);
    }, function error(res) {
    });
  }
  //Get specific round
  this.getRound = function(id, callback) {
    $http.get('/api/rounds/' + id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  // CREATE NEW ROUND
  this.addRound = function(roundData, callback) {
    console.log('roundData in create round service', roundData);
    $http.post('/api/rounds', roundData).then(function success(res) {
      callback(res);
    }, function error(res) {
    });
  }
// EDIT SPECIFIC ROUND
  this.updateRound = function(round, callback) {
    console.log("in update round")
    $http.put('/api/rounds/' + round._id, round).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
  //delete a Round
  this.deleteRound = function(round, callback) {
    $http.delete('/api/rounds/' + round._id).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log(res);
    });
  }
//ADD NEW QUESTION TO EXISTING ROUND
  this.addQuestionToRound = function(questionData, roundId, callback) {
    $http.post('/api/rounds/' + roundId + '/questions', questionData).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log('Add Question to Round Error: ', res);
    });
  }
// ADD NEW RESPONSES TO EXISTING ROUND
  this.addResponsesToRound = function(responseData, roundId, callback) {
    $http.put('/api/rounds/' + roundId + '/responses', responseData).then(function success(res) {
      callback(res);
    }, function error(res) {
      console.log('Error adding responses: ', res);
    });
  }
}])
.service('ResourcesService', ['$http', function($http) {
      console.log(" inresourcesService");
}]);