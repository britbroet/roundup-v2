(function() { 
  angular.module('Roundup')
  .component('resourcesList', {
    templateUrl: 'js/app/components/resourcesList/resourcesList.html',
    controller: ResourcesList,
    controllerAs: 'resourcesList'
  });

  function ResourcesList($scope, $mdDialog, ResourcesService) {
    console.log("in resources component")
};

  ResourcesList.$inject = ['$scope', '$mdDialog', 'ResourcesService'];
})()