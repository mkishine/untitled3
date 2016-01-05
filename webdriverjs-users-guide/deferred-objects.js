// inspired by https://code.google.com/p/selenium/wiki/WebDriverJs#Deferred_Objects
'use strict';
var webdriver = require('selenium-webdriver');

function timeout(ms) {
    var d = webdriver.promise.defer();
    var start = Date.now();
    setTimeout(function() {
        d.fulfill(Date.now() - start);
    }, ms);
    return d.promise;
}

function printElapsed(ms) {
    console.log('time: ' + ms + ' ms');
}

timeout(750).then(printElapsed);
timeout(500).then(printElapsed);
