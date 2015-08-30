// Initialize the angular application
angular
  .module('mendeleyCache', ['ngMaterial', 'ui.router', 'chart.js', 'md.data.table'])

  // Services
  .factory('ServiceConfiguration',
    function() { return new ServiceConfiguration(); })
  .factory('LocalCache',
    function() { return new LocalCache(); })
  .factory('ProfilesApi', [
    'ServiceConfiguration',
    function() { return new ProfilesApi(ServiceConfiguration); }])
  .factory('FieldsApi', [
    'ServiceConfiguration',
    function() { return new FieldsApi(ServiceConfiguration); }])
  .factory('DocumentsApi', [
    'ServiceConfiguration',
    function() { return new DocumentsApi(ServiceConfiguration); }])

  // Controllers
  .controller('ClientController', ClientController)
  .controller('SystemController', SystemController)
  .controller('DocumentsController', DocumentsController)

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
      .state('tabs.documents', {
        url: "/documents",
        data: {
          'selectedTab': 1
        },
        controller: 'DocumentsController',
        controllerAs: 'documents',
        templateUrl: "partials/documents.tmpl.html"
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
      .state('tabs.documentation', {
        url: "/documentation",
        data: {
          'selectedTab': 3
        },
        templateUrl: "partials/documentation.tmpl.html"
      })
  });