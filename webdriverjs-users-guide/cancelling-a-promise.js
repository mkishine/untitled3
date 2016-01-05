// inspired by https://code.google.com/p/selenium/wiki/WebDriverJs#Cancelling_a_Promise
'use strict';
var webdriver = require('selenium-webdriver');
function logForever() {
    var key = setInterval(function() {
        console.log('hello');
    }, 100);
    // this does not work:
    //var d = webdriver.promise.defer(function() {
    //    console.log('goodbye');
    //    clearInterval(key);
    //});
    var d = webdriver.promise.defer();
    d.then(function() {
        console.log('d '+d+' fullfilled');
    }, function() {
        console.log('d '+d+' rejected');
        console.log('goodbye');
        clearInterval(key);
    });

    console.log('logForever returns '+d.promise);
    return d.promise;
}

var promise = logForever();

setTimeout(function() {
    console.log('canceling '+promise);
    promise.cancel();

    // Swallow the resulting cancellation error.
    promise.then(function() {
        console.log(''+promise+' fullfilled');
    }, function() {
        console.log(''+promise+' rejected');
    });
}, 300);