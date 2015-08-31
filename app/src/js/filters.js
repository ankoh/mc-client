angular.module('mendeleyCache.filters', []).filter('fields', function() {
  return function(input) {
  	// reproduce the tags as they're created on the server side
  	var tags = input.replace(/ /g, '').toLowerCase().split(",");
  	var unified = tags.map(function(tag) { 
  		var words = tag.split('-');
  		var words = words.map(function(word) {
  			 return word.charAt(0).toUpperCase() + word.slice(1)
  		})
  		return words.join(" ")
  	});

  	return unified;
  };
});

angular.module('mendeleyCache.filters', []).filter('splitByCommaLength', function() {
  return function(input) {
  	var splitted = input.split(",");
  	var trimmed = splitted.filter(function(x) { return x ? true : false; })
  	return trimmed.length;
  };
});