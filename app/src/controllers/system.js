function SystemController($log, ServiceConfiguration, SystemApi) {
	this.config = ServiceConfiguration
	this.systemApi = SystemApi;
	
	this.loading = false;

	this.$log = $log
};

SystemController.prototype.reload = function() {
	this.loading = true;
	var promise = this.systemApi.getStatus(this.config);
	self = this;

	promise.then(function(status) {
		self.$log.info("Fetched system status:");
		self.$log.info(status);
	}).catch(function(error) {
		self.$log.warn("Could not load the system status");
	}).finally(function() {
		self.loading = false;
	})
};
