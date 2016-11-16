(function() { 
  angular.module('Roundup')
  .component('newPositionForm', {
    templateUrl: 'js/app/components/newPositionForm/newPositionForm.html',
    controller: NewPositionForm,
    controllerAs: 'newPositionForm'
  });

  function NewPositionForm($state, $scope, PositionService, QuestionService) {
    var newPositionForm = this;
    newPositionForm.positions = [];
    newPositionForm.questions = [];
    newPositionForm.q1 = '';
    newPositionForm.q2 = '';
    newPositionForm.q3 = '';
    newPositionForm.q4 = '';
    newPositionForm.q5 = '';
    newPositionForm.newPosition = {
      jobTitle: '',
      description: '',
      questions: []
    };

    $scope.$watch('q1', function(newVal){
      if (newVal && newVal.question){
      newPositionForm.newPosition.questions.push(newVal.question);
      }
    });

    $scope.$watch('q2', function(newVal){
      if (newVal && newVal.question){
      newPositionForm.newPosition.questions.push(newVal.question);
      }
    });
    $scope.$watch('q3', function(newVal){
      if (newVal && newVal.question){
      newPositionForm.newPosition.questions.push(newVal.question);
      }
    });
    $scope.$watch('q4', function(newVal){
      if (newVal && newVal.question){
      newPositionForm.newPosition.questions.push(newVal.question);
      }
    });
    $scope.$watch('q5', function(newVal){
      if (newVal && newVal.question){
      newPositionForm.newPosition.questions.push(newVal.question);
      }
    });

    QuestionService.getAllQuestions(function(data) {
      newPositionForm.questions = data.data;
    });

  newPositionForm.submitPosition = function() {
    PositionService.addPosition(newPositionForm.newPosition, function(data) {
      PositionService.getAllPositions(function(data) {
        newPositionForm.positions = data.data;
          $state.go('positions', {}, {reload : true});
          console.log(newPositionForm.newPosition);
      });
    });
  }
}

NewPositionForm.$inject = ['$state', '$scope', 'PositionService', 'QuestionService'];

})()

