// (function() { 
//   angular.module('Roundup')
//   .component('setupRoundCandidate', {
//     templateUrl: 'js/app/components/setupRoundCandidate/setupRoundCandidate.html',
//     controller: SetupRoundCandidate,
//     controllerAs: 'setupRoundCandidate',
//   });

//   function SetupRoundCandidate($state, $scope, RoundService, CandidateService) {
//     var setupRoundCandidate = this;
//     //setupRoundCandidate.newCandidate = {},
//     //setupRoundCandidate.rounds = [];

//     //setupRoundCandidate.candidates = [];
//     setupRoundCandidate.selectedCandidate = {};

//     setupRoundCandidate.newRound = {
//       candidate: {
//         firstName: '',
//         lastName: ''
//       },
//       position: {
//         title: '',
//         description: ''
//       }
//     };

//     CandidateService.getAllCandidates(function(data) {
//       setupRoundCandidate.candidates = data.data;
//       console.log('setupcandidate data.data ', data.data);
//     });

//     setupRoundCandidate.createRound = function() {

//     //var newCand = {};
//     CandidateService.getCandidate(setupRoundCandidate.selectedCandidate, function(res) {
//       setupRoundCandidate.candidate = res.data;
//       setupRoundCandidate.newRound.candidate = setupRoundCandidate.candidate;


//       RoundService.addRound(setupRoundCandidate.newRound, function(data) {
//         console.log('round service firing, data: ', data);
//         // reload page with all rounds
//         // RoundService.getAllRounds(function(data) {
//         //   newRoundForm.rounds = data.data;
//         //   console.log('newRoundForm.candidate: ', newRoundForm.rounds);
        
//         $state.go('createRound/:id', {id: newRound._id}, {reload : true});
//          // });
//       });      

//     });

//   }
// }

//   SetupRoundCandidate.$inject = ['$state', '$scope', 'RoundService', 'CandidateService'];
// })()



//-------------


(function() { 
  angular.module('Roundup')
  .component('setupRoundPosition', {
    templateUrl: 'js/app/components/setupRoundPosition/setupRoundPosition.html',
    controller: SetupRoundPosition,
    controllerAs: 'setupRoundPosition',
  });

  function SetupRoundPosition($state, $scope, RoundService, PositionService) {
    var setupRoundPosition = this;
    //setupRoundCandidate.newCandidate = {},
    //setupRoundCandidate.rounds = [];

    //setupRoundCandidate.candidates = [];
    setupRoundPosition.selectedPosition = {};

    setupRoundPosition.newPosition = {
      position: {
        title: '',
        description: ''
      }
    };

    PositionService.getAllPositions(function(data) {
      setupRoundPosition.positions = data.data;
      console.log('setupcposition data.data ', data.data);
    });

    setupRoundPosition.editRound = function() {
      console.log('setup firing');

      PositionService.getPosition(setupRoundPosition.selectedCandidate, function(res) {
        setupRoundPosition.position = res.data;
        setupRoundPosition.round.position = setupRoundCandidate.position;

      submitPositionToRound = function() {
        var updatedPositionData = setupRoundPosition.position;

        RoundService.updatePosition(usetupRoundPosition.position, id, function(res) {
          $state.go('editRound', {position: setupRoundPosition.position}, {reload : true});
          });
        }

      });      
  }
}

  SetupRoundPosition.$inject = ['$state', '$scope', 'RoundService', 'PositionService'];
})()




