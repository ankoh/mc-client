// Initialize the angular application
angular
  .module('mendeleyCache', ['mendeleyCache.filters', 'ngMaterial', 'ui.router', 'md.data.table'])

  // Services
  .factory('ServiceConfiguration', [
    '$log',
    function($log) { return new ServiceConfiguration($log); }
    ])
  .factory('LocalCache', [
    '$log',
    function($log) { return new LocalCache($log); }
    ])
  .factory('Converter', [
    '$log',
    function() { return new Converter(); }
    ])
  .factory('ProfilesApi', [
    '$log', '$q', '$http', 'ServiceConfiguration',
    function($log, $q, $http, ServiceConfiguration) { return new ProfilesApi($log, $q, $http, ServiceConfiguration); }
    ])

  .factory('FieldsApi', [
    '$log', '$q', '$http', 'ServiceConfiguration',
    function($log, $q, $http, ServiceConfiguration) { return new FieldsApi($log, $q, $http, ServiceConfiguration); }
    ])

  .factory('DocumentsApi', [
    '$log', '$q', '$http', 'ServiceConfiguration',
    function($log, $q, $http, ServiceConfiguration) { return new DocumentsApi($log, $q, $http, ServiceConfiguration); }
    ])

  .factory('SystemApi', [
    '$log', '$q', '$http', 'ServiceConfiguration',
    function($log, $q, $http, ServiceConfiguration) { return new SystemApi($log, $q, $http, ServiceConfiguration); }
    ])

  // Controllers
  .controller('SystemController',     SystemController)
  .controller('DocumentsController',  DocumentsController)

  // Configure theme
  .config(function($mdThemingProvider){
    // Extend the red theme with a few different colors
    var tumBlue = $mdThemingProvider.extendPalette('blue', {
      '100': 'dddddd',    // scrollbar background
      '500': '002143'     // primary color
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
      .state('tabs.documents', {
        url: "/documents",
        data: {
          'selectedTab': 1
        },
        controller: 'DocumentsController',
        controllerAs: 'documents',
        templateUrl: "partials/documents.tmpl.html"
      })
      .state('tabs.api', {
        url: "/api",
        data: {
          'selectedTab': 2
        },
        templateUrl: "partials/api.tmpl.html"
      })
  });