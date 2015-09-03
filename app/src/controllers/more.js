function MoreController(
	$scope, $log, $q, $timeout, $mdDialog) {
	this.$scope = $scope;
	this.$log = $log;
	this.$q = $q;
	this.$timeout = $timeout;
	this.$mdDialog = $mdDialog;
}

MoreController.prototype.showAbout = function($event) {
	this.$mdDialog.show({
		controller: function($scope, $mdDialog) {
			$scope.hide = function() { $mdDialog.hide(); };
		},
		targetEvent: $event,
		templateUrl: 'partials/dialogs/about.tmpl.html',
		parent: angular.element(document.body),
		clickOutsideToClose:true
	}).then(function(answer) {
		
	}).catch(function() {

	});
};

MoreController.prototype.syncCache = function($event) {
	this.$mdDialog.show({
		controller: function($scope, $mdDialog) {
			$scope.hide = function() { $mdDialog.hide(); };
			$scope.state = 1;
			$scope.syncAnyway = function() { $scope.state = 2; }
		},
		targetEvent: $event,
		templateUrl: 'partials/dialogs/sync-cache.tmpl.html',
		parent: angular.element(document.body),
		clickOutsideToClose:true
	}).then(function(answer) {
		
	}).catch(function() {

	});
};