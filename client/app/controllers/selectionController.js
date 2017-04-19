angular.module('fantasyDragRace')
.controller('SelectionController', function($scope, $window, $http, $rootScope, $modal) {
  $scope.window = window;
  $scope.submitModal = function(type) {
    $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'InvalidLogin',
    });
  };

  $scope.submitTopThree = function(selectionObj) {
    if ($rootScope.user === undefined) {
      $scope.submitModal('errorSubmit')
    } else {
      const selection = {
        user: $rootScope.user,
        winnerTopThreeID: selectionObj.winner,
        runnerUpTopThreeID: selectionObj.runnerUp,
        topThreeID: selectionObj.topThree,
        conID: selectionObj.con,
      };
      if (selectionObj.winner === null ||
          selectionObj.runnerUp === null ||
          selectionObj.topThree === null ||
          selectionObj.con === null) {
        $scope.submitModal('invalidSubmit');
      } else {
        return $http({
          method: 'POST',
          url: 'api/finalSelection',
          type: 'application/json',
          data: selection,
        })
        .then((res) => {
          $scope.submitModal('submitTop');
          $window.location.href = '#portfolio';
        });
      }
    }
  };

  $scope.submitWeeklySelection = function(selectionObj) {
    if ($rootScope.user === undefined) {
      $scope.submitModal('errorSubmit')
    } else {
      const selection = {
        user: $rootScope.user,
        winnerID: selectionObj.winner,
        runnerUpID: selectionObj.runnerUp,
        bottomID: selectionObj.bottom,
        eliminatedID: selectionObj.eliminated,
      };
      if (selectionObj.winner === null ||
          selectionObj.wrunnerUp === null ||
          selectionObj.bottom === null ||
          selectionObj.eliminated === null) {
        $scope.submitModal('invalidSubmit');
      } else {
        return $http({
          method: 'POST',
          url: 'api/weeklySelection',
          type: 'application/json',
          data: selection,
        })
        .then((res) => {
          $scope.submitModal('submitWeekly');
          $window.location.href = '#portfolio';
        });
      }
      
    }
  };

  $scope.submitTootBootSelection = function() {
    if ($rootScope.user === undefined) {
      $scope.submitModal('errorSubmit');
    } else {
      const selection = {
        user: $rootScope.user,
        selection: $scope.tootBoot,
      };
      return $http({
        method: 'POST',
        url: 'api/tootBootSelection',
        type: 'application/json',
        data: selection,
      })
      .then((res) => {
        $scope.submitModal('submitToot');
        $window.location.href = '#portfolio';
      });
    }
  };

  $scope.createTeam = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };

  $scope.joinTeam = function(type) {
    const modalInstance = $modal.open({
      templateUrl: `./app/partials/modals/${type}.html`,
      controller: 'ModalInstanceController',
    });
  };

  $scope.tootBoot = [true, true, true, true, true, true, true, true, true, true, true, true, true];
  $scope.toggleTootBoot = function(index) {
    $scope.tootBoot[index] = !$scope.tootBoot[index];
  };

  $scope.weeklyPick = ['Winner', 'RunnerUp', 'Lip-sync', 'Eliminated'];

  $scope.queens = [
    { queenID: 1,
      name: "Aja",
      entrance: "Your edges are officially snatched",
      age: 22,
      hometown: "Brooklyn",
    },
    { queenID: 2,
      name: "Alexis Michelle",
      entrance: "How do you like them egg rolls, Mr. Charles?",
      age: 33,
      hometown: "New York City",
    },
    { queenID: 3,
      name: "Charlie Hides",
      entrance: "Hi, hi, hi! It's about to get shady up in here!",
      age: 52,
      hometown: "London",
     },
    { queenID: 4,
      name: "Eureka OHara",
      entrance: "Give it up for the big girl! Serving pure catfish",
      age: 25,
      hometown: "Johnson City, TN",
    },
    { queenID: 5,
      name: "Farrah Moan",
      entrance: "So this is what it looks like",
      age: 23,
      hometown: "Las Vegas",
    },
    { queenID: 6,
      name: "Jaymes Mansfield",
      entrance: "Hi shapeshifters!",
      age: 26,
      hometown: "Madison, WI",
    },
    { queenID: 7,
      name: "Kimora Blac",
      entrance: "Is it me or is it hot in here?",
      age: 28,
      hometown: "Las Vegas",
    },
    { queenID: 8,
      name: "Nina BoNina Brown",
      entrance: "I'm Nina, Bo'nina, Banana, Fofana, Osama, Bin Laden Brown! Boom boom boom boom",
      age: 34,
      hometown: "Alanta",
    },
    { queenID: 9,
      name: "Peppermint",
      entrance: "Heeey!",
      age: 37,
      hometown: "New York City",
    },
    { queenID: 10,
      name: "Sasha Velour",
      entrance: "AHHHHH!?",
      age: 29,
      hometown: "Brooklyn",
    },
    { queenID: 11,
      name: "Shea Coulee",
      entrance: "My name is Shea Couleé and I didn't come to play, I came to slay",
      age: 27,
      hometown: "Chicago",
    },
    { queenID: 12,
      name: "Trinity Taylor",
      entrance: "The body is here, bitches!",
      age: 31,
      hometown: "Orlando",
    },
    { queenID: 13,
      name: "Valentina",
      entrance: "Hello, it's me... Valentina!",
      age: 25,
      hometown: "Los Angeles",
    },
          { queenID: 14,
        name: "Cynthia Lee Fontaine",
        // entrance: "Hello, it's me... Valentina!",
        age: 35,
        hometown: "Austin",
      },
  ];
});