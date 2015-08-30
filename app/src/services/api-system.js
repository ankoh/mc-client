function SystemApi($log, $q, $http, ServiceConfiguration) {
	this.config = ServiceConfiguration;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}
	
SystemApi.prototype.getStatus = function(config) {
	var url = "";
	url += config.getCacheHostname();
	url += ":";
	url += config.getCachePort();
	url += "/system/";

	$q = this.$q;

	return this.$http.get(url)
		.then(function(response) {
			return {
				"serverVersion": response.data["server-version"]
			};
		})
		.catch(function(response) {
			return $q.reject({
				code: response.status,
				text: response.statusText
			});
		});
}
