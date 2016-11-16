(function() { 
  angular.module('Roundup')
  .component('newRoundForm', {
    templateUrl: 'js/app/components/newRoundForm/newRoundForm.html',
    controller: NewRoundForm,
    controllerAs: 'newRoundForm',
    bindings: {
      interviewInput: '=',
      interviewList: '='
    }
  });

  function NewRoundForm($state, RoundService, CandidateService, PositionService) {
    var newRoundForm = this;
    //newRoundForm.rounds = [];
    newRoundForm.candidates = {};
    newRoundForm.positions = {};
    newRoundForm.selectedCandidate = {};
    newRoundForm.selectedPosition = {};
    newRoundForm.newRound = {
      candidate: {
        firstName: '',
        lastName: '',
        linkedIn: ''
      },
      position: {
        title: '',
        description: ''
      },
      questions: [],
      interviews: []
    };

    CandidateService.getAllCandidates(function(data) {
      newRoundForm.candidates = data.data;
    });

    PositionService.getAllPositions(function(data) {
      newRoundForm.positions = data.data;
    });

    newRoundForm.someThing = "addingCandidate";


    // IF USER ENTERS NEW CANDIDATE - (TODO)

    //newRoundForm.selectedCandidateView = true;

    // newRoundForm.candidateFormView = function() {
    //   newRoundForm.selectedCandidateView = !newRoundForm.selectedCandidateView;
    // }

    // newRoundForm.addExistingCandidate = function() {
    //   CandidateService.getCandidate(newRoundForm.selectedCandidate, function(res) {
    //     newRoundForm.candidate = res.data;
    //     newRoundForm.newRound.candidate.firstName = newRoundForm.candidate.firstName;
    //     newRoundForm.newRound.candidate.lastName = newRoundForm.candidate.lastName;
    //     console.log('candidate data added: ', newRoundForm.newRound);
    //     newRoundForm.someThing = "addingPosition";
    //   });
    // }

    // IF USER SELECTS CANDIDATE FROM LIST
    newRoundForm.addExistingCandidate = function() {
      CandidateService.getCandidate(newRoundForm.selectedCandidate, function(res) {
        newRoundForm.candidate = res.data;
        newRoundForm.newRound.candidate.firstName = newRoundForm.candidate.firstName;
        newRoundForm.newRound.candidate.lastName = newRoundForm.candidate.lastName;
        newRoundForm.newRound.candidate.linkedIn = newRoundForm.candidate.linkedIn;
        console.log('candidate data added: ', newRoundForm.newRound);
        newRoundForm.someThing = "addingPosition";
      });
    }

    // USER ADDS POSITION
    newRoundForm.addPosition = function() {
      PositionService.getPosition(newRoundForm.selectedPosition, function(res) {
        console.log('position questions?', res.data.questions);

        var existingQuestions = res.data.questions;
        var compileQuestions = [];
        console.log('questions: ', compileQuestions);

        existingQuestions.forEach(function(question){
          compileQuestions.push({question});
          console.log('new round with new questions: ', newRoundForm.newRound);
          console.log('compile questions: ', compileQuestions);
          newRoundForm.newRound.questions = compileQuestions;
          newRoundForm.someThing = "addingInterviews";
        });

        newRoundForm.position = res.data;
        newRoundForm.newRound.position.title = newRoundForm.position.jobTitle;
        newRoundForm.newRound.position.description = newRoundForm.position.description;
        newRoundForm.newRound.position.questions = compileQuestions;
        console.log('position data added: ', newRoundForm.newRound);
      });
    }

    //newRoundForm.showAddInterviewForm = false;
    //newRoundForm.addInterviewButtonText = 'Add Interview Session';
    newRoundForm.addingInterview = function() {
      newRoundForm.showAddInterviewForm = true;
    }

    newRoundForm.addInterviewForm = {};
    newRoundForm.addInterview = function() {
      interviewObject = {name: newRoundForm.newInterview};
      newRoundForm.newRound.interviews.push(interviewObject);
      newRoundForm.newInterview = '';
      console.log('current round wiht interviews: ', newRoundForm.newRound);
    }

    newRoundForm.createRound = function() {
      RoundService.addRound(newRoundForm.newRound, function(data) {
        var newRoundId = data.data._id;
        window.location.href = '/review/' + newRoundId;
      }); 
    }

}

  NewRoundForm.$inject = ['$state', 'RoundService', 'CandidateService', 'PositionService'];
})()

