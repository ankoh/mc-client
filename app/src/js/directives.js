/* 
	In order to show how the embedded documents will look like, i want to do exactly
	the steps the target website will do. Unfortunately that's a little bit tricky as
	the embed script uses jquery instead of angularjs and the jquery script needs
	to be executed AFTER angular rendered the page.
	We use a directive for that, that waits for the page being rendered with $timeout
	Then we download embed.js and dynamically execute the jquery code.

*/
angular.module('mendeleyCache.directives', [])
	.directive('mc-embedjs', function($timeout, $http) {
	    return {
	    	restrict: 'E',								// Restrict angular directive to be used as element
	    	transclude: true,							// The childs use the outer scope instead of the inner one
			link: function(scope, element, attr) {
				// Download embedjs
				$timeout(function() {

				});
			}
	    }
});