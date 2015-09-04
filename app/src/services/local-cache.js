function LocalCache() {
	this.systemEntities = null;
	this.systemStatus = null;
	this.fields = null;
	this.slimProfiles = null;
}

// Flush cache after /cache/update
LocalCache.prototype.flush = function() {
	this.systemEntities = null;
	this.systemStatus = null;
	this.fields = null;
	this.slimProfiles = null;
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

// /system/fields
LocalCache.prototype.hasFields = function() {
	return this.fields != null;
}
LocalCache.prototype.getFields = function() {
	return this.fields
}
LocalCache.prototype.setFields = function(entities) {
	this.fields = entities;
}

// /system/profiles?slim=true
LocalCache.prototype.hasSlimProfiles = function() {
	return this.slimProfiles != null;
}
LocalCache.prototype.getSlimProfiles = function() {
	return this.slimProfiles
}
LocalCache.prototype.setSlimProfiles = function(entities) {
	this.slimProfiles = entities;
}
