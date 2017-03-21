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

    this.$log.info("GET " + url);

    return this.$http.get(url, {cache: false})
        .then(function(response) {
            return $q.resolve(response.data);
        })
        .catch(function(response) {
            return $q.reject({
                code: response.status,
                text: response.statusText
            });
        });
}
