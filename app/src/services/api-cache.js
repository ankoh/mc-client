function CacheApi($log, $q, $http, ServiceConfiguration) {
	this.config = ServiceConfiguration;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}
	
CacheApi.prototype.queryStatusAsync = function() {
	var url = this.config.getCacheUrlBase();
	url += "/cache/status";

	$q = this.$q;

	this.$log.info("GET " + url);

	return this.$http.get(url, {cache: false})
		.then(function(response) {
			return {
				"serverVersion": response.data["serverVersion"],
				"mendeleyStatus": response.data["mendeleyStatus"],
				"lastUpdate": response.data["lastUpdate"]
			};
		})
		.catch(function(response) {
			return $q.reject({
				code: response.status,
				text: response.statusText
			});
		});
}

CacheApi.prototype.queryEntitiesAsync = function() {
	var url = this.config.getCacheUrlBase();
		url += "/cache/entities";

	$q = this.$q;

	this.$log.info("GET " + url);

	return this.$http.get(url, {cache: false})
		.then(function(response) {
			var entities = {};
			for(i = 0; i < response.data.length; i++) {
				row = response.data[i]
				entities[row["table_name"]] = row["cnt"]
			}
			return $q.resolve(entities);
		})
		.catch(function(response) {
			return $q.reject({
				code: response.status,
				text: response.statusText
			});
		});
}

CacheApi.prototype.triggerUpdateAsync = function() {
	var url = this.config.getCacheUrlBase();
		url += "/cache/update";

	$q = this.$q;

	this.$log.info("POST " + url);

	return this.$http.post(url, {cache: false})
		.then(function(response) {
			return response.data;
		})
		.catch(function(response) {
			return $q.reject({
				code: response.status,
				text: response.statusText
			});
		});
}


