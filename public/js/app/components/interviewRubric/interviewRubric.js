(function() {
  angular.module('Roundup')
  .component('interviewRubric', {
    templateUrl: 'js/app/components/interviewRubric/interviewRubric.html',
    controller: InterviewRubric,
    controllerAs: 'interviewRubric',
  });

  function InterviewRubric($state, $stateParams, RoundService, Auth) {
    var interviewRubric = this;

    interviewRubric.round = {};
    interviewRubric.questions = {};
    interviewRubric.answers = {};
    interviewRubric.userData = {};
    interviewRubric.responses = [];
    interviewRubric.newResponse = {
    	userId: '',
    	interviewId: '',
    	score: '',
    	notes: ''
    }

    // ACCESS USER DATA
    var payload = Auth.currentUser();
    interviewRubric.userData = payload._doc;
    console.log('interviewRubric.userData.firstName ', interviewRubric.userData);

    // ACCESS ROUND DATA
    var roundId = $stateParams.id;
    var interviewId = $stateParams.interviewId;

    interviewRubric.thisInterview = interviewId;

	  RoundService.getRound(roundId, function(res) {
	    interviewRubric.round = res.data;
	    console.log('round data? ', res.data);
	    interviewRubric.questions = res.data.questions;
	    console.log('questions? ', interviewRubric.questions);
	    interviewRubric.interviews = res.data.interviews;
	    console.log('interview?', interviewRubric.interviews)
	    interviewRubric.responses = res.data.responses;
	    console.log('responses: ', interviewRubric.responses);
	  });

	  // SUBMIT SCORING FORM 
	  	interviewRubric.submitScores = function() {
	  		var existingResponses = interviewRubric.responses;
	  		var updatedResponseArray = existingResponses;

	  		// pull question IDs out of key:value in form data
	  		var idsArray = Object.keys(interviewRubric.answers);

	  		idsArray.forEach(function(thisId) {
	  			var newResponse = {
	  				userName: interviewRubric.userData.firstName,
	  			 	questionId: thisId,
	  			 	interviewId: interviewId,
	  			 	score: 2,
	  			 	notes: interviewRubric.answers[thisId]
	  			};
	  			updatedResponseArray.push(newResponse);
	  		});

	  		RoundService.addResponsesToRound(updatedResponseArray, roundId, function(res) {
        	window.location.href = '/review/' + roundId;
	  		});	  		
	  	} 

  }

  InterviewRubric.$inject = ['$state', '$stateParams', 'RoundService', 'Auth'];
})()
