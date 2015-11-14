var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test_ch25', function (done) {
    new Server({
        configFile: __dirname + '/Chapter 25/karma.config.js',
        singleRun: true
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/Chapter 25/karma.config.js'
    }, done).start();
});

// gulp.task('default', ['tdd']);
var http = require('http');
var connect = require('gulp-connect');
var proxyMiddleware = require('http-proxy-middleware');                      // require('http-proxy-middleware');

gulp.task('connect', function() {
    // configure proxy middleware
    // context: '/' will proxy all requests
    //     use: '/api' to proxy request when path starts with '/api'
    var proxy = proxyMiddleware('/api', {
        target: 'http://www.example.org',
        changeOrigin: true   // for vhosted sites, changes host header to match to target's host
    });
    var app = connect();
    app.use(proxy);                      // add the proxy to connect
    http.createServer(app).listen(3000);
});


gulp.task('default', ['connect']);