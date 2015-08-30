function ClientController(ProfilesApi, FieldsApi) {
	var self = this;

	self.publications = {};

	// Profile list
	self.allProfiles = ProfilesApi.getAllProfiles();
	self.allFields = FieldsApi.getAllFields();

	// Publications

	// Profile filter
	self.publications.selectedProfile = null;
    self.publications.profileSearchText = null;
	self.publications.selectedProfiles = [ ];
	self.publications.getProfileMatches = function() {
		return getMatches(self.publications.profileSearchText, self.allProfiles);
	};
	// Research field filter
	self.publications.selectedField = null;
	self.publications.fieldSearchText = null;
	self.publications.selectedFields = [ ];
	self.publications.getFieldMatches = function() {
		return getMatches(self.publications.fieldSearchText, self.allFields);
	}
	// Dropdown for live url construction
	self.publications.dropdown = false;


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