function Broker() {
	this.cache = Cache;
	console.log("Broker initialized");

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

	this.fields = [
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
}

Broker.prototype.fetchAuthors = function () {
	return this.authors;
}

Broker.prototype.fetchFields = function() {
	return this.fields;
}