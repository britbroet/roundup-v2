(function() { 
  angular.module('Roundup')
  .component('newQuestionForm', {
    templateUrl: 'js/app/components/newQuestionForm/newQuestionForm.html',
    controller: NewQuestionForm,
    controllerAs: 'newQuestionForm'
  });

  function NewQuestionForm($state, QuestionService) {
    var newQuestionForm = this;
    newQuestionForm.questions = [];
    newQuestionForm.newQuestion = {
      question: '',
      simpleId: ''
    };

  newQuestionForm.submitQuestion = function() {
    QuestionService.addQuestion(newQuestionForm.newQuestion, function(data) {
      QuestionService.getAllQuestions(function(data) {
        newQuestionForm.questions = data.data;
        //console.log('here: ', newQuestionForm.questions);
        $state.go('questions', {}, {reload : true});
      });
    });

  }
}

  NewQuestionForm.$inject = ['$state', 'QuestionService'];
})()

