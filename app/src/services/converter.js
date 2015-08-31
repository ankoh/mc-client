function Converter() {
}


Converter.prototype.getUnifiedFields = function (tags) {
	// given comma separated tags,
	// reproduce the fields as they're created on the server side
	var splitted = tags.replace(/ /g, '').toLowerCase().split(",");
	var trimmed = splitted.filter(function(x) { return x ? true : false; })
	var unified = trimmed.map(function(tag) { 
		var words = tag.split('-');
		var words = words.map(function(word) {
			 return word.charAt(0).toUpperCase() + word.slice(1)
		})
		return words.join(" ")
	});

	return unified;
}