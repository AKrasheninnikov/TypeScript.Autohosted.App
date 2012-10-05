(function () {

    var params = getParams(),
        hostweburl = params.SPHostUrl,
        appweburl = params.SPAppWebUrl;

    // Load the js file and continue to the success handler
    $.getScript(hostweburl + "/_layouts/15/SP.UI.Controls.js", renderChrome)

    //Function to prepare the options and render the control
    function renderChrome() {
        // The Help, Account and Contact pages receive the
        // same query string parameters as the main page
        var options = {
            "appIconUrl": "images/AppIcon.png",
            "appTitle": "TypeScript meets SharePoint 2013 Apps",
            "appHelpPageUrl": "Help.html?"
                + document.URL.split("?")[1],
            "settingsLinks": [
                {
                    "linkUrl": "Account.html?"
                        + document.URL.split("?")[1],
                    "displayName": "Account settings"
                },
                {
                    "linkUrl": "Contact.html?"
                        + document.URL.split("?")[1],
                    "displayName": "Contact us"
                }
            ]
        };

        var nav = new SP.UI.Controls.Navigation(
                                "chrome_ctrl_placeholder",
                                options
                          );
        nav.setVisible(true);

        $('#chromeControl_stylesheet').on('load', function (event) {
            $('body').show();
        })

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
