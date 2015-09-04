/*
    These two variables get replaced with the respective values during the
    entrypoint script of the Docker container and depend on the environment variables
*/
var MC_BASE_HOST = ':base_host';
var MC_BASE_PORT = ':base_port';

/* 
    Documents API 
*/
function DocumentsApi(Converter) {
    if(MC_BASE_HOST.charAt(0) == ':') {
        MC_BASE_HOST='http://mc-server.kohn.io';
    }
    if(MC_BASE_PORT.charAt(0) == ':') {
        MC_BASE_PORT='80';
    }
    this.baseUrl = MC_BASE_HOST + ':' + MC_BASE_PORT;
};

DocumentsApi.prototype.queryDocumentsAsync = function(profileIds, fieldIds, orderAttr, orderDir, offset, limit, onlyCount) {
    var self = this;
    var url = this.baseUrl;
    url += '/documents';

    var arguments = []

    if(profileIds) {
        arguments.push('profile-ids=' + profileIds.join(','));
    }
    if(fieldIds) {
        arguments.push('field-ids=' + fieldIds.join(','));
    }
    if(orderAttr) {
        if(orderAttr == 'pub_year') {
            orderAttr = 'year';
        }
        arguments.push('order-attr=' + orderAttr);
    }
    if(orderDir) {
        arguments.push('order-dir=' + orderDir);
    }
    if(offset) {
        arguments.push('offset='+offset);
    }
    if(limit) {
        arguments.push('limit='+limit);
    }
    if(onlyCount) {
        arguments.push('only-count='+onlyCount);
    }
    var argumentString = '?' + arguments.join('&');
    url += argumentString;

    // Log url request
    window.console&&console.log('GET ' + url);

    // Return ajax promise
    return jQuery.getJSON(url);
}

var documentsApi = new DocumentsApi();

// Function that is executed as soon as jquery is loaded
jQuery(document).ready(function() {
    // Dont use the cache in Ajax calls
    jQuery.ajaxSetup({ cache: false });

    // Loop through mc-documents
    jQuery('.mc-documents').each(function() {
        // Prepare target div && parent
        var target = jQuery(this);
        target.addClass('mc-loading');

        // Fetch all the data variables
        var profileIds = null;
        if(typeof jQuery(this).data('profileids') !== 'undefined'){
            var data = jQuery(this).data('profileids');
            if(data) {
                // Kill whitespace
                profileIds = data.replace(/[ \n\t]+/, '');
                // Split by comma
                profileIds = profileIds.split(',');
            } 
        }
        var fieldIds = null;
        if(typeof jQuery(this).data('fieldids') !== 'undefined'){
            var data = jQuery(this).data('fieldids');
            if(data) {
                // Kill whitespace
                fieldIds = data.replace(/[ \n\t]+/, '');
                // Split by comma
                fieldIds = fieldIds.split(',');
            } 
        }
        var orderAttr = 'year';
        if(typeof jQuery(this).data('orderattr') !== 'undefined'){
            var data = jQuery(this).data('orderattr');
            if(data) {
                orderAttr = data;
            }
        }
        var orderDir = 'desc';
        if(typeof jQuery(this).data('orderdir') !== 'undefined'){
            var data = jQuery(this).data('orderdir');
            if(data) {
                orderDir = data;
            }
        } 
        var limit = '20';
        if(typeof jQuery(this).data('limit') !== 'undefined'){
            var data = jQuery(this).data('limit');
            if(data) {
                limit = data;
            }
        } 

        // Trigger async fetch
        documentsApi.queryDocumentsAsync(profileIds, fieldIds, orderAttr, orderDir, 0, limit)
            .done(function(data) {
                var docs = '<ul>';
                // loop through docs
                for (var i = 0; i < data.length; i++) {
                    docs += '<li>';
                    if(typeof data[i].title !== 'undefined') {
                        docs += '<b>' + data[i].title + '</b><br />';
                    }
                    if(typeof data[i].authors !== 'undefined') {
                        docs += data[i].authors;
                    }
                    if(typeof data[i].source !== "undefined" &&
                            typeof data[i].pub_year !== "undefined" &&
                            data[i].source != "" &&
                            data[i].pub_year != "") {
                        docs += '<br />' + data[i].source + ', ' + data[i].pub_year + '.</li>';
                    } else {
                        docs += '.</li>';
                    }
                }
                docs += '</ul>';

                // update target
                target.removeClass('mc-loading');
                target.addClass('mc-loaded');
                setTimeout(function() { target.empty(); target.append(docs);}, 1100);
            })
            .fail(function(jqXHR, textStatus) {
                window.console&&console.log(textStatus);
            });
    });
});