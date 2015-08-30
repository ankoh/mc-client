function SystemApi($log, $q, $http, ServiceConfiguration) {
	this.config = ServiceConfiguration;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}
	
SystemApi.prototype.getStatus = function() {
	var url = this.config.getCacheUrlBase();
	url += "/system/status";

	$q = this.$q;

	return this.$http.get(url)
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

SystemApi.prototype.getEntities = function() {
	var url = this.config.getCacheUrlBase();
		url += "/system/entities";

	$q = this.$q;

	return this.$http.get(url)
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
