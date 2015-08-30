function ProfilesApi(ServiceConfiguration) {
	this.profiles = [];

	this.profiles = [
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
}


ProfilesApi.prototype.getAllProfiles = function () {
	return this.profiles;
}