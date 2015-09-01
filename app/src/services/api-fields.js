function FieldsApi($log, $q, $http, ServiceConfiguration) {
	this.config = ServiceConfiguration;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}

FieldsApi.prototype.queryFieldsAsync = function() {
	var url = this.config.getCacheUrlBase();
	url += "/fields";

	$q = this.$q;

	return this.$http.get(url)
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