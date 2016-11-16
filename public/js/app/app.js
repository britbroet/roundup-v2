angular.module('Roundup', ['ui.router','ui.bootstrap','ngMaterial','ngMessages','material.svgAssetsCache'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/'); // usually goes to a 404 route

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'js/app/views/home.html',
	})
	.state('candidates', {
  	url: '/candidates',
  	templateUrl: 'js/app/views/candidates.html',
	})
  .state('editcandidates', {
    url: '/candidates/:id',
    templateUrl: 'js/app/views/editCandidate.html',
    controller: 'EditCandidateCtrl'
  })
	.state('signup', {
  	url: '/signup',
  	templateUrl: 'js/app/views/signup.html',
	})
	.state('interview', {
  	url: '/interview',
  	templateUrl: 'js/app/views/interview.html',
	})
  .state('interviewCandidate', {
    url: '/interview/:id/:interviewId',
    templateUrl: 'js/app/views/interview.html',
    controller: 'InterviewCtrl'
  })
  .state('roundReview', {
    url: '/review/:id',
    templateUrl: 'js/app/views/roundReview.html',
    controller: 'ReviewCtrl'
  })
  .state('users', {
    url: '/users',
    templateUrl: 'js/app/views/users.html'
  })
  .state('questions', {
    url: '/questions',
    templateUrl: 'js/app/views/questions.html',
  })
  .state('editQuestions', {
    url: '/questions/:id',
    templateUrl: 'js/app/views/editQuestion.html',
    controller: 'EditQuestionCtrl'
  })
  .state('rounds', {
    url: '/rounds',
    templateUrl: 'js/app/views/rounds.html',
    controller: 'RoundCtrl'
  })
  .state('createRound', {
    url: '/create-round',
    templateUrl: 'js/app/views/createRound.html',
    controller: 'RoundCtrl'
  })
  .state('editRound', {
    url: '/round/:id',
    templateUrl: 'js/app/views/editRound.html',
    controller: 'EditRoundCtrl'
  })
  .state('modal', {
    url: '/modal',
    templateUrl: 'js/app/views/modal.html',
  })
  .state('positions',{
    url: '/positions',
    templateUrl: 'js/app/views/positions.html'
  })
  .state('editPositions',{
    url: '/positions/:id',
    templateUrl: 'js/app/views/editPosition.html',
    controller: 'EditPositionCtrl'
  })
  .state('resources', {
    url: '/resources',
    templateUrl: 'js/app/views/resources.html',
  });

	$locationProvider.html5Mode(true);

}]); 