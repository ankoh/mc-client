function SystemController($log, ServiceConfiguration, SystemApi) {
	this.config = ServiceConfiguration
	this.systemApi = SystemApi;
	
	this.$log = $log

	// Status
	this.loadingStatus = false;
	this.clientVersion = this.config.client.version;
	this.serverVersion = "Unknown";
	this.mendeleyStatus = "Unknown";
	this.uptime = "Unkown";
	this.lastUpdate = "Unknown";

	// Entities
	this.loadingEntities = false;
	this.profiles = "Unknown";
	this.profileToDocumentLinks = "Unknown";
	this.documents = "Unknown";
	this.documentToFieldLinks = "Unknown";
	this.researchFields = "Unknown";
};

SystemController.prototype.reloadStatus = function() {
	this.loadingStatus = true;
	var promise = this.systemApi.getStatus();
	
	self = this;
	promise.then(function(data) {
		self.$log.info("Fetched system status:");
		self.serverVersion = data.serverVersion;
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.loadingStatus = false;
	})
};

SystemController.prototype.reloadEntities = function() {
	this.loadingEntities = true;
	var promise = this.systemApi.getStatus();
	
	self = this;
	promise.then(function(data) {
		self.$log.info("Fetched system entities:");
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.loadingEntities = false;
	})
};
