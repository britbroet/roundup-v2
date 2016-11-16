(function() { 
  angular.module('Roundup')
  .component('candidateList', {
    templateUrl: 'js/app/components/candidateList/candidateList.html',
    controller: CandidateList,
    controllerAs: 'candidateList'
  });

  function CandidateList($scope, $mdDialog, CandidateService) {
    var candidateList = this;
    candidateList.delete = function(candidate) {
      CandidateService.deleteCandidate(candidate, function(res) {
        candidateList.candidates = candidateList.candidates.filter(function(item) {
          return item !== candidate;
        });
      })
    }
    candidateList.candidates = [];

    CandidateService.getAllCandidates(function(data) {
      candidateList.candidates = data.data;
    });

    $scope.showConfirm = function(ev, candidate) {
      // Appending dialog to document.body to cover sidenav in docs app
      console.log('canddate: ', candidate);
      var thisCandidate = candidate;
      console.log("thisCandidate", thisCandidate)
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this candidate?')
            .textContent('Warning, deleteing is not reversible.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete Candidate')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        console.log("confirm delete", thisCandidate)
        CandidateService.deleteCandidate(thisCandidate, function(res) {
          console.log("deleted")
          candidateList.candidates = candidateList.candidates.filter(function(item) {
            return item !== thisCandidate;
          });
        });
      }, function() {
        console.log("cancel")
      });
    };
};

  CandidateList.$inject = ['$scope', '$mdDialog', 'CandidateService'];
})()