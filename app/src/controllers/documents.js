function DocumentsController(
	$scope, $log, $q, $timeout, $mdDialog, LocalCache, Converter, SystemApi, DocumentsApi) {

	this.cache = LocalCache
	this.systemApi = SystemApi;
	this.documentsApi = DocumentsApi;
	this.converter = Converter;
	
	this.$log = $log;
	this.$timeout = $timeout;
	this.$q = $q;
	this.$mdDialog = $mdDialog;

	// Disable the loading circle
	this.loadingData = false;

	// Array for selected items
	this.selected = [];
  

	// Use ECMAScript 5 properties instead of $watch
	this._order = '-pub_year';
	Object.defineProperty(this, 'order', {
		get: function() {
			return this._order;
		},
		set: function(value) {
			this._order = value;
			this.loadDocuments();
		}
	});

	this._limit = 10;
	Object.defineProperty(this, 'limit', {
		get: function() {
			return this._limit;
		},
		set: function(value) {
			this._limit = value;
			this.loadDocuments();
		}
	});

	this._page = 1;
	Object.defineProperty(this, 'page', {
		get: function() {
			return this._page;
		},
		set: function(value) {
			this._page = value;
			this.loadDocuments();
		}
	});

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

	if(this.order) {
		if(this.order.substring(0,1) == "-") {
			orderDir = "desc";
			orderAttr = this.order.substring(1);
		} else {
			orderAttr = this.order;
		}
	}
	var limit = this.limit;
	var offset = limit * (this.page - 1);

	this.documentsApi.getDocumentsAsync(
		null, null, orderAttr, orderDir, offset, limit).then(function(data) {
		deferred.resolve(data);
	}).catch(function(error) {
		deferred.reject(error);
	})
	return deferred.promise;
}


DocumentsController.prototype.onPageChange = function(page, limit) {};
DocumentsController.prototype.onOrderChange = function(order) {};



DocumentsController.prototype.selectDocument = function($event, selected) {
	this.$mdDialog.show({
		controller: function($scope, $mdDialog, $filter, Converter) {
			$scope.selectedDocument = selected;
			$scope.derivedFields = Converter.getUnifiedFields(selected.tags); 
			$scope.hide = function() { $mdDialog.hide(); };
		},
		targetEvent: $event,
		templateUrl: 'partials/dialogs/document-detail.tmpl.html',
		parent: angular.element(document.body),
		clickOutsideToClose:true
	}).then(function(answer) {
		
	}).catch(function() {

	});
};

