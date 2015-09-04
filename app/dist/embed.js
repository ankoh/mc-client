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
    this.baseUrl = MC_BASE_HOST + ':' + MC_BASE_PORT;
}
DocumentsApi.prototype.queryDocumentsAsync = function(profileIds, fieldIds, orderAttr, orderDir, offset, limit, onlyCount) {
    var self = this;
    var url = this.config.getCacheUrlBase();
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
    var argumentString = '?' + arguments.join('&')
    url += argumentString;

    // Log url request
    window.console&&console.log('GET ' + url);

    // Return ajax promise
    return jQuery.ajax({
        method: 'GET',
        url:url,
        cache: false
    });
}

var documentsApi = DocumentsApi();

jQuery('.mc-documents').each(function() {
    // Prepare target div && parent
    var target = jQuery(this);
    target.parent().addClass('mc-loading');
    target.hide();

    // Fetch all the data variables
    var profileIds = '';
    if(typeof jQuery(this).data('profileids') !== 'undefined'){}
        profileIds = jQuery(this).data('profileids');
        // Kill whitespace
        profileIds = profileIds.replace(/[ \n\t]+/, '';
        // Split by comma
        profileIds = profileIds.split(',');
    }
    var fieldIds = '';
    if(typeof jQuery(this).data('fieldids') !== 'undefined'){}
        fieldIds = jQuery(this).data('fieldids');
        // Kill whitespace
        fieldIds = fieldIds.replace(/[ \n\t]+/, '';
        // Split by comma
        fieldIds = fieldIds.split(',');
    }
    var orderAttr = 'year';
    if(typeof jQuery(this).data('orderattr') !== 'undefined'){}
        orderAttr = jQuery(this).data('orderattr');
    }
    var orderDir = 'desc';
    if(typeof jQuery(this).data('orderdir') !== 'undefined'){}
        orderDir = jQuery(this).data('orderdir');
    } 
    var limit = '30';
    if(typeof jQuery(this).data('limit') !== 'undefined'){}
        limit = jQuery(this).data('limit');
    } 

    // Trigger async fetch
    documentsApi.queryDocumentsAsync(profileIds, fieldIds, orderAttr, orderDir, 0, limit)
        .done(function(data) {
            var docs = '<ul>';
            // loop through docs
            for (var i = 0; i < data.length; i++) {
                if(typeof data[i].title !== 'undefined') {
                    docs += '<b>' + data[i].title + '</b><br />';
                }
                if(typeof data[i].authors !== 'undefined') {
                    docs += data[i].authors + '<br />';
                }
                if(typeof data[i].source !== "undefined" && data[i].source != null)) {
                    docs += data[i].source + ", ";
                }
                if((typeof data[i].year !== "undefined")) {
                    docs += data[i].year;
                }
                docs += ".</li>";
            }
            docs += '</ul>';

            // update target
            target.parent().removeClass('mc-loading');
            target.parent().addClass('mc-loaded');
            target.replaceWith(docs);
        })
        .fail(function(jqXHR, textStatus) {
            window.console&&console.log(textStatus);
        });
})