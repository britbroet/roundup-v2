(function() {
  angular.module('Roundup')
  .component('candidateInfo', {
    templateUrl: 'js/app/components/candidateInfo/candidateInfo.html',
    controller: CandidateInfo,
    controllerAs: 'candidateInfo',
  });

  function CandidateInfo($state, $stateParams, RoundService, CandidateService, PositionService) {
    var candidateInfo = this;
    
    candidateInfo.candidate = {};
    candidateInfo.position = {};

	  var id = $stateParams.id;
	  RoundService.getRound(id, function(res) {
	    candidateInfo.round = res.data;
	    candidateInfo.round = res.data;
	    candidateInfo.candidate = candidateInfo.round.candidate;
	    candidateInfo.position = candidateInfo.round.position;
      candidateInfo.interviews = candidateInfo.round.interviews;
      console.log('interviews ', candidateInfo.interviews);
	  });
  }

  CandidateInfo.$inject = ['$state', '$stateParams', 'RoundService', 'CandidateService', 'PositionService'];
})()
