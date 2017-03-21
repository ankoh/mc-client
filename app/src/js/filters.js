angular.module('mendeleyCache')
    .filter('splitByCommaLength', function() {
        return function(input) {
            var splitted = input.split(",");
            var trimmed = splitted.filter(function(x) { return x ? true : false; })
            return trimmed.length;
        };
});

angular.module('mendeleyCache')
    .filter('monthName', [function() {
        return function (monthNumber) { //1 = January
                var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December' ];
                if(monthNumber < 1 || monthNumber > 12) {
                    return 'Unknown';
                } else {
                    return monthNames[monthNumber - 1];
                }
        }
}]);
