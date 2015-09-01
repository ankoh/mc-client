function DocumentsApi($log, $q, $http, ServiceConfiguration) {
	this.config = ServiceConfiguration;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}
	
DocumentsApi.prototype.queryDocumentsAsync = function(profileIds, fieldIds, orderAttr, orderDir, offset, limit) {
	var url = this.config.getCacheUrlBase();
	url += "/documents";

	var arguments = []

	if(profileIds) {
		arguments.push("profile-ids=" + profileIds.join(','));
	}
	if(fieldIds) {
		arguments.push("field-ids=" + fieldIds.join(','));
	}
	if(orderAttr) {
		if(orderAttr == "pub_year") {
			orderAttr = "year";
		}
		arguments.push("order-attr=" + orderAttr);
	}
	if(orderDir) {
		arguments.push("order-dir=" + orderDir);
	}
	if(offset) {
		arguments.push("offset="+offset);
	}
	if(limit) {
		arguments.push("limit="+limit);
	}

	var argumentString = "?" + arguments.join("&")
	url += argumentString;

	this.$log.info("GET " + url);

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
