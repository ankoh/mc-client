function Cache() {
	this.authors = [];
	this.fields = [];
	console.log("Cache initialized");
}

// Authors
Cache.prototype.getAuthors = function() {
	return this.authors;
}
Cache.prototype.setAuthors = function(authors) {
	return this.authors = authors;
}

// Fields
Cache.prototype.getFields = function() {
	return this.fields;
}
Cache.prototype.setFields = function(fields) {
	return this.fields = fields;
}