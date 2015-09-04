function ProfilesApi($log, $q, $http, ServiceConfiguration) {
	this.config = ServiceConfiguration;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}

ProfilesApi.prototype.querySlimProfilesAsync = function() {
	var url = this.config.getCacheUrlBase();
	url += "/profiles/?slim=true";

	$q = this.$q;

	return this.$http.get(url, {cache: false})
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