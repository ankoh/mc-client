function LocalCache() {
	this.authors = [];
	this.fields = [];

	this.systemEntities = null;
	this.systemStatus = null;

}


// /system/status
LocalCache.prototype.hasSystemEntities = function() {
	return this.systemEntities != null;
}
LocalCache.prototype.getSystemEntities = function() {
	return this.systemEntities
}
LocalCache.prototype.setSystemEntities = function(entities) {
	this.systemEntities = entities;
}


// /system/entities
LocalCache.prototype.hasSystemStatus = function() {
	return this.systemStatus != null;
}
LocalCache.prototype.getSystemStatus = function() {
	return this.systemStatus
}
LocalCache.prototype.setSystemStatus = function(status) {
	this.systemStatus = status;
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