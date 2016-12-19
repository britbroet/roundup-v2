(function() {
  angular.module('Roundup')
  .component('navigation', {
    templateUrl: 'js/app/components/navigation/navigation.html',
    controller: Navigation,
    controllerAs: 'navigation'
  });


  function Navigation($http, $state, $location, Auth, Alerts) {
    var navigation = this;
    navigation.Auth = Auth;
    navigation.userData = {};
    //navigation.loggedIn = false;
    navigation.loggedIn;

    // ACCESS USER DATA
    //var payload = Auth.currentUser();
    navigation.payload = Auth.currentUser();
    console.log('nav payload', navigation.payload);


    if (navigation.payload) {
      navigation.loggedIn = true;
      navigation.userData = navigation.payload._doc;
      console.log('payload doc', navigation.loggedIn);
      console.log('user data', navigation.userData);
    }
    else {
      navigation.loggedIn = false;
    }

    navigation.logout = function() {
      console.log("logged out");
      Auth.removeToken();
      console.log('My token:', Auth.getToken());
      Alerts.add('success', 'Logged out!');
      navigation.loggedIn = false;
      $state.reload();
  	}
  }

  Navigation.$inject = ['$http', '$state', '$location', 'Auth', 'Alerts'];
})()

