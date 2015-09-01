function ClientController(
	$scope, $log, $q, $timeout, $mdDialog, LocalCache,
	DocumentsApi, ProfilesApi, FieldsApi) {

	// My services
	this.cache = LocalCache
	this.documentsApi = DocumentsApi;
	this.profilesApi = ProfilesApi;
	this.fieldsApi = FieldsApi;

	// Angular services
	this.$scope = $scope;
	this.$log = $log;
	this.$q = $q;
	this.$timeout = $timeout;
	this.$mdDialog = $mdDialog;

	// Profile list
	this.profiles = [];
	this.fields = [];

	// Profile filter
	this.selectedProfile = null;
	this.selectedProfiles = [ ];
    this.profileSearchText = null;

	// Research field filter
	this.selectedField = null;
	this.selectedFields = [ ];
	this.fieldSearchText = null;

	// Trigger initial load of fields and profiles
	this.loadingData = true;
	// Use variable to set if data is ready
	this.ready = true;

	// End initialization with promises
	var self = this;
	this.loadSlimProfilesAsync()
		.then(function(profiles) { return self.loadFieldsAsync(); })
		.then(function() { self.ready = true; })
		.catch(function() { /* Catch error */ })
		.finally(function() { self.$timeout(function(){ self.loadingData = false; }, 1100); })
}

ClientController.prototype.loadSlimProfilesAsync = function() {
	var self = this;
	return this.profilesApi.getSlimProfilesAsync()
		.then(function(data) { 
			self.$log.info("Successfully fetched " + data.length + " slim profiles");
			self.profiles = data;
		})
}

ClientController.prototype.loadFieldsAsync = function() {
	var self = this;
	return this.fieldsApi.getFieldsAsync()
		.then(function(data) {
			self.$log.info("Successfully " + data.length + " fetched fields");
			self.fields = data;
		})
}

ClientController.prototype.getProfileMatches = function() {
	return this.getMatches(this.profileSearchText, this.profiles, "name");
}

ClientController.prototype.getFieldMatches = function() {
	return this.getMatches(this.fieldSearchText, this.fields, "title");
}

// The autocomplete control will set the {profile,filter}SearchText and fire the get{Profile,Filter}Matches() function.
// getMatches is then responsible for finding the matches among all items. 
ClientController.prototype.getMatches = function(searchText, array, attribute) {
	if (searchText) {
		var lowercaseQuery = angular.lowercase(searchText);
		var filterFn = function filterFn(item) {
			var lowerCaseItem = angular.lowercase(item[attribute]);
			return (lowerCaseItem.indexOf(lowercaseQuery) != -1);;
		};
		return array.filter(filterFn);
	} else {
		return [];
	}
};