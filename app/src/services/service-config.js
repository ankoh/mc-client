function ServiceConfiguration() {
	this.cacheHostname = "";
	this.cachePort = "";
	console.log("Configuration available");
}

// Getters for cache config
Cache.prototype.getCacheHostname = function() {
	return this.cacheHostname;
}
Cache.prototype.getCachePort = function() {
	return this.cachePort;
}