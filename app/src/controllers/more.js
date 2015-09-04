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
		controller: function($scope, $mdDialog,  $timeout, CacheApi, LocalCache) {
			$scope.hide = function() { $mdDialog.hide(); };
			$scope.state = 1;
			$scope.syncAnyway = function() { 
				$scope.state = 2; 
				CacheApi.triggerUpdateAsync()
					.then(function(data) {
						$scope.state = 3;
						$scope.workStatus = "Succeeded";
						$scope.profiles = data["profiles"];
						$scope.documents = data["documents"];
						$scope.fields = data["fields"];
						$scope.unified_profiles = data["unified_profiles"];
						$scope.unified_documents = data["unified_documents"];
						$scope.field_associations = data["field_associations"];
						LocalCache.flush();
					})
					.catch(function(error) {
						$scope.state = 3;
						$scope.workStatus = "Failed";
					});
			}
		},
		targetEvent: $event,
		templateUrl: 'partials/dialogs/sync-cache.tmpl.html',
		parent: angular.element(document.body),
		clickOutsideToClose:true
	}).then(function(answer) {
		
	}).catch(function() {

	});
};