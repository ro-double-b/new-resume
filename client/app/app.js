angular.module('fantasyDragRace', [
  'ui.router',
  'ui.bootstrap',
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/portfolio');
    $stateProvider
    .state('portfolio', {
      url: '/portfolio',
      views: {
        '': { templateUrl: './app/views/index.html',
        },
        'about@portfolio': {
          templateUrl: './app/partials/about.html',
        },

        'selection@portfolio': {
          templateUrl: './app/partials/signedOut/selection.html',
          controller: 'SelectionController',
        },

        'aboutme@portfolio': {
          templateUrl: './app/partials/aboutme.html',
        },
      },
    })
    $locationProvider.html5Mode(true);
  });