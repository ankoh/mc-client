function ServiceConfiguration($log, $location) {
	this.client = mcConfig.client;
	this.cache = mcConfig.cache;

	this.$log = $log;
	this.$location = $location;

	this.$log.info("Client version: " + this.client.version);
	this.$log.info("Cache hostname: " + this.cache.hostname);
	this.$log.info("Cache port: " + this.cache.port);
}

ServiceConfiguration.prototype.getClientUrlBase = function() {
	return this.$location.protocol() + "://" + this.$location.host() + ":" + this.$location.port();
}

ServiceConfiguration.prototype.getCacheUrlBase = function() {
	return this.cache.hostname+":"+this.cache.port;
}

ServiceConfiguration.prototype.getClientVersion = function() {
	return this.client.version;
}