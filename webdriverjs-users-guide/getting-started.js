// inspired by https://code.google.com/p/selenium/wiki/WebDriverJs#Getting_Started
'use strict';
var webdriver = require('selenium-webdriver');

var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('about:blank');
driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000)
    .then(function () {
        console.log('wait resolved');
    }, function () {
        console.log('wait rejected');
    });
driver.quit();
