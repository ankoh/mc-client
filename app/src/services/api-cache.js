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

	return this.$http.get(url, {cache: false})
		.then(function(response) {
			var entities = {};
			for(i = 0; i < response.data.length; i++) {
				row = response.data[i]
				entities[row["table_name"]] = row["cnt"]
			}
			return entities
		})
		.catch(function(response) {
			return $q.reject({
				code: response.status,
				text: response.statusText
			});
		});
}
