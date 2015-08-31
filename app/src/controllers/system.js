function SystemController($log, $q, $timeout, ServiceConfiguration, LocalCache, SystemApi) {
	this.config = ServiceConfiguration;
	this.cache = LocalCache
	this.systemApi = SystemApi;
	
	this.$log = $log;
	this.$timeout = $timeout;
	this.$q = $q;

	// Disable the loading circles
	this.loadingStatus = false;
	this.loadingEntities = false;

	// Initialize data asynchronously to get rid of tab lag
	this.initDataAsync();
};

SystemController.prototype.initDataAsync = function() {
	var deferred = this.$q.defer();
	if(this.cache.hasSystemStatus()) {
		data = this.cache.getSystemStatus();
		this.setStatus(data);
	} else {
		this.setStatus(null);
		this.reloadStatus();
	}

	// Check if items from /system/entities are cached
	if(this.cache.hasSystemEntities()) {
		data = this.cache.getSystemEntities();
		this.setEntities(data);
	} else {
		this.setEntities(null);
		this.reloadEntities();
	}
	return deferred.promise;
}

SystemController.prototype.setStatus = function(data) {
	if(data == null) {
		this.clientVersion 		= 	this.config.client.version;
		this.serverVersion 		= 	"Unknown";
		this.mendeleyStatus 	= 	"Unknown";
		this.lastUpdate 		=	"Unknown";
	} else {
		this.clientVersion 		= 	this.config.client.version;
		this.serverVersion 		= 	data["serverVersion"];
		this.mendeleyStatus 	= 	data["mendeleyStatus"];
		this.lastUpdate 		= 	data["lastUpdate"];
	}
}

SystemController.prototype.setEntities = function(data) {
	if(data == null) {
		this.profiles 				=	"Unknown";
		this.uniqueProfiles 		= 	"";
		this.profileToDocumentLinks = 	"Unknown";
		this.documents 				=	"Unknown";
		this.uniqueDocuments 		=	"";
		this.documentToFieldLinks 	= 	"Unknown";
		this.researchFields 		=	"Unknown";
	} else {
		this.profiles 				=	data["profile"];
		this.uniqueProfiles 		=	"( " + data["cache_profile"] + " unique )";
		this.profileToDocumentLinks = 	data["cache_profile_has_cache_document"];
		this.documents 				= 	data["document"];
		this.uniqueDocuments 		=	"( " + data["cache_document"] + " unique )";
		this.documentToFieldLinks 	=	data["cache_document_has_cache_field"];
		this.researchFields 		=	data["cache_field"];
	}
}

SystemController.prototype.reloadStatus = function() {
	this.loadingStatus = true;
	var promise = this.systemApi.getStatus();
	
	self = this;
	promise.then(function(data) {
		self.$log.info("Successfully fetched system status");
		self.cache.setSystemStatus(data);
		self.setStatus(data);
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.$timeout(function(){ self.loadingStatus = false; }, 1100);
	})
};

SystemController.prototype.reloadEntities = function() {
	this.loadingEntities = true;
	var promise = this.systemApi.getEntities();
	
	self = this;
	promise.then(function(data) {
		self.$log.info("Successfully fetched system entities");
		self.cache.setSystemEntities(data);
		self.setEntities(data);
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.$timeout(function(){ self.loadingEntities = false; }, 1100);
	})
};
