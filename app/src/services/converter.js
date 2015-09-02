function Converter() {
}


Converter.prototype.getUnifiedFields = function (tags) {
	// given comma separated tags,
	// reproduce the fields as they're created on the server side
	var splitted = tags.replace(/ /g, ' ').toLowerCase().split(",");
	var trimmed = splitted.filter(function(x) { return x ? true : false; })
	var unified = trimmed.map(function(tag) { 
		// first capitalize each word after a dash (cyber-physical -> Cyber-Physical)
		var words = tag.split('-');
		var words = words.map(function(word) {
			 return word.charAt(0).toUpperCase() + word.slice(1)
		})
		var words = words.join('-');

		// then capitalize each word after a space
		var words = words.split(' ');
		var words = words.map(function(word) {
			 return word.charAt(0).toUpperCase() + word.slice(1)
		})
		var words = words.join(' ');
		return words;
	});

	return unified;
}