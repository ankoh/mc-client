/*
    These two variables get replaced with the respective values during the
    entrypoint script of the Docker container and depend on the environment variables
*/
var MC_BASE_HOST = ":baseHost";
var MC_BASE_PORT = ":basePort";

/* 
    Documents API 
*/
function DocumentsApi(Converter) {
    this.baseUrl = MC_BASE_HOST + ":" + MC_BASE_PORT;
}
DocumentsApi.prototype.queryDocumentsAsync = function(profileIds, fieldIds, orderAttr, orderDir, offset, limit, onlyCount) {
    var self = this;
    var url = this.config.getCacheUrlBase();
    url += "/documents";

    var arguments = []

    if(profileIds) {
        arguments.push("profile-ids=" + profileIds.join(','));
    }
    if(fieldIds) {
        arguments.push("field-ids=" + fieldIds.join(','));
    }
    if(orderAttr) {
        if(orderAttr == "pub_year") {
            orderAttr = "year";
        }
        arguments.push("order-attr=" + orderAttr);
    }
    if(orderDir) {
        arguments.push("order-dir=" + orderDir);
    }
    if(offset) {
        arguments.push("offset="+offset);
    }
    if(limit) {
        arguments.push("limit="+limit);
    }
    if(onlyCount) {
        arguments.push("only-count="+onlyCount);
    }
    var argumentString = "?" + arguments.join("&")
    url += argumentString;

    // Log url request
    window.console&&console.log("GET " + url);

    var deferred = jQuery.Deferred();
    jQuery.ajax({
        method: "GET",
        url:url,
        cache: false
    })
    .done(function(response) {
        deferred.resolve(response);
    })
    .fail(function(response) {
        deferred.reject({
            code: response.status,
            text: response.statusText
        })
    });
    return deferred;
}

var documentsApi = DocumentsApi();