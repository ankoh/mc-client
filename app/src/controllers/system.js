function SystemController() {
	this.loading = false
}

SystemController.prototype.reload = function() {
	this.loading = !this.loading
}
