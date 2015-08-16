function ClientController(Cache, Broker) {
	var self = this;

	self.publications = {};
	self.authors = {};

	// Author list
	self.allAuthors = Broker.fetchAuthors();
	self.allFields = Broker.fetchFields();

	// Publications

	// Author filter
	self.publications.selectedAuthor = null;
    self.publications.authorSearchText = null;
	self.publications.selectedAuthors = [ ];
	self.publications.getAuthorMatches = function() {
		return getMatches(self.publications.authorSearchText, self.allAuthors);
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


	// Authors

	// Author filter
	self.authors.selectedAuthor = null;
    self.authors.authorSearchText = null;
	self.authors.selectedAuthors = [ ];
	self.authors.getAuthorMatches = function() {
		return getMatches(self.authors.authorSearchText, self.allAuthors);
	};
	// Research field filter
	self.authors.selectedField = null;
	self.authors.fieldSearchText = null;
	self.authors.selectedFields = [ ];
	self.authors.getFieldMatches = function() {
		return getMatches(self.authors.fieldSearchText, self.allFields);
	}
	// Dropdown for live url construction
	self.authors.dropdown = false;

	// The autocomplete control will set the {author,filter}SearchText and fire the get{Author,Filter}Matches() function.
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