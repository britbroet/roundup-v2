(function() {
  angular.module('Roundup')
  .component('newCandidateForm', {
    templateUrl: 'js/app/components/newCandidateForm/newCandidateForm.html',
    controller: NewCandidateForm,
    controllerAs: 'newCandidateForm'
  });

  function NewCandidateForm($state, CandidateService) {
    var newCandidateForm = this;
    newCandidateForm.candidates = [];
    newCandidateForm.newCandidate = {
      firstName: '',
      lastName: '',
      linkedIn: ''
    };

  newCandidateForm.submitCandidate = function() {
    CandidateService.addCandidate(newCandidateForm.newCandidate, function(data) {
      CandidateService.getAllCandidates(function(data) {
        newCandidateForm.candidates = data.data;
          $state.go('candidates', {}, {reload : true});
      });
    });
  }
}

NewCandidateForm.$inject = ['$state', 'CandidateService'];

})()