angular.module('mendeleyCache')
	.controller('PublicationsCtrl', PublicationsCtrl);

function PublicationsCtrl($scope) {
	var self = this;

	// Author filter
	self.selectedAuthor = null;
    self.authorSearchText = null;
	self.allAuthors = loadAuthors();
	self.selectedAuthors = [ ];
	self.getAuthorMatches = function() {
		return getMatches(self.authorSearchText, self.allAuthors);
	};

	// Research field filter
	self.selectedField = null;
	self.fieldSearchText = null;
	self.allFields = loadFields();
	self.selectedFields = [ ];
	self.getFieldMatches = function() {
		return getMatches(self.fieldSearchText, self.allFields);
	}


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