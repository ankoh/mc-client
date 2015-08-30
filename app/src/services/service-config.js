function ServiceConfiguration($log) {
	this.cacheHostname = mcConfig.cache.hostname;
	this.cachePort = mcConfig.cache.port;
	this.$log = $log

	this.$log.info("MendeleyCache hostname: " + this.cacheHostname);
	this.$log.info("MendeleyCache port: " + this.cachePort)
}

// Getters for cache config
ServiceConfiguration.prototype.getCacheHostname = function() {
	return this.cacheHostname;
}
ServiceConfiguration.prototype.getCachePort = function() {
	return this.cachePort;
}