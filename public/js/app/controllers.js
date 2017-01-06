angular.module('Roundup')

.controller('RoundCtrl', ['$scope', '$state', 'QuestionService', 'CandidateService', 'UserService', 'RoundService', function($scope, $state, QuestionService, CandidateService, UserService, RoundService) {
  $scope.questions = {};
  $scope.candidates = {};
  $scope.users = {};
  $scope.rounds = {};

	QuestionService.getAllQuestions(function(data) {
    $scope.questions = data.data;
  });

  CandidateService.getAllCandidates(function(data) {
    $scope.candidates = data.data;
  });

  UserService.getAllUsers(function(data) {
    $scope.users = data.data;
  });

  RoundService.getAllRounds(function(data) {
  	$scope.rounds = data.data;
  });


}])

.controller('EditRoundCtrl', ['$scope', '$mdDialog','$stateParams', '$state', 'QuestionService', 'CandidateService', 'UserService', 'RoundService', function($scope, $mdDialog, $stateParams, $state, QuestionService, CandidateService, UserService, RoundService) {
  $scope.questions = {};
  $scope.positions = {};
  $scope.candidates = {};
  $scope.interviews = {};
  $scope.users = {};
  $scope.round = {
    candidate: {
      firstName: '',
      lastName: ''
    },
    position: {
      title: '',
      description: ''
    },
    interviews: {
      name: ''
    }
  };


	QuestionService.getAllQuestions(function(data) {
    $scope.questions = data.data;
  });

  CandidateService.getAllCandidates(function(data) {
    $scope.candidates = data.data;
  });

  UserService.getAllUsers(function(data) {
    $scope.users = data.data;
  });

  RoundService.getAllRounds(function(data) {
  	$scope.rounds = data.data;
  });

  var id = $stateParams.id;
 
  RoundService.getRound(id, function(res) {
  	$scope.round = res.data;
  });

  $scope.updateRound = function() {
    RoundService.updateRound($scope.round, function(res) {
      $state.go('rounds', {id: $scope.round._id});
    });
  }

  $scope.deleteRound = function(round){
    RoundService.deleteRound(round, function(res){
      $state.go('rounds');
    })
  }

  $scope.showConfirm = function(ev, round) {
      // Appending dialog to document.body to cover sidenav in docs app
      var thisRound = round;
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this round?')
            .textContent('Warning, deleting is not reversible.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete Round')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        console.log("confirm delete")
        RoundService.deleteRound(thisRound, function(res) {
          console.log("deleted")
          $state.go('rounds');
          });
      }, function() {
        console.log("cancel")
      })
    }
}])

.controller('EditCandidateCtrl', ['$scope', '$stateParams', '$state', 'CandidateService',
  function($scope, $stateParams, $state, CandidateService) {

  var id = $stateParams.id;
  CandidateService.getCandidate(id, function(res) {
    $scope.candidate = res.data;
  });

  $scope.updateCandidate = function() {
    CandidateService.updateCandidate($scope.candidate, function(res) {
      $state.go('candidates', {id: $scope.candidate._id});
    });
  }
}])

.controller('EditPositionCtrl', ['$scope', '$stateParams', '$state', 'PositionService', 'QuestionService',
  function($scope, $stateParams, $state, PositionService, QuestionService) {

  var id = $stateParams.id;

  PositionService.getPosition(id, function(res) {
    $scope.position = res.data;
    console.log("got position:", res.data);
  });

  QuestionService.getAllQuestions(function(data) {
    $scope.question = data.data;
    console.log("show all questions:", data.data)
    console.log("show specific question: ", data.data[0])
  })

  $scope.updatePosition = function() {
    PositionService.updatePosition($scope.position, function(res) {
      $state.go('positions', {id: $scope.position._id});
    });
  }
}])

.controller('EditQuestionCtrl', ['$scope', '$stateParams', '$state', 'QuestionService',
  function($scope, $stateParams, $state, QuestionService) {

  var id = $stateParams.id;
  QuestionService.getQuestion(id, function(res) {
    $scope.question = res.data;
  });
  $scope.updateRound = function() {
    var questions = $scope.round.questions;

    RoundService.updateRound($scope.round, function(res) {
    });
  }

  // ADD NEW QUESTIONS TO ROUND FROM EDIT ROUND
  $scope.submitQuestionToRound = function() {
    var existingData = $scope.round.questions;
    var updatedQuestionData = existingData.concat($scope.newQuestion);

    RoundService.addQuestionToRound(updatedQuestionData, id, function(res) {
      $state.go('editRound', {id: $scope.round._id}, {reload : true});
    });
  }
    $scope.updateQuestion = function() {
    QuestionService.updateQuestion($scope.question, function(res) {
      $state.go('questions', {id: $scope.question._id});
    });
  }
}])

.controller('AlertCtrl', ['$scope', 'Alerts', function($scope, Alerts) {
  $scope.Alerts = Alerts;
}])

.controller('AuthCtrl', ['$scope', '$timeout', 'Auth', function($scope, $timeout, Auth){
  $scope.currentUser = {}
  $scope.loggedIn = false;
  if(Auth.isLoggedIn()){
    $scope.currentUser = Auth.currentUser();
    $scope.loggedIn = true;
  }
  $scope.$on('loggedIn', function(){
    $scope.loggedIn = true;
  });
}])

.controller('ReviewCtrl', ['$scope', '$mdDialog', '$state', '$stateParams', 'RoundService', function($scope, $mdDialog, $state, $stateParams, RoundService) {
  $scope.rounds = {};

  var thisId = $stateParams.id;

  RoundService.getRound(thisId, function(res) {
    $scope.round = res.data;
  });

  $scope.deleteRound = function(round){
    RoundService.deleteRound(round, function(res){
      $state.go('rounds');
    })
  }

  $scope.showConfirm = function(ev, round) {
      // Appending dialog to document.body to cover sidenav in docs app
      var thisRound = round;
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this round?')
            .textContent('Warning, deleteing is not reversible.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete Round')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        console.log("confirm delete")
        RoundService.deleteRound(thisRound, function(res) {
          console.log("deleted")
          $state.go('rounds');
          });
      }, function() {
        console.log("cancel")
      })
    }

}])

.controller('InterviewCtrl', ['$scope', '$state', 'Auth', '$stateParams', 'RoundService', function($scope, Auth, $state, $stateParams, RoundService) {
  
  var roundId = $stateParams.id;
  var interviewId = $stateParams.interviewId;
 
  RoundService.getRound(roundId, function(res) {
    $scope.round = res.data;
  });

}]);