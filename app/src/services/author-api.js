function AuthorApi() {
	this.authors = [];

	this.authors = [
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

	console.log("AuthorApi initialized");
}


AuthorApi.prototype.getAllAuthors = function () {
	return this.authors;
}