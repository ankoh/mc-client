function PublicationsController($q, $timeout) {
	var self = this;

	self.selected = [];
  
	self.query = {
		order: 'title',
		limit: 5,
		page: 1
	};

	self.documents = {
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

	self.onpagechange = function(page, limit) {
		var deferred = $q.defer();

		$timeout(function () {
	  		deferred.resolve();
		}, 2000);

		return deferred.promise;
	};

	self.onorderchange = function(order) {
		var deferred = $q.defer();

		$timeout(function () {
		  deferred.resolve();
		}, 2000);

		return deferred.promise;
	};
}