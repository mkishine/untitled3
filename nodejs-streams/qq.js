'use strict';
// inspired by http://www.sitepoint.com/basics-node-js-streams/
var fs = require('fs');
var readableStream = fs.createReadStream('qq.js');
var data = '';

readableStream.on('data', function(chunk) {
    data+=chunk;
});

readableStream.on('end', function() {
    console.log(data);
});