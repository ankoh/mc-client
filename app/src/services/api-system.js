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
				"serverVersion": response.data["serverVersion"]
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
			return {
			};
		})
		.catch(function(response) {
			return $q.reject({
				code: response.status,
				text: response.statusText
			});
		});
}
