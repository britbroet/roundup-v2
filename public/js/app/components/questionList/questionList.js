(function() { 
  angular.module('Roundup')
  .component('questionList', {
    templateUrl: 'js/app/components/questionList/questionList.html',
    controller: QuestionList,
    controllerAs: 'questionList',
  });

  function QuestionList($scope, $mdDialog, QuestionService) {
    var questionList = this;
    questionList.delete = function(question) {
      QuestionService.deleteQuestion(question, function(res) {
        questionList.questions = questionList.questions.filter(function(item) {
          return item !== question;
        });
      })
    }
    questionList.questions = [];

    QuestionService.getAllQuestions(function(data) {
      questionList.questions = data.data;
    });

    $scope.showConfirm = function(ev, question) {
      // Appending dialog to document.body to cover sidenav in docs app
      var thisQuestion = question;
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this question?')
            .textContent('Warning, deleteing is not reversible.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete Question')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        console.log("confirm delete")
        QuestionService.deleteQuestion(thisQuestion, function(res) {
          console.log("deleted")
          questionList.questions = questionList.questions.filter(function(item) {
            return item !== thisQuestion;
          });
        });
      }, function() {
        console.log("cancel")
      });
    };
  }

  QuestionList.$inject = ['$scope', '$mdDialog', 'QuestionService'];
})()
