function ClientController(ProfilesApi, FieldsApi) {
	var self = this;

	self.documents = {};

	// Profile list
	self.allProfiles = ProfilesApi.getAllProfiles();
	self.allFields = FieldsApi.getAllFields();

	// Publications

	// Profile filter
	self.documents.selectedProfile = null;
    self.documents.profileSearchText = null;
	self.documents.selectedProfiles = [ ];
	self.documents.getProfileMatches = function() {
		return getMatches(self.documents.profileSearchText, self.allProfiles);
	};
	// Research field filter
	self.documents.selectedField = null;
	self.documents.fieldSearchText = null;
	self.documents.selectedFields = [ ];
	self.documents.getFieldMatches = function() {
		return getMatches(self.documents.fieldSearchText, self.allFields);
	}
	// Dropdown for live url construction
	self.documents.dropdown = false;


	// The autocomplete control will set the {profile,filter}SearchText and fire the get{Profile,Filter}Matches() function.
	// getMatches is then responsible for finding the matches among all items. 
	function getMatches(searchText, array) {
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
}