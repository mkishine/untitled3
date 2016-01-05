// extended example:
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js
exports.config = {
    framework: 'jasmine2',

    specs: [
        'spec.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },
}