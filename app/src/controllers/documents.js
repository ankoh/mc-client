function DocumentsController($q, $timeout) {
	this.selected = [];
  
	this.query = {
		order: 'title',
		limit: 5,
		page: 1
	};

	this.documents = {
		"count": 2,
		"data": [
		  {
		  	"title": "ADAPTIVITY IN STORY-DRIVEN SERIOUS GAMES",
		  	"source": "IADIS International Conference - Game and Entertainment",
		  	"year": "2011",
		  	"fields": "Serious Games"
		  },
		  {
		  	"title": "An Analysis of Tool-Based Research in Software Engineering",
		  	"source": "International Computer Software and Applications Conference",
		  	"year": "2010",
		  	"fields": "Continuous Software Engineering"
		  }
		]
	};
}

DocumentsController.prototype.onPageChange = function(page, limit) {
	var deferred = this.$q.defer();

	this.$timeout(function () {
  		deferred.resolve();
	}, 2000);

	return deferred.promise;
};

DocumentsController.prototype.onOrderChange = function(order) {
	var deferred = this.$q.defer();

	this.$timeout(function () {
	  deferred.resolve();
	}, 2000);

	return deferred.promise;
};
