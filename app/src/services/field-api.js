function FieldApi() {
	this.fields = [];

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

	console.log("FieldApi initialized");
}


FieldApi.prototype.getAllFields = function() {
	return this.fields;
}