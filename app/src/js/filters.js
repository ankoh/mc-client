angular.module('mendeleyCache.filters', [])
	.filter('splitByCommaLength', function() {
		return function(input) {
			var splitted = input.split(",");
			var trimmed = splitted.filter(function(x) { return x ? true : false; })
			return trimmed.length;
		};
});