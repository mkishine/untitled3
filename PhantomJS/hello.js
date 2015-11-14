console.log('Hello, world!');

var system = require('system');
var args = system.args;
console.log(args[0]);

phantom.exit();