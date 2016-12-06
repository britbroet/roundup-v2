(function() {
  angular.module('Roundup')
  .component('navBar', {
    templateUrl: 'js/app/components/navBar/navBar.html',
    controller: NavBar,
    controllerAs: 'navBar'
  });


  function NavBar($http, $scope, $rootScope, $state, $location, Auth, Alerts) {
    var navBar = this;
    navBar.Auth = Auth;
    navBar.userData = {};
    navBar.loggedIn = false;

    // ACCESS USER DATA
    //var payload = Auth.currentUser();
    navBar.payload = Auth.currentUser();
    console.log('nav payload', navBar.payload);


    if (navBar.payload) {
      navBar.loggedIn = true;
      navBar.userData = navBar.payload._doc;
      console.log('payload doc', navBar.loggedIn);
      console.log('user data', navBar.userData);
    }

    navBar.logout = function() {
      console.log("logged out");
      Auth.removeToken();
      console.log('My token:', Auth.getToken());
      Alerts.add('success', 'Logged out!');
      navBar.loggedIn = false;
      $state.reload();
  	}
  }

  NavBar.$inject = ['$http', '$scope', '$rootScope', '$state', '$location', 'Auth','Alerts'];
})()

