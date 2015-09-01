function DocumentsController(
	$scope, $log, $q, $timeout, $mdDialog,
	LocalCache, Converter, SystemApi, DocumentsApi, ProfilesApi, FieldsApi) {
	var self = this;

	this.cache = LocalCache
	this.systemApi = SystemApi;
	this.documentsApi = DocumentsApi;
	this.profilesApi = ProfilesApi;
	this.fieldsApi = FieldsApi;
	this.converter = Converter;
	
	this.$log = $log;
	this.$timeout = $timeout;
	this.$q = $q;
	this.$mdDialog = $mdDialog;

	this.firstRun = true;

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
			this.reloadTable();
		}
	});

	this._limit = 5;
	Object.defineProperty(this, 'limit', {
		get: function() {
			return this._limit;
		},
		set: function(value) {
			this._limit = value;
			this.reloadTable();
		}
	});

	this._page = 1;
	Object.defineProperty(this, 'page', {
		get: function() {
			return this._page;
		},
		set: function(value) {
			this._page = value;
			this.reloadTable();
		}
	});

	// Fetched document data
	this.data = []
	this.dataCount = 0;


	// Profile list
	this.profiles = [];
	this.fields = [];

	// Profile filter
	this.selectedProfileFilter = null;
	this.selectedProfileFilters = [ ];
    this.profileFilterSearchText = null;
    $scope.$watch("documents.selectedProfileFilters.length", function () { self.reloadTable(); } );

	// Research field filter
	this.selectedFieldFilter = null;
	this.selectedFieldFilters = [ ];
	this.fieldFilterSearchText = null;
	$scope.$watch("documents.selectedFieldFilters.length", function () { self.reloadTable(); } );


	// Initial population of table with documents
	this.reloadTable();	

	// End initialization with promises
	var self = this;
	this.loadSlimProfilesAsync()
		.then(function(data) { return self.loadFieldsAsync(); })
		.then(function(data) { self.ready = true; })
		.catch(function() { /* Catch error */ })
		.finally(function() { self.$timeout(function(){ self.loadingData = false; }, 1100); });
}


DocumentsController.prototype.reloadTable = function() {
	var self = this;

	// Abort if loading
	if(this.loadingData) {
		return;
	}

	// Start promise chain for document load
	this.loadingData = true;
	this.queryDocumentsAsync().then(function(data) {
		self.$log.info("Successfully queried documents");
		self.data = data;
	}).catch(function(error) {
		self.$log.warn("Could not query documents");
	}).finally(function() {
		self.$timeout(function(){ self.loadingData = false; }, 1100);
	});

	// Load document count in parallel
	this.queryDocumentCountAsync().then(function(data) {
		self.dataCount = data.cnt;
	})
}

DocumentsController.prototype.queryDocumentsAsync = function() {
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

	var profileIds = null;
	if(this.selectedProfileFilters.length > 0) {
		profileIds = this.selectedProfileFilters.map(function(filter) {
			return filter.id;
		})
	}
	var fieldIds = null;
	if(this.selectedFieldFilters.length > 0) {
		fieldIds = this.selectedFieldFilters.map(function(filter) {
			return filter.id;
		})
	}
	return this.documentsApi.queryDocumentsAsync(
		profileIds, fieldIds, orderAttr, orderDir, offset, limit);
}

DocumentsController.prototype.queryDocumentCountAsync = function() {
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

	var profileIds = null;
	if(this.selectedProfileFilters.length > 0) {
		profileIds = this.selectedProfileFilters.map(function(filter) {
			return filter.id;
		})
	}
	var fieldIds = null;
	if(this.selectedFieldFilters.length > 0) {
		fieldIds = this.selectedFieldFilters.map(function(filter) {
			return filter.id;
		})
	}
	var onlyCount = true;
	return this.documentsApi.queryDocumentsAsync(
		profileIds, fieldIds, orderAttr, orderDir, offset, limit, onlyCount);
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




DocumentsController.prototype.loadSlimProfilesAsync = function() {
	if(this.cache.hasSlimProfiles()) {
		this.profiles = this.cache.getSlimProfiles();
		return this.$q.resolve();
	} else {
		this.loadingData = true;
		var self = this;
		return this.profilesApi.querySlimProfilesAsync()
			.then(function(data) {
				self.cache.setSlimProfiles(data);
				self.profiles = data;
				self.$log.info("Successfully fetched " + data.length + " profiles");
			});
	}
}

DocumentsController.prototype.loadFieldsAsync = function() {
	if(this.cache.hasFields()) {
		this.fields = this.cache.getFields()
		return this.$q.resolve();
	} else {
		this.loadingData = true;
		var self = this;
		return this.fieldsApi.queryFieldsAsync()
			.then(function(data) {
				self.cache.setFields(data);
				self.fields = data;
				self.$log.info("Successfully fetched " + data.length + " fields");
			});
	}
}


DocumentsController.prototype.getProfileFilterMatches = function() {
	return this.getMatches(this.profileFilterSearchText, this.profiles, "name");
}

DocumentsController.prototype.getFieldFilterMatches = function() {
	return this.getMatches(this.fieldFilterSearchText, this.fields, "title");
}

DocumentsController.prototype.getMatches = function(searchText, array, attribute) {
	if(!this.ready) {
		return [];
	}

	if (searchText) {
		var lowercaseQuery = angular.lowercase(searchText);
		var filterFn = function filterFn(item) {
			var lowerCaseItem = angular.lowercase(item[attribute]);
			return (lowerCaseItem.indexOf(lowercaseQuery) != -1);;
		};
		return array.filter(filterFn);
	} else {
		return [];
	}
};

