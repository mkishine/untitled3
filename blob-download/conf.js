'use strict';
exports.config = {
    directConnect: true,
    framework: 'jasmine2',
    capabilities: {
        'browserName': 'chrome'
    },
    specs: [
        'spec.js'
    ]
};

var os = require('os');
if ( os.platform() === 'win32' ) {
    exports.config.capabilities.chromeOptions = {
        binary: 'C:/Program Files (x86)/Google Chrome (Local)/chrome.exe',
        args: ['--ssl-version-min=tls1', '--ssl-version-fallback-min=tls1', '--no-default-browser-check'],
        extensions: []
    };
}
