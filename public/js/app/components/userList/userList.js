(function() { 
  angular.module('Roundup')
  .component('userList', {
    templateUrl: 'js/app/components/userList/userList.html',
    controller: UserList,
    controllerAs: 'userList'
  });

  function UserList(UserService) {
    var userList = this;
    userList.users = [];

    UserService.getAllUsers(function(data) {
      userList.users = data.data;
    });
  }

  UserList.$inject = ['UserService'];
})()


