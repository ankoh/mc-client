function SystemController($log, ServiceConfiguration, SystemApi) {
	this.config = ServiceConfiguration
	this.systemApi = SystemApi;
	
	this.loading = false;

	this.$log = $log

	this.clientVersion = this.config.client.version;
	this.serverVersion = "Unknown"
	this.mendeleyStatus = "Unknown"
	this.researchGroup = "#"
	this.uptime = "Unkown"
	this.lastUpdate = "Unknown"
};

SystemController.prototype.reload = function() {
	this.loading = true;
	var promise = this.systemApi.getStatus(this.config);
	
	self = this;
	promise.then(function(status) {
		self.$log.info("Fetched system status:");
		self.serverVersion = status.serverVersion;
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.loading = false;
	})
};
