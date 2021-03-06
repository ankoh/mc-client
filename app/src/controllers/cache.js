function CacheController($log, $q, $timeout, ServiceConfiguration, LocalCache, CacheApi) {
    this.config = ServiceConfiguration;
    this.cache = LocalCache
    this.cacheApi = CacheApi;
    
    this.$log = $log;
    this.$timeout = $timeout;
    this.$q = $q;

    // Disable the loading circle
    this.loadingData = false;

    // Initialize data asynchronously to get rid of tab lag
    this.initDataAsync();
};

CacheController.prototype.initDataAsync = function() {
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
}

CacheController.prototype.setStatus = function(data) {
    if(data == null) {
        this.mendeleyStatus     =     "Unknown";
        this.lastUpdate         =    "Unknown";
    } else {
        this.mendeleyStatus     =     data["mendeleyStatus"];
        this.lastUpdate         =     data["lastUpdate"];
    }
}

CacheController.prototype.setEntities = function(data) {
    if(data == null) {
        this.profiles                 =    "Unknown";
        this.uniqueProfiles         =     "";
        this.profileToDocumentLinks =     "Unknown";
        this.documents                 =    "Unknown";
        this.uniqueDocuments         =    "";
        this.documentToFieldLinks     =     "Unknown";
        this.researchFields         =    "Unknown";
    } else {
        this.profiles                 =    data["profile"];
        this.uniqueProfiles         =    "( " + data["cache_profile"] + " unique )";
        this.profileToDocumentLinks =     data["cache_profile_has_cache_document"];
        this.documents                 =     data["document"];
        this.uniqueDocuments         =    "( " + data["cache_document"] + " unique )";
        this.documentToFieldLinks     =    data["cache_document_has_cache_field"];
        this.researchFields         =    data["cache_field"];
    }
}

CacheController.prototype.reloadData = function() {
    this.reloadStatus();
    this.reloadEntities();
}

CacheController.prototype.reloadStatus = function() {
    this.loadingData = true;

    var self = this;
    this.cacheApi.queryStatusAsync().then(function(data) {
        self.cache.setSystemStatus(data); 
        self.setStatus(data);
    }).catch(function(error) {
        self.$log.warn("Could not load the system status");
    }).finally(function() {
        self.$timeout(function(){ self.loadingData = false; }, 1100);
    })
};

CacheController.prototype.reloadEntities = function() {
    this.loadingData = true;

    var self = this;
    this.cacheApi.queryEntitiesAsync().then(function(data) {
        self.cache.setSystemEntities(data);
        self.setEntities(data);
    }).catch(function(error) {
        self.$log.warn("Could not load the system entities");
    }).finally(function() {
        self.$timeout(function(){ self.loadingData = false; }, 1100);
    })
};
