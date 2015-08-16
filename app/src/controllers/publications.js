angular.module('mendeleyCache')
	.controller('PublicationsCtrl', PublicationsCtrl);

function PublicationsCtrl($scope) {
	var self = this;
	self.selectedAuthor = null;
	self.appendAuthor = appendAuthor;
    self.authorSearchText = null;
	self.getAuthorMatches = getAuthorMatches;
	self.allAuthors = loadAuthors();
	self.selectedAuthors = [ ];

	/*
		This method gets called when the user presses enter to append a new author chip
	*/
	function appendAuthor() {
		console.log("fired");
	}

	/*
		The autocomplete control will set the authorSearchText and fire the getAuthorMatches() function.
		getAuthorMatches is then responsible for finding the matches among all authors. 
	*/
	function getAuthorMatches() {
		if (self.authorSearchText) {
			var lowercaseQuery = angular.lowercase(self.authorSearchText);
			var filterFn = function filterFn(author) {
				var lowercaseAuthor = angular.lowercase(author.name);
				return (lowercaseAuthor.indexOf(lowercaseQuery) != -1);;
			};
			return self.allAuthors.filter(filterFn);
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
}