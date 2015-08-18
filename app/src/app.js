// Initialize the angular application
angular
  .module('mendeleyCache', ['ngMaterial', 'ui.router', 'chart.js'])

  // Services
  .factory('Cache', function() { return new Cache(); })
  .factory('ProfileApi', function() { return new ProfileApi(); })
  .factory('FieldApi', function() { return new FieldApi(); })
  .factory('PublicationApi', function() { return new PublicationApi(); })

  // Controllers
  .controller('ClientController', ClientController)
  .controller('SystemController', SystemController)
  .controller('StatisticsController', StatisticsController)

  // Configure theme
  .config(function($mdThemingProvider){
    // Extend the red theme with a few different colors
    var tumBlue = $mdThemingProvider.extendPalette('blue', {
      '500': '002143'
    });

    // Register the new color palette map with the name mendeleyRedMap
    $mdThemingProvider.definePalette('tumBlue', tumBlue);
    $mdThemingProvider.theme('default')
      .primaryPalette('tumBlue')
      .accentPalette('grey');
  })


  // Configure routing
  .config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /system
    $urlRouterProvider.otherwise("/");

    // Define the different routing states of the web app
    $stateProvider
      .state('tabs', {
        abstract: true,
        controller: function($scope) {
          $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.tabs.selectedIndex = toState.data.selectedTab;
          });
        },
        templateUrl: "partials/base.tmpl.html"
      })
      .state('tabs.system', {
        url: "/",
        data: {
          'selectedTab': 0
        },
        controller: 'SystemController',
        controllerAs: 'system',
        templateUrl: "partials/system.tmpl.html"
      })
      .state('tabs.statistics', {
        url: "/statistics",
        data: {
          'selectedTab': 1
        },
        controller: 'StatisticsController',
        controllerAs: 'statistics',
        templateUrl: "partials/statistics.tmpl.html"
      })
      .state('tabs.client', {
        url: "/client",
        data: {
          'selectedTab': 2
        },
        controller: 'ClientController',
        controllerAs: 'client',
        templateUrl: "partials/client.tmpl.html"
      })
      .state('tabs.docs', {
        url: "/docs",
        data: {
          'selectedTab': 3
        },
        templateUrl: "partials/docs.tmpl.html"
      })
  });