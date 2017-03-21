function DocumentsController(
    $scope, $log, $q, $timeout, $mdDialog,
    ServiceConfiguration,
    LocalCache, Converter, CacheApi, DocumentsApi, ProfilesApi, FieldsApi) {
    var self = this;

    this.config = ServiceConfiguration;
    this.cache = LocalCache
    this.cacheApi = CacheApi;
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

    // Order attribute of data table
    this._order = '-pub_year';
    Object.defineProperty(this, 'order', {
        get: function() {
            return this._order;
        },
        set: function(value) {
            this._order = value;
            this.reloadTableAsync();
            // do not reload table total
        }
    });

    // Limit attribute of sql query
    this._limit = 6;
    Object.defineProperty(this, 'limit', {
        get: function() {
            return this._limit;
        },
        set: function(value) {
            this._limit = value;
            this.reloadTableAsync();
            // do not reload table total
        }
    });

    // Page attribute of sql query. page <=> offset
    this._page = 1;
    Object.defineProperty(this, 'page', {
        get: function() {
            return this._page;
        },
        set: function(value) {
            this._page = value;
            this.reloadTableAsync();
            // do not reload table total
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
    this.initProfileWatch = true;
    $scope.$watch("documents.selectedProfileFilters.length", function () {
        if(self.initProfileWatch) {
            self.initProfileWatch = false;
        } else {
            self.reloadTableTotalAsync();
            self.reloadTableAsync();
        }
    } );

    // Research field filter
    this.selectedFieldFilter = null;
    this.selectedFieldFilters = [ ];
    this.fieldFilterSearchText = null;
    this.initFieldWatch = true;
    $scope.$watch("documents.selectedFieldFilters.length", function () {
        if(self.initFieldWatch) {
            self.initFieldWatch = false;
        } else {
            self.reloadTableTotalAsync();
            self.reloadTableAsync();    
        }
    } );


    // Initial population of table with documents
    self.reloadTableTotalAsync();    
    this.reloadTableAsync();

    // Initial load of profiles and fields for filtering
    var self = this;
    this.loadSlimProfilesAsync()
        .then(function(data) { return self.loadFieldsAsync(); })
        .then(function(data) { self.ready = true; })
        .catch(function() { /* Catch error */ })
        .finally(function() { self.$timeout(function(){ self.loadingData = false; }, 1100); });
}


/*
    This function reloads the data table asynchronously and fetches the new total count
    for pagination
*/
DocumentsController.prototype.reloadTableAsync = function() {
    var self = this;

    // Start promise chain for document load
    this.loadingData = true;
    var dataPromise = this.queryDocumentsAsync().then(function(data) {
        self.$log.info("Fetched " + data.length + " documents");
        self.data = data;
    }).catch(function(error) {
        self.$log.warn("Could not query documents");
    }).finally(function() {
        self.$timeout(function(){ self.loadingData = false; }, 1100);
    });
    return dataPromise;
}


/*
    This function reloads the total data count of the table asynchronously
*/
DocumentsController.prototype.reloadTableTotalAsync = function() {
    var self = this;
    this.loadingData = true;
    var countPromise = this.queryDocumentCountAsync().then(function(data) {
        self.dataCount = data.cnt;
    })
    return countPromise;
}

/*
    This function asynchronously queryies the documents based on
    order, offset, limit and profile/field filters

*/
DocumentsController.prototype.queryDocumentsAsync = function() {
    // order, offset, limit are directly derived from the table controls
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

    // profileids and fileids are derived from the selected chips
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

    // pass everything to api service
    return this.documentsApi.queryDocumentsAsync(
        profileIds, fieldIds, orderAttr, orderDir, offset, limit);
}

/*
    This function asynchronously queryies the document count based on
    order, offset, limit and profile/field filters
    ATTENTION:
    Even though this function looks very similar to queryDocumentsAsync,
    it is called only when the filter changes.
    queryDocumentsAsync is called every time the table controls are used
*/
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

/* 
    This function shall load the slim profiles that are needed for
    the autocompleted chips
*/
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
                self.$log.info("Fetched " + data.length + " profiles");
            });
    }
}


