function ClientController(ProfilesApi, FieldsApi) {
	// Profile list
	this.allProfiles = ProfilesApi.getAllProfiles();
	this.allFields = FieldsApi.getAllFields();

	// Publications

	// Profile filter
	this.selectedProfile = null;
    this.profileSearchText = null;
	this.selectedProfiles = [ ];

	// Research field filter
	this.selectedField = null;
	this.fieldSearchText = null;
	this.selectedFields = [ ];

	// Dropdown for live url construction
	this.dropdown = false;
}

ClientController.prototype.getProfileMatches = function() {
	return this.getMatches(this.profileSearchText, this.allProfiles);
}

ClientController.prototype.getFieldMatches = function() {
	return this.getMatches(this.fieldSearchText, this.allFields);
}

// The autocomplete control will set the {profile,filter}SearchText and fire the get{Profile,Filter}Matches() function.
// getMatches is then responsible for finding the matches among all items. 
ClientController.prototype.getMatches = function(searchText, array) {
	if (searchText) {
		var lowercaseQuery = angular.lowercase(searchText);
		var filterFn = function filterFn(item) {
			var lowerCaseItem = angular.lowercase(item.name);
			return (lowerCaseItem.indexOf(lowercaseQuery) != -1);;
		};
		return array.filter(filterFn);
	} else {
		return [];
	}
};