(function(){ 
	angular.module('Roundup')
	.component('userSignupForm', {
		templateUrl: 'js/app/components/userSignupForm/userSignupForm.html',
		controller: UserSignupForm,
		controllerAs: 'userSignupForm'
	});

	//create a new user object to be sent to the DB
	function UserSignupForm($state, UserService){
		var userSignupForm = this;
		userSignupForm.users = [];
		userSignupForm.newUser = {
			firstName: '',
			lastName: '',
			title: '',
			email: '',
			password: ''
		};

		//send the new object to services
		userSignupForm.submitUser = function(){
			UserService.addUser(userSignupForm.newUser, function(res) {
	      UserService.getAllUsers(function(data) {
	        userSignupForm.users = data.data;
	        $state.go('home', {}, {reload : true});
	        console.log(userSignupForm.users);
	      });
	    });
      
	  }
	}
 	// console.log(userSignupForm.users);
	UserSignupForm.$inject = ['$state','UserService'];
})()

