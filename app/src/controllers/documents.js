function DocumentsController($log, $q, $timeout, LocalCache, SystemApi, DocumentsApi) {
	this.cache = LocalCache
	this.systemApi = SystemApi;
	this.documentsApi = DocumentsApi;
	
	this.$log = $log;
	this.$timeout = $timeout;
	this.$q = $q;

	// Disable the loading circle
	this.loadingData = false;

	// Array for selected items
	this.selected = [];
  
  	// Query specified through the table header and footer (order, limit, offset)
	this.query = {
		order: '-pub_year',
		limit: 10,
		page: 1
	};

	// Total number of documents fetched through the System API
	this.totalNumberDocuments = 0;

	// Fetched document data
	this.data = []

	// Initial load of total doc number
	this.loadTotalNumber();

	// Initial population of table with documents
	this.loadDocuments();	
}

DocumentsController.prototype.loadTotalNumber = function() {
	var self = this;
	// Start promise chain for number load
	this.loadTotalNumberAsync().then(function(data) {
		self.totalNumberDocuments = data['cache_document'];
	}).catch(function(error) {
		self.$log.warn("Could not load the system entities");
	});
}

DocumentsController.prototype.loadTotalNumberAsync = function() {
	var deferred = this.$q.defer();
	if(this.cache.hasSystemEntities()) {
		data = this.cache.getSystemEntities();
		deferred.resolve(data);
	} else {
		self = this;
		this.systemApi.getEntitiesAsync().then(function(data) {
			deferred.resolve(data);
		}).catch(function(error) {
			deferred.reject(error);
		})
	}
	return deferred.promise;
}

DocumentsController.prototype.loadDocuments = function() {
	var self = this;

	// Start promise chain for document load
	this.loadingData = true;
	this.loadDocumentsAsync().then(function(data) {
		self.$log.info("Successfully queried documents");
		self.data = data;
	}).catch(function(error) {
		self.$log.warn("Could not query documents");
	}).finally(function() {
		self.$timeout(function(){ self.loadingData = false; }, 1100);
	});
}

DocumentsController.prototype.loadDocumentsAsync = function() {
	var deferred = this.$q.defer();

	var orderAttr = "pub_year";
	var orderDir = "asc";
	var offset = 0;
	var limit = 0;

	if(this.query.order) {
		if(this.query.order.substring(0,1) == "-") {
			orderDir = "desc";
			orderAttr = this.query.order.substring(1);
		} else {
			orderAttr = this.query.order;
		}
	}
	var limit = this.query.limit;
	var offset = limit * (this.query.page - 1);

	this.documentsApi.getDocumentsAsync(
		null, null, orderAttr, orderDir, offset, limit).then(function(data) {
		deferred.resolve(data);
	}).catch(function(error) {
		deferred.reject(error);
	})
	return deferred.promise;
}


DocumentsController.prototype.onPageChange = function(page, limit) {

};

DocumentsController.prototype.onOrderChange = function(order) {
};
