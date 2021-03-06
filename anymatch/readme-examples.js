var inspect = require('util').inspect;
var i = function (val) {return inspect(val, {colors: true})};


var anymatch = require('anymatch');
console.log("var anymatch = require('anymatch');\n");

var matchers = [
    'path/to/file.js',
    'path/anyjs/*/*.js',
    'path/anyjs/**/*.js',
    /foo.js$/,
    function (string) {
        return string.indexOf('bar') !== -1 && string.length > 10;
    }
];

//console.log('var matchers =',
//    i(matchers).replace('[Function]', matchers[3].toString() + '\n'), ';\n');

//console.log("anymatch(matchers, 'path/to/file.js', true);",
//    " =>", i(anymatch(matchers, 'path/to/file.js', true) )); // true
console.log("anymatch(matchers, 'path/anyjs/baz.js', true);",
    " =>", i(anymatch(matchers, 'path/anyjs/baz.js', true) )); // true
//console.log("anymatch(matchers, 'path/to/foo.js', true);",
//    " =>", i(anymatch(matchers, 'path/to/foo.js', true) )); // true
//console.log("anymatch(matchers, 'path/to/bar.js', true);",
//    " =>", i(anymatch(matchers, 'path/to/bar.js', true) )); // true
//console.log("anymatch(matchers, 'bar.js', true);",
//    " =>", i(anymatch(matchers, 'bar.js', true) )); // false
//console.log("anymatch(matchers, 'foo.js', true);",
//    " =>", i(anymatch(matchers, 'foo.js', true) )); // 2
console.log("anymatch(matchers, 'path/anyjs/foo.js', true);",
    " =>", i(anymatch(matchers, 'path/anyjs/foo.js', true) )); // 1
console.log("anymatch(matchers, 'path/anyjs/x/foo.js', true);",
    " =>", i(anymatch(matchers, 'path/anyjs/x/foo.js', true) )); // 1
console.log("anymatch(matchers, 'path/anyjs/x/y/foo.js', true);",
    " =>", i(anymatch(matchers, 'path/anyjs/x/y/foo.js', true) )); // 1
console.log("anymatch(matchers, 'path/anyjs/x/y/z/foo.js', true);",
    " =>", i(anymatch(matchers, 'path/anyjs/x/y/z/foo.js', true) )); // 1

//// skip matchers
//console.log( '\n// skip matchers' );
//console.log("anymatch(matchers, 'path/to/file.js', false, 1);",
//    " =>", i(anymatch(matchers, 'path/to/file.js', false, 1) )); // false
//console.log("anymatch(matchers, 'path/anyjs/foo.js', true, 2, 3);",
//    " =>", i(anymatch(matchers, 'path/anyjs/foo.js', true, 2, 3) )); // 2
//console.log("anymatch(matchers, 'path/to/bar.js', true, 0, 3);",
//    " =>", i(anymatch(matchers, 'path/to/bar.js', true, 0, 3) )); // -1
//
//
//var matcher = anymatch(matchers);
//console.log( '\nvar matcher = anymatch(matchers);' );
//console.log("matcher('path/to/file.js');",
//    " =>", i(matcher('path/to/file.js') )); // true
//console.log("matcher('path/anyjs/baz.js', true);",
//    " =>", i(matcher('path/anyjs/baz.js', true) )); // 1
//console.log("matcher('path/anyjs/baz.js', true, 2);",
//    " =>", i(matcher('path/anyjs/baz.js', true, 2) )); // -1
//console.log("['foo.js', 'bar.js'].filter(matcher);",
//    " =>", i(['foo.js', 'bar.js'].filter(matcher) )); // ['foo.js']