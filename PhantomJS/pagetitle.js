var system = require('system');
if (system.args.length === 1) {
    console.log('Usage: '+system.args[0]+' <some URL>');
    phantom.exit();
}

var address = system.args[1];
var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
    console.log('Page logged ' + msg);
};
page.onResourceRequested = function(request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load '+address);
    } else {
        var title = page.evaluate(function() {
            return document.title;
        });
        console.log('Page title is ' + title);
    }
    phantom.exit();
});