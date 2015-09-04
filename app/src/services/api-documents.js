function DocumentsApi($log, $q, $http, ServiceConfiguration, Converter) {
	this.config = ServiceConfiguration;
	this.converter = Converter;
	this.$q = $q;
	this.$http = $http;
	this.$log = $log;
}
	
DocumentsApi.prototype.queryDocumentsAsync = function(profileIds, fieldIds, orderAttr, orderDir, offset, limit, onlyCount) {
	var self = this;
	var url = this.config.getCacheUrlBase();
	url += "/documents";

	var arguments = []

	if(profileIds) {
		profileIds = profileIds.map(function(id) { return self.converter.getB64UrlSafe(id); })
		arguments.push("profile-ids=" + profileIds.join(','));
	}
	if(fieldIds) {
		fieldIds = fieldIds.map(function(id) { return self.converter.getB64UrlSafe(id); })
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
	if(onlyCount) {
		arguments.push("only-count="+onlyCount);
	}

	var argumentString = "?" + arguments.join("&")
	url += argumentString;

	this.$log.info("GET " + url);

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
