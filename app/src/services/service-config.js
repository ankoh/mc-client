function ServiceConfiguration($log) {
	this.client = mcConfig.client;
	this.cache = mcConfig.cache;

	this.$log = $log

	this.$log.info("Client version: " + this.client.version);
	this.$log.info("Cache hostname: " + this.cache.hostname);
	this.$log.info("Cache port: " + this.cache.port);
}

ServiceConfiguration.prototype.getCacheUrlBase = function() {
	return this.cache.hostname+":"+this.cache.port;
}

ServiceConfiguration.prototype.getClientVersion = function() {
	return this.client.version;
}