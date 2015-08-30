function LocalCache() {
	this.authors = [];
	this.fields = [];

}

// Authors
LocalCache.prototype.getAuthors = function() {
	return this.authors;
}
LocalCache.prototype.setAuthors = function(authors) {
	return this.authors = authors;
}

// Fields
LocalCache.prototype.getFields = function() {
	return this.fields;
}
LocalCache.prototype.setFields = function(fields) {
	return this.fields = fields;
}