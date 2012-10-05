// Load the required SharePoint libraries
(function () {
    var params = getParams(),
      hostweburl = params.SPHostUrl,
      appweburl = params.SPAppWebUrl;

    // Load the js files and continue to the successHandler
    $.getScript(hostweburl + "/_layouts/15/" + "SP.RequestExecutor.js", execCrossDomainRequest);


    function execCrossDomainRequest() {
        // executor: The RequestExecutor object
        // Initialize the RequestExecutor with the app web URL.
        var executor = new SP.RequestExecutor(appweburl);

        // Retrieve information from the app web
        executor.executeAsync(
          {
              url:
                  appweburl +
                  "/_api/web",
              method: "GET",
              headers: { "Accept": "application/json; odata=verbose" },
              success: successHandler,
              error: errorHandler
          }
        );

        // Retrieve information from the host web
        executor.executeAsync(
            {
                url:
                    appweburl +
                    "/_api/SP.AppContextSite(@hostweb)/web/?@hostweb='" + hostweburl + "'",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: successHandler,
                error: errorHandler
            }
        );

      
    }

    function successHandler(data) {
        var result = JSON.parse(data.body).d;
        console.log('Title: ' + result.Title + ' Url: ' + result.Url);
    }
    
    function errorHandler(data, errorCode, errorMessage) {
        console.log ( "Could not complete cross-domain call: " + errorMessage );
    }

    // Returning the params object
    function getParams() {
        var params = {};
        location.search.split('?')[1].split('&').forEach(function (param) {
            var key = param.split('=')[0],
                val = decodeURIComponent(param.split('=')[1]);
            params[key] = val;
        });
        return params;
    }

})();
