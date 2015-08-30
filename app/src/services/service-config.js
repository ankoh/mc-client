function ServiceConfiguration() {
	this.cacheHostname = mcConfig.cache.hostname;
	this.cachePort = mcConfig.cache.port;

	console.log("Server configuration ready");
	console.log("MendeleyCache hostname: " + this.cacheHostname);
	console.log("MendeleyCache port: " + this.cachePort)
}

// Getters for cache config
ServiceConfiguration.prototype.getCacheHostname = function() {
	return this.cacheHostname;
}
ServiceConfiguration.prototype.getCachePort = function() {
	return this.cachePort;
}