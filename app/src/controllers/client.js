function ClientController() {
	var self = this;

	self.publications = {};
	self.authors = {};

	// Author list
	self.allAuthors = loadAuthors();
	self.allFields = loadFields();

	/* Publications */

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


	/* Authors */

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


	/*
		The autocomplete control will set the {author,filter}SearchText and fire the get{Author,Filter}Matches() function.
		getMatches is then responsible for finding the matches among all items. 
	*/
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


	/*
		For now the author array is just pre-populated with known values.
		TODO: I'll replace that with a more solid REST api call with loading indicator later.
	*/
	function loadAuthors() {
		var authors = [
			{ 
				name: 'Stephan Krusche',
				email: 'krusche@in.tum.de',
				publications: 20
			},
			{
				name: 'Constantin Scheuermann',
				email: 'scheuermann@in.tum.de',
				publications: 10
			},
			{
				name: 'Bernd Brügge',
				email: 'bruegge@in.tum.de',
				publications: 120
			},
			{
				name: 'Andreas Seitz',
				email: 'seitz@in.tum.de',
				publications: 5
			}
		];
		return authors;
    };


    /*
		For now the author array is just pre-populated with known values.
		TODO: I'll replace that with a more solid REST api call with loading indicator later.
	*/
	function loadFields() {
		var fields = [
			{ 
				name: 'Cyber Physical Systems',
				publications: 20
			},
			{
				name: 'Continuous Software Engineering',
				publications: 10
			},
			{
				name: 'Agile Development',
				publications: 30
			}
		];
		return fields;
    };



}