/* 
    This function shall load the fields that are needed for
    the autocompleted chips
*/
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
                self.$log.info("Fetched " + data.length + " fields");
            });
    }
}


/* 
    Dummies as the md-data-table will disable
    the pagination controls if no triggers are passed....
*/
DocumentsController.prototype.onPageChange = function(page, limit) {};
DocumentsController.prototype.onOrderChange = function(order) {};


/*
    This function is called when a document is selected in the table.
    It will show the mdDialog with details to the document
*/
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

/*
    Generate data for the embedded query
*/
DocumentsController.prototype.getEmbedData = function() {
    // Create string for profileIds
    var profileIdsString = ""
    for(var i = 0; i < this.selectedProfileFilters.length; i++) {
        if(profileIdsString != "") {
            profileIdsString += ",\n\t"
        } else {
            profileIdsString += "\n\t"
        }
        id = this.converter.getB64UrlSafe(this.selectedProfileFilters[i].id);
        profileIdsString += id;
    }

    // Create string for fieldIds
    var fieldIdsString = ""
    for(var i = 0; i < this.selectedFieldFilters.length; i++) {
        if(fieldIdsString != "") {
            fieldIdsString += ",\n\t"
        } else {
            fieldIdsString += "\n\t"
        }
        id = this.converter.getB64UrlSafe(this.selectedFieldFilters[i].id);
        fieldIdsString += id;
    }

    // Extract orderAttr, orderDir
    var orderAttr = "pub_year";
    var orderDir = "asc";
    if(this.order) {
        if(this.order.substring(0,1) == "-") {
            orderDir = "desc";
            orderAttr = this.order.substring(1);
        } else {
            orderAttr = this.order;
        }
    }

    // Get URL Base for script src
    var baseUrl = this.config.getCacheUrlBase();

    return [profileIdsString, fieldIdsString, orderAttr, orderDir, baseUrl]
}

/*
    Show the embedded div tag
*/
DocumentsController.prototype.embedQuery = function($event) {
    var embedData = this.getEmbedData();
    // Show dialog
    this.$mdDialog.show({
        controller: function($scope, $mdDialog, ServiceConfiguration) {
            $scope.profileIds = embedData[0];
            $scope.fieldIds = embedData[1]; 
            $scope.orderAttr = embedData[2];
            $scope.orderDir = embedData[3];
            $scope.limit = 20;
            $scope.baseUrl = ServiceConfiguration.getClientUrlBase();
            $scope.hide = function() { $mdDialog.hide(); };
        },
        targetEvent: $event,
        templateUrl: 'partials/dialogs/embed.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
    }).then(function(answer) {
    }).catch(function() {

    });
};

/*
    Show the page with the embedded query
*/
DocumentsController.prototype.embeddedQuery = function($event) {
    var embedData = this.getEmbedData();
    
    // Show dialog
    this.$mdDialog.show({
        controller: function($scope, $mdDialog, ServiceConfiguration) {
            $scope.profileIds = embedData[0];
            $scope.fieldIds = embedData[1]; 
            $scope.orderAttr = embedData[2];
            $scope.orderDir = embedData[3];
            $scope.limit = 20;
            $scope.hide = function() { $mdDialog.hide(); };
        },
        targetEvent: $event,
        templateUrl: 'partials/dialogs/embedded.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
    }).then(function(answer) {
    }).catch(function() {

    });
};


/*
    Given a search text, this function returns the matches in the respective arrays
    This is used for the autocompletion
*/
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
DocumentsController.prototype.getProfileFilterMatches = function() {
    return this.getMatches(this.profileFilterSearchText, this.profiles, "name");
}
DocumentsController.prototype.getFieldFilterMatches = function() {
    return this.getMatches(this.fieldFilterSearchText, this.fields, "title");
}

