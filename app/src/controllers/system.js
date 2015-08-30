function SystemController($log, $timeout, ServiceConfiguration, SystemApi) {
	this.config = ServiceConfiguration;
	this.systemApi = SystemApi;
	
	this.$log = $log;
	this.$timeout = $timeout;

	// Status
	this.loadingStatus = false;
	this.clientVersion = this.config.client.version;
	this.serverVersion = "Unknown";
	this.mendeleyStatus = "Unknown";
	this.lastUpdate = "Unknown";

	// Entities
	this.loadingEntities = false;
	this.profiles = "Unknown";
	this.uniqueProfiles = "";
	this.profileToDocumentLinks = "Unknown";
	this.documents = "Unknown";
	this.uniqueDocuments = "";
	this.documentToFieldLinks = "Unknown";
	this.researchFields = "Unknown";

	this.reloadStatus();
	this.reloadEntities();
};

SystemController.prototype.reloadStatus = function() {
	this.loadingStatus = true;
	var promise = this.systemApi.getStatus();
	
	self = this;
	promise.then(function(data) {
		self.$log.info("Successfully fetched system status");
		self.serverVersion = data.serverVersion;
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.$timeout(function(){ self.loadingStatus = false; }, 2000);
	})
};

SystemController.prototype.reloadEntities = function() {
	this.loadingEntities = true;
	var promise = this.systemApi.getEntities();
	
	self = this;
	promise.then(function(data) {
		self.$log.info("Successfully fetched system entities");

		console.log(data)

		self.profiles = data["profile"];
		self.uniqueProfiles = "( " + data["cache_profile"] + " unique )";
		self.profileToDocumentLinks = data["cache_profile_has_cache_document"];
		self.documents = data["document"];
		self.uniqueDocuments = "( " + data["cache_document"] + " unique )";
		self.documentToFieldLinks = data["cache_document_has_cache_field"];
		self.researchFields = data["cache_field"];

	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.$timeout(function(){ self.loadingEntities = false; }, 2000);
	})
};
