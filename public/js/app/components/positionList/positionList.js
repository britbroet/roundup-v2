(function() { 
  angular.module('Roundup')
  .component('positionList', {
    templateUrl: 'js/app/components/positionList/positionList.html',
    controller: PositionList,
    controllerAs: 'positionList'
  });

  function PositionList($scope, $mdDialog, PositionService) {
    var positionList = this;
    positionList.delete = function(position) {
      PositionService.deletePosition(position, function(res) {
        positionList.positions = positionList.positions.filter(function(item) {
          return item !== position;
        });
      })
    }
    positionList.positions = [];

    PositionService.getAllPositions(function(data) {
      positionList.positions = data.data;
    });

    $scope.showConfirm = function(ev, position) {
      // Appending dialog to document.body to cover sidenav in docs app
      var thisPosition = position;
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this position?')
            .textContent('Warning, deleteing is not reversible.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete Position')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        console.log("confirm delete")
        PositionService.deletePosition(thisPosition, function(res) {
          console.log("deleted")
          positionList.positions = positionList.positions.filter(function(item) {
            return item !== thisPosition;
          });
        });
      }, function() {
        console.log("cancel")
      });
    };
  }

  PositionList.$inject = ['$scope', '$mdDialog', 'PositionService'];
})